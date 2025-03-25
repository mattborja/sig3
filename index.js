import { Validator } from '@cfworker/json-schema';
import fs from 'fs';
import path from 'path';

import schema from './schema.json' with { type: 'json' };

const REGISTRY_BASE = './registry';
const REGISTRY_EXT = '.json';
const ARTIFACT_BASE = process.argv[2] || './dist/';

const NIST_SHA1_WITHDRAWAL_DATE = "2030-12-31T00:00:00Z";

const ENTRY_LOG_FIELDS = ['id', 'valid', 'status', '@timestamp', '@level', '@message'];
const ENTRY_LOG_STATUS_FIELDS = ['valid', 'errors'];

const VALID_KEY_VERS = {
    128: {
        ver: 3,
        deprecated: true,
    },

    160: {
        ver: 4,
        deprecated: Date.now() > Date.parse(NIST_SHA1_WITHDRAWAL_DATE),
    },

    256: {
        ver: 6,
        deprecated: false,
    },
};

const validator = new Validator(schema);

// block on output dir creation
if (!fs.existsSync(ARTIFACT_BASE))
    fs.mkdirSync(ARTIFACT_BASE);

// async
fs.readdir(REGISTRY_BASE, (err, files) => {
    if (err)
        throw err;

    files.forEach(baseFilename => {
        const inFilename = path.join(REGISTRY_BASE, baseFilename);
        const outFilename = path.join(ARTIFACT_BASE, baseFilename);

        if (path.extname(inFilename) !== REGISTRY_EXT)
            return console.warn(`Skipping extraneous file: ${inFilename}`);
        
        // async (pinned)
        (function(inFilename, outFilename) {
            fs.readFile(inFilename, (err, json) => {
                if (err)
                    return console.warn(`Skipping file on read failure: ${inFilename} (${err})`);

                const entry = {
                    status: {},
                    valid: false
                };

                // entry.source
                try
                {
                    entry.source = JSON.parse(json);
                    entry.status.schema = validator.validate(entry.source);
                }
                catch (e)
                {
                    return console.warn(`Skipping file on schema validation failure: ${inFilename} (${e})`);
                }

                // entry.status.keyVersion
                // Checks the key fingerprint length from a JSON file and determines its corresponding key version.
                // If the key length matches a deprecated version (e.g., 128-bit for version 3), a warning is displayed.
                //
                // Please note:
                // - As of July 2024, RFC9580 §5.5.4.1 specifies that "version 3 (128-bit) keys and MD5 are deprecated" (https://datatracker.ietf.org/doc/html/rfc9580#section-5.5.4.1)
                // - As of December 2022, NIST has retired SHA-1 with an expected full withdrawal date of December 31, 2030 (https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm)
                try
                {
                    const keyLenBits = 8 * ((entry.source.fingerprint || '').length / 2);
                    const validKeyVersion = (keyLenBits in VALID_KEY_VERS);
                    const validKeyDeprecated = validKeyVersion && VALID_KEY_VERS[keyLenBits].deprecated;

                    entry.status.keyVersion = {
                        valid: validKeyVersion && !validKeyDeprecated,
                        meta: VALID_KEY_VERS[keyLenBits],
                        errors:
                            !validKeyVersion
                            ? [ `Unrecognized key length: ${keyLenBits} bits` ]

                            : validKeyDeprecated
                            ? [ `Deprecated key version: ${VALID_KEY_VERS[keyLenBits].ver} (${keyLenBits} bits)` ]
                            
                            : []
                    };
                }
                catch (e)
                {
                    return console.warn(`Skipping file on keyVersion validation failure: ${inFilename} (${e})`);
                }

                // entry.status.filename
                // Checks if the fingerprint from the JSON file matches the expected
                // filename format: FINGERPRINT.json
                try
                {
                    const expectedFilename = `${entry.source.fingerprint}${REGISTRY_EXT}`;
                    const isValidFilename = (baseFilename === expectedFilename);

                    entry.status.filename = {
                        valid: isValidFilename,
                        errors: !isValidFilename ? [ `Expected filename ${expectedFilename}, got ${baseFilename}` ] : []
                    };
                }
                catch (e)
                {
                    entry.status.filename = {
                        valid: false,
                        errors: [ `Filename validation failure: ${e}` ]
                    };

                    return console.warn(`Skipping file on filename validation failure: ${inFilename} (${e})`);
                }

                // build dist artifacts
                try
                {
                    // build additional meta (post-validation)
                    entry.id = entry.source.fingerprint;
                    entry.valid = Object.values(entry.status).reduce((final, e) => final && e.valid, true);

                    // include standard $.log fields in dist
                    entry['@timestamp'] = (new Date()).toISOString();
                    entry['@level'] = entry.valid ? 'INFO' : 'WARN';
                    entry['@message'] = entry.valid ? `${entry.id} successfully validated!` : `${entry.id} failed one or more validation checks.`;

                    // dist
                    fs.writeFile(outFilename, JSON.stringify(entry, null, 2), err => {
                        if (err)
                            throw `Failed to write to file: ${outFilename} (${err})`;

                        function toDictionary(keySelectFields, obj) {
                            return Object.fromEntries(keySelectFields.map(k => [k, obj[k]]));
                        }

                        // include specific log fields in $
                        const log = toDictionary(ENTRY_LOG_FIELDS, entry);

                        // include specific log subfields in $.status.*
                        log.status = Object.fromEntries(Object.keys(log.status).map(k => [k, toDictionary(ENTRY_LOG_STATUS_FIELDS, log.status[k])]));

                        // simplify schema validation errors
                        log.status.schema.errors = log.status.schema.errors.map(e => `${e.instanceLocation}: ${e.error}`);

                        console.log(JSON.stringify(log));
                    });
                }
                catch (e)
                {
                    return console.warn(`Skipping file on artifact write failure: ${inFilename} (${e})`);
                }
            });
        })(inFilename, outFilename);
    });
});
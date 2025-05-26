import { Validator } from '@cfworker/json-schema';
import fs from 'fs';
import path from 'path';
import { createHash, randomBytes } from 'crypto';

import schema from './schema.json' with { type: 'json' };

const REGISTRY_BASE = './registry';
const REGISTRY_EXT = '.json';
const ARTIFACT_BASE = process.argv[2] || './dist/';
const KEYCACHE_BASE = process.argv[3] || './cache/';

const NIST_SHA1_WITHDRAWAL_DATE = "2030-12-31T00:00:00Z";

const ENTRY_LOG_FIELDS = ['id', 'valid', 'status', '@timestamp', '@level', '@message'];
const ENTRY_LOG_STATUS_FIELDS = ['valid', 'errors'];

const VALID_KEY_VER_BITS = {
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

// Tokenizes email address portion in UID using new 32-byte salt (nonce) each time
function tokenizeUID(uid, n = 32) {
    const REGEX = /\b([^ @<>]+)@([^ @<>]+)\b/;

    const salt = randomBytes(n);

    const result = {
        salt: salt.toString('base64'),
        domain: null,
        uid: uid,
    };

    const parts = result.uid.match(REGEX);

    if (!!parts) {
        result.domain = parts[2];

        const hash = createHash('sha256')
                        .update(parts[1])
                        .update(salt) // Globally unique per-message salt (32-byte)
                        .digest('hex');

        result.uid = result.uid.replace(REGEX, `${hash}@${result.domain}`);
    }

    return result;
}

function toDictionary(keySelectFields, obj) {
  return Object.fromEntries(keySelectFields.map(k => [k, obj[k]]));
}

function _formatKeyID(fpr, withSpaces = false) {
  return fpr.substr(-16).match(/.{1,4}/g).join(withSpaces ? ' ' : '');
}

// Custom IDX format (as with --with-colons) to enable better searchability in web application (https://sig3.dev)
// Format: fingerprint:tags_csv:label
function _formatIDXEntry(entry) {
    return `${entry.fingerprint}:${entry.tags.join(',')}:${entry.label}`;
}

// block on output dir creation
if (!fs.existsSync(ARTIFACT_BASE))
    fs.mkdirSync(ARTIFACT_BASE);

if (!fs.existsSync(KEYCACHE_BASE))
    fs.mkdirSync(KEYCACHE_BASE);

function log(level, message, context) {
    const logCmd = (level in console) ? level : 'info';

    const prefix = `[${context}] ${level.toUpperCase()}`;

    console[logCmd](prefix, message);
}

function info(message, context) {
    return log('info', message, context);
}

function warn(message, context) {
    return log('warn', message, context);
}

function error(message, context) {
    return log('error', message, context);
}

function debug(message, context) {
    return log('debug', message, context);
}

// async
fs.readdir(REGISTRY_BASE, (err, files) => {
    if (err)
        throw err;

    const IDX = fs.createWriteStream(path.join(ARTIFACT_BASE, 'registry.idx.txt'));

    files.forEach(baseFilename => {
        const inFilename = path.join(REGISTRY_BASE, baseFilename);
        const outFilename = path.join(ARTIFACT_BASE, baseFilename);

        if (path.extname(inFilename) !== REGISTRY_EXT)
            return log('submission', `Skipping extraneous file`, inFilename);
        
        // async (pinned)
        (function(inFilename, outFilename) {
            const entry = {};

            // Validate schema
            // Overwrites .status
            try
            {
                const json = fs.readFileSync(inFilename);
                const source = JSON.parse(json);

                const validationStatus = validator.validate(source);
                if (validationStatus.errors.length > 0)
                    throw validationStatus.errors;

                // Assigns if schema validation passes
                Object.assign(entry, source);

                entry.status = validationStatus;
            }
            catch (e)
            {
                return log('schema', e, inFilename);
            }

            // entry.status.filename
            // Checks if the fingerprint from the JSON file matches the expected
            // filename format: FINGERPRINT.json
            try
            {
                const expectedFilename = `${entry.fingerprint}${REGISTRY_EXT}`;

                if (baseFilename !== expectedFilename)
                    throw `Expected ${expectedFilename}, got ${baseFilename}`;
            }
            catch (e)
            {
                return log('filename', `Skipping entry on filename validation failure: ${e})`, inFilename);
            }

            // Tokenize UID (derived from label)
            // Overwrites .salt, .label, .domain, .id
            try
            {
                const t = tokenizeUID(entry.label);
                entry.id = t.id;
                entry.salt = t.salt;
                entry.label = t.uid;
                entry.domain = t.domain;

                // build additional ID meta
                entry.id = _formatKeyID(entry.fingerprint);
            }
            catch (e)
            {
                return log('meta', `Skipping entry on meta update: ${e}`, inFilename);
            }

            // Assess key version
            // Checks the key fingerprint length from a JSON file and determines its corresponding key version.
            // If the key length matches a deprecated version (e.g., 128-bit for version 3), a warning is displayed.
            //
            // Please note:
            // - As of July 2024, RFC9580 §5.5.4.1 specifies that "version 3 (128-bit) keys and MD5 are deprecated" (https://datatracker.ietf.org/doc/html/rfc9580#section-5.5.4.1)
            // - As of December 2022, NIST has retired SHA-1 with an expected full withdrawal date of December 31, 2030 (https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm)
            //
            // Overwrites .version, .deprecated
            try
            {
                const keyLenBits = 8 * ((entry.fingerprint || '').length / 2);

                const keyVersion = VALID_KEY_VER_BITS[keyLenBits];
                if (!keyVersion)
                    throw 'Unrecognized fingerprint length';
                
                entry.version = keyVersion.ver;
                entry.deprecated = keyVersion.deprecated;
            }
            catch (e)
            {
                return log('version', `Skipping entry on keyVersion validation failure: ${e}`, inFilename);
            }

            // build dist artifacts
            try
            {   
                if (!IDX.write(`${_formatIDXEntry(entry)}\n`))
                    throw(`Failed to write to IDX: ${entry.id}`);

                // include standard $.log fields in dist
                // entry['@timestamp'] = (new Date()).toISOString();
                // entry['@level'] = entry.valid ? 'INFO' : 'WARN';
                // entry['@message'] = entry.valid ? `${entry.id} successfully validated!` : `${entry.id} failed one or more validation checks.`;

                // dist
                fs.writeFile(outFilename, JSON.stringify(entry, null, 2), err => {
                    if (err)
                        throw `Failed to write to file: ${outFilename} (${err})`;

                    // include specific log fields in $
                    // const log = toDictionary(ENTRY_LOG_FIELDS, entry);

                    // include specific log subfields in $.status.*
                    // log.status = Object.fromEntries(Object.keys(log.status).map(k => [k, toDictionary(ENTRY_LOG_STATUS_FIELDS, log.status[k])]));

                    // simplify schema validation errors
                    // log.status.schema.errors = log.status.schema.errors.map(e => `${e.instanceLocation}: ${e.error}`);

                    // console.log(JSON.stringify(log));
                });
            }
            catch (e)
            {
                return log('dist', `Skipping entry on artifact write failure: ${e}`, inFilename);
            }
        })(inFilename, outFilename);
    });

    IDX.end();
});
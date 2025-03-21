import { Validator } from '@cfworker/json-schema';
import fs from 'fs';
import path from 'path';

import schema from './schema.json' with { type: 'json' };

const REGISTRY_BASE = './registry';
const REGISTRY_EXT = '.json';
const ARTIFACT_BASE = './dist';

const validator = new Validator(schema);

// block on output dir creation
if (!fs.existsSync(ARTIFACT_BASE))
    fs.mkdirSync(ARTIFACT_BASE);

// async
fs.readdir(REGISTRY_BASE, (err, files) => {
    if (err)
        throw err;

    files.forEach(f => {
        const inFilename = path.join(REGISTRY_BASE, f);
        const outFilename = path.join(ARTIFACT_BASE, f);

        if (path.extname(inFilename) !== REGISTRY_EXT)
            return console.warn(`Skipping extraneous file: ${inFilename}`);
        
        // async (pinned)
        (function(inFilename, outFilename) {
            fs.readFile(inFilename, (err, json) => {
                if (err)
                    return console.warn(`Skipping file on read failure: ${inFilename} (${err})`);

                const entry = {
                    status: {},
                    approval: {}
                };

                // entry.source
                try
                {
                    entry.source = JSON.parse(json);
                }
                catch (e)
                {
                    return console.warn(`Skipping file on parse failure: ${inFilename} (${e})`);
                }

                // entry.status.schema
                try
                {
                    entry.status.schema = validator.validate(entry.source);
                }
                catch (e)
                {
                    return console.warn(`Skipping file on schema validation failure: ${inFilename} (${e})`);
                }

                // entry.status.keyVersion
                try
                {
                    entry.status.keyVersion = {
                        valid: false,
                        errors: ['Not implemented']
                    };
                }
                catch (e)
                {
                    return console.warn(`Skipping file on keyVersion validation failure: ${inFilename} (${e})`);
                }

                // entry.status.filename
                try
                {
                    entry.status.filename = {
                        valid: false,
                        errors: ['Not implemented']
                    };
                }
                catch (e)
                {
                    return console.warn(`Skipping file on filename validation failure: ${inFilename} (${e})`);
                }

                // entry.approval
                try
                {
                    entry.approval = {}; // TODO: Summarize final decision
                }
                catch (e)
                {
                    return console.warn(`Skipping file on final approval failure: ${inFilename} (${e})`);
                }

                // artifact
                try
                {
                    // build additional meta (post-validation)
                    entry.id = entry.source.fingerprint;

                    // report
                    const summary = {
                        src: outFilename
                    };

                    Object.keys(entry.status).forEach(k => {
                        summary[k] = entry.status[k].valid
                    });

                    fs.writeFile(outFilename, JSON.stringify(entry, null, 2), err => {
                        if (err)
                            throw `Failed to write to file: ${outFilename} (${err})`;
                        
                        console.log(entry.id, summary);
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
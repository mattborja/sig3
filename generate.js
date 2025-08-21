// Usage: node ./generate fpr label signatureUrl binaryUrl 
const fingerprint = process.argv[2] ?? "";
const label = process.argv[3] ?? "";
const dateToday = (new Date).toISOString().split('T')[0];
const signatureUrl = process.argv[4] ?? "https://domain.tld/path/to/file.ext.sig";
const binaryUrl = process.argv[5] ?? "https://domain.tld/path/to/file.ext";
const tagsCsv = (process.argv[6] ?? "").split(",").filter(e => !!e);

const tpl = 
{
  "fingerprint": fingerprint,
  "label": label,
  "sources": [
    {
      "type": "hkps",
      "uri": "hkps://keyserver.ubuntu.com"
    }
  ],
  "refs": [
    {
      "date": dateToday,
      "comment": "Valid GPG signature bearing public key fingerprint",
      "url": [
        signatureUrl,
        binaryUrl
      ],
      "type": "key"
    }
  ],
  "tags": tagsCsv
}

console.log(JSON.stringify(tpl, null, 2));
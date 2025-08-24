// Usage: node ./generate fpr label tags keyserver roleRefUrl roleRefComment signatureUrl binaryUrl
const fingerprint = process.argv[2] ?? "";
const label = process.argv[3] ?? "";

const tagsCsv = (process.argv[4] ?? "").split(",").filter(e => !!e);
const keyserver = process.argv[5] ?? "hkps://keyserver.ubuntu.com";

const roleRefUrl = process.argv[6];
const roleRefComment = process.argv[7];

const signatureUrl = process.argv[8];
const binaryUrl = process.argv[9];

const dateToday = (new Date).toISOString().split('T')[0];

const tpl = 
{
  "fingerprint": fingerprint,
  "label": label,
  "sources": [
    {
      "type": "hkps",
      "uri": keyserver
    }
  ],
  "refs": [],
  "tags": tagsCsv
};

if (!!roleRefUrl && !!roleRefComment) {
  tpl.refs.push({
    "date": dateToday,
    "comment": roleRefComment,
    "url": roleRefUrl,
    "type": "role"
  });
}

if (!!signatureUrl && !!binaryUrl) {
  tpl.refs.push({
    "date": dateToday,
    "comment": "Valid GPG signature bearing public key fingerprint",
    "url": [
      signatureUrl,
      binaryUrl
    ],
    "type": "key"
  });
}

console.log(JSON.stringify(tpl, null, 2));
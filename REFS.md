# References
A reference list classifying supporting evidence for key validation.

### GPG Signature
**Control**: Key  
**Assurance**: `unknown`

Subject demonstrates possession and exercise of private key.  Expects `artifact` to be populated with a valid PGP signature.

**Example**:  
```json
{
    "date": "2024-11-27",
    "comment": "Signed artifact demonstrating private key use: `echo -n '3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278' | gpg --clearsign --local-user D41A83E1C6B701619D0D812FC3F69D1BE6BCBD16`",
    "artifact": "-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA512\n\n3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278\n-----BEGIN PGP SIGNATURE-----\n\niHUEARYKAB0WIQTUGoPhxrcBYZ0NgS/D9p0b5ry9FgUCZ0dD0AAKCRDD9p0b5ry9\nFvonAQCHwAHRduopWn8I534GNRXQ0+dX5JO2ztnFxnlwZd+NMAD/Wr0NWLEc+eCf\nQm2UHkDp8lKswj6kXxTi9GI3elvpQgE=\n=L95q\n-----END PGP SIGNATURE-----\n",
    "type": "key"
}
```
**Note:** The use of a cryptographically strong random sequence for demonstrating possession and exercise of private key is not precisely necessary. Simply signing the phrase, "Hello, world!" inherits the same assurance by virtue of cryptographic operation and the mandatory presence of the *Signature Creation Time* in the hashed packet ([§5.2.3.4, RFC 4880](https://www.rfc-editor.org/rfc/rfc4880#section-5.2.3.4)), making it trivial for a verifier to assess how recent a signature was produced. It would be more useful for the prover to sign a message containing more pertinent information or claims to the verifier to establish relevance (i.e. asymmetric encryption using the verifier's public GPG key).

---

### S/MIME Encrypted and/or Signed Email
**Control**: Email  
**Assurance**: `marginal+`

Subject demonstrates possession and exercise of email address and inbox.

---

### Commit History
**Control**: Role  
**Assurance**: `full`

Subject demonstrates involvement and association with project. Expects link to commit in URL field.

**Example**:  
```json
{
    "date": "2025-03-07",
    "comment": "Self-attestation of own key under GitHub vigilant mode: 1) B5690EEEBB952194 is signing this commit via GitHub web interface, 2) commit author is authenticated as GitHub user @mattborja, AND 2) commit author affirms ownership of this selfsame key (A1C7E813F160A407)",
    "type": "user",
    "url": "https://github.com/mattborja/identity/commit/bf06562979a0eb3ef5a9da8d92edb8c7dd886ec7"
}
```
---

### Industry License and/or Certification
**Control**: Role  
**Assurance**: `full`

Subject has verified identity with independent proctor and demonstrates proficiency and/or license to operate within a specific industry or activity. Expects link to verifiable credential in URL field.

**Example**:  
```json
{
    "date": "2025-01-01",
    "comment": "Industry `certification requiring strong identity verification during proctored high stakes exam with global information assurance certification (https://www.giac.org/knowledge-base/proctor/)",`
    "type": "user",
    "url": "https://www.credly.com/badges/c0ee1538-53dd-43a0-bf9e-7724e374ff43"
},
```

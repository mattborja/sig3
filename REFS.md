# References
A reference list classifying supporting evidence for key validation.

### GPG Signature
| Instrument | Expectation |
|:---|:---|
| **Type** | `key` |
| **Assurance** | `full` |
| **Scope** | Subject demonstrates possession and exercise of the private key. |
| **Requirement** | Subject MUST sign *any message*† using the private key. |
| **Extensions** | Verifiers participating in the [key distribution process](https://www.gnupg.org/gph/en/manual/x457.html) SHOULD first be performing email verification using this method to request a message from the email address listed on the public key, *clearsigned* ONLY by the corresponding private key.

**Example**:  
```json
{
    "date": "2024-11-27",
    "comment": "Signed artifact demonstrating private key use: `echo -n '3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278' | gpg --clearsign --local-user D41A83E1C6B701619D0D812FC3F69D1BE6BCBD16`",
    "artifact": "-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA512\n\n3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278\n-----BEGIN PGP SIGNATURE-----\n\niHUEARYKAB0WIQTUGoPhxrcBYZ0NgS/D9p0b5ry9FgUCZ0dD0AAKCRDD9p0b5ry9\nFvonAQCHwAHRduopWn8I534GNRXQ0+dX5JO2ztnFxnlwZd+NMAD/Wr0NWLEc+eCf\nQm2UHkDp8lKswj6kXxTi9GI3elvpQgE=\n=L95q\n-----END PGP SIGNATURE-----\n",
    "type": "key"
}
```
†The use of a cryptographic *nonce* for demonstrating message uniqueness is not strictly necessary due to the presence of the *Signature Creation Time* in the resulting hashed packet ([§5.2.3.4, RFC 4880](https://www.rfc-editor.org/rfc/rfc4880#section-5.2.3.4)).

---

### Project or Affiliation
| Instrument | Expectation |
|:---|:---|
| **Type** | `role` |
| **Assurance** | `marginal`, `full` |
| **Scope** | Subject demonstrates verifiable project involvement or affiliation. |
| **Requirement** | Subject MUST show substantial project involvement via multiple factors including but not limited to: signed commits, community involvement, public profiles, affirmation of employment or affiliation, etc. |
| **Extensions** | URLs to all related work SHOULD be included together as an array of values for the same ref. |

**Example**:  
```json
{
    "date": "2025-03-07",
    "comment": "Self-attestation of own key under GitHub vigilant mode: 1) B5690EEEBB952194 is signing this commit via GitHub web interface, 2) commit author is authenticated as GitHub user @mattborja, AND 2) commit author affirms ownership of this selfsame key (A1C7E813F160A407)",
    "type": "role",
    "url": [
        "https://github.com/mattborja/identity/commit/bf06562979a0eb3ef5a9da8d92edb8c7dd886ec7",
        "https://github.com/mattborja/sig3/commit/bf06562979a0eb3ef5a9da8d92edb8c7dd886ec7#diff-7fcdfe7c0b50a3c8d7978401b7d339839221a136e99b5d2c0f90386738f5af65R20",
        "https://github.com/mattborja.gpg"
    ]
}
```
---

### Credential Service Provider (CSP)
> [!NOTE]
> For an official definition of this reference type, please see corresponding NIST glossary term: [credential service provider (CSP)](https://csrc.nist.gov/glossary/term/credential_service_provider).

| Instrument | Expectation |
|:---|:---|
| **Type** | `csp` |
| **Assurance** | `full` |
| **Scope** | Subject has performed adequate identity verification (SIG3/IAL3) with a trusted entity that issues electronic credentials. |
| **Requirement** | The *results* of the ID verification process MUST be controlled exclusively by the CSP AND made publicly available the electronic credential with reasonable permanence and immutability. A secure URL (e.g., https://) corresponding to the electronic credential MUST be provided in the ref. |
| **Extensions** | Valid refs in this space CAN also be used to chart a definitive and decisive path to confirming project involvement or affiliation as evidence of subject matter expertise when made prerequisite to obtaining industry licenses or certifications, as in the case of remote proctored Global Information Assurance Certification (GIAC) exams. |


**Example**:  
```json
{
    "date": "2025-01-01",
    "comment": "Industry certification requiring strong identity verification during proctored high stakes exam with global information assurance certification (https://www.giac.org/knowledge-base/proctor/)",
    "type": "csp",
    "url": "https://www.credly.com/badges/c0ee1538-53dd-43a0-bf9e-7724e374ff43"
},
```

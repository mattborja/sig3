# Identity Assertion Registry

## Purpose

To provide a centralized, authoritative registry of identity claims and evidence, in support of their proposed validity levels and use in verifying artifact integrity and signature origin.

## Rationale

While open keyservers distribute public keys, they lack support for identity assurance, leaving a gap in trust verification essential for high-stakes applications like software signing. Existing identity assurance methods, such as banking industry Identity Assurance Level 3 (IAL3) practices or Extended Validation SSL certificates, are often limited to single-entity validation, proprietary, or costly—making them inaccessible for many open-source and community projects.

This project offers a community-driven solution to enhance **GPG key identity assurance**. By inviting collaboration among security-focused professionals, it aims to establish an open, scalable, and accessible approach to verifying identities tied to cryptographic keys, providing a high degree of assurance for software signing and other critical applications without the barriers of traditional identity verification services.

## Schema

The include [**schema**](/schema.json) in this repository defines the acceptable structure for identity assertions in the registry. Each identity is associated with a single unique GPG key fingerprint and must include key proofs (evidence) to support the identity claim. This section details the necessary requirements for satisfying the minimum schema validation requirements.

> [!NOTE]
> Use an online schema validator like [JSONSchema.dev](https://jsonschema.dev/) to prepare a schema-valid JSON submission for a new ID assertion!

### **Fields**

Each identity assertion is an object containing the following fields:

- **`fingerprint`**:  
  A string representing the unique GPG fingerprint of the key being asserted. The fingerprint must be at least 128 bits (16 characters) long and match the pattern `^[A-Fa-f0-9]{16,}$`. This is the primary identifier for the key and must be presented in full.  
  Example:  
  ```json
  "fingerprint": "259A55407DD6C00299E6607EFFDE55BE73A2D1ED"
  ```

- **`label`**:  
  The name of the key holder or entity, typically matching the name associated with the GPG key.  
  Example:  
  ```json
  "label": "Jeremy Long"
  ```

- **`validity`**:  
  A string representing the level of trust associated with the identity assertion. This field indicates how thoroughly the identity has been verified. Possible values are:
  - `full`: The identity is fully verified with strong evidence from multiple independent sources.
  - `marginal`: The identity has been partially verified, but some evidence or verification may be limited.
  - `revoked`: The identity assertion has been withdrawn or is no longer valid.
  - `none`: No verification has been performed, or the identity could not be verified.  
  Example:  
  ```json
  "validity": "full"
  ```

- **`refs`**:  
  An array of references providing evidence to support the identity assertion. Each reference includes:
  - **`date`**: The date when the verification or cross-signing took place, in `YYYY-MM-DD` format.
  - **`comment`**: A brief description of what the reference verifies (e.g., project affiliation, key ownership).
  - **`url`**: A URL pointing to an authoritative source or resource that validates the reference.
  - **`type`**: The type of verification or evidence provided. Possible values:
    - `role`: Verifies the keyholder’s affiliation with a project, organization, or role.
    - `user`: Verifies the keyholder’s ownership of the GPG key, often via direct key verification or signed commits.
    - `key`: Verifies the key itself, typically through a signed artifact or keyring.
  
  Example:
  ```json
  "refs": [
    {
      "date": "2024-10-28",
      "comment": "Verified project affiliation with OWASP through public documentation",
      "url": "https://github.com/OWASP/www-project-dependency-check/commits/master/index.md",
      "type": "role"
    }
  ]
  ```

- **`tags`**:  
  An array of strings representing keywords or categories that provide additional context for the keyholder’s identity. Tags might include roles (e.g., `developer`, `maintainer`) or organizations (e.g., `OWASP`).  
  Example:  
  ```json
  "tags": ["OWASP", "Software Developer"]
  ```

### **Example Identity Assertion**

Here’s an example identity assertion that adheres to the schema:

```json
{
  "fingerprint": "259A55407DD6C00299E6607EFFDE55BE73A2D1ED",
  "label": "Jeremy Long",
  "validity": "full",
  "refs": [
    {
      "date": "2024-10-28",
      "comment": "Verified project affiliation with OWASP through public documentation",
      "url": "https://github.com/OWASP/www-project-dependency-check/commits/master/index.md",
      "type": "role"
    },
    {
      "date": "2024-10-29",
      "comment": "Verification of key ownership via signed commits",
      "url": "https://github.com/jeremylong/DependencyCheck/commit/48074e6c0679cf4429f80292e3234f328fc870e9",
      "type": "user"
    }
  ],
  "tags": ["OWASP", "Software Developer"]
}
```

### **Important Notes**
- **`fingerprint`**: Ensure that the **GPG fingerprint** is presented fully and adheres to the correct pattern (at least 16 alphanumeric characters).
- **`validity`**: The **validity** status should reflect the level of verification based on the provided references. A `full` validity status should only be assigned if multiple independent sources have verified the identity.
- **`refs`**: Each reference must be **verifiable** and should link to an **authoritative, accessible source**.
- **`tags`**: The **tags** field can be used to categorize the keyholder by roles or affiliations (e.g., linking keyholders to specific projects or organizations).

## Contribution Guidelines

We welcome contributions to this registry, whether you're adding a new identity assertion or enhancing an existing one with additional evidence.

### Found New Evidence for an Existing Key?
If you have additional evidence for an existing identity assertion, simply **open a pull request** to amend the key’s list of `refs` and help strengthen its validity.

### Adding a New Identity Assertion
For new assertions, please follow these guidelines:

#### Required (MUST)
- **Complete Schema**: Implement the full Schema to build submission.
- **References**: Provide 1-2 valid references (`refs`) to substantiate the proposed validity.
- **GPG Fingerprints**: Use the full 160-bit, uppercase format wherever GPG fingerprints are presented.

#### Recommended (SHOULD)
- **GPG Signature**: Clearsign, armor, and comment your submission with your own GPG key. Format the filename as your full-length, uppercase GPG fingerprint.
  
  Example:
  ```bash
  gpg --clearsign --armor --local-user <YOUR-KEY-ID> --comment "Verified GPG key for Jeremy Long" --output 259A55407DD6C00299E6607EFFDE55BE73A2D1ED.json.asc
  ```
- **Public GPG Key**: Ensure your GPG key is publicly accessible on one or more approved key servers (Ubuntu, OpenPGP, GitHub).
- **Additional References**: Include as many valid references as possible to certify key ownership.

### Submission Rules
- Limit **one (1) identity assertion** per pull request.
- All contributions are subject to initial and recurring review and approval.

Thank you for helping build a robust identity assurance registry!

### Acceptance
Once a submission has been reviewed and verified for compliance, the signed submission will be extracted and merged into the main registry as a native JSON (`*.json`) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Learn More
- [Building your web of trust](https://www.gnupg.org/gph/en/manual/x547.html), *The GNU Privacy Guard*
- [Using trust to validate keys](https://www.gnupg.org/gph/en/manual/x334.html#AEN384), *The GNU Privacy Guard*
- [Validating authenticity of a key](https://apache.org/info/verification.html#Validating), *The Apache Software Foundation*
- [Validating other keys on your public keyring](https://www.gnupg.org/gph/en/manual/x334.html), *The GNU Privacy Guard*
- [Exchanging keys](https://www.gnupg.org/gph/en/manual/x56.html), *The GNU Privacy Guard*
- [Integrity check](https://gnupg.org/download/integrity_check.html), *The GNU Privacy Guard*
- [Signature key](https://gnupg.org/signature_key.html), *The GNU Privacy Guard*

> *Wir nehmen Abschied von einem sicher geglaubten Freund, dem Fernmeldegeheimnis (Artikel 10 Grundgesetz), [18. Dezember 2015](https://lists.gnupg.org/pipermail/gnupg-users/2016-February/055173.html)*

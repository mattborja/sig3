# Identity Assertion Registry
## Support this Work
- **GoFundMe:** [Support Identity Assurance with Sectigo EV Cert](https://gofund.me/5d81529b)

## Purpose

To provide an open, collaborative, and authoritative registry of software signing identities with their respective proofs, in support of developers, security practitioners, and operations engineers securing the supply chain.

## Rationale

In a time when developers are expected to engineer solutions at breakneck speed, we require advanced tools, frameworks, and methodologies to get the same job done in a fraction of the time.

Building trust is hard work because trust is subjective. Everyone generally agrees on the requirement "to" trust a third-party entity for importing software, but few will agree on the "how," ranging from expert due diligence to mere blind trust—just to get solutions out the door and into the hands of vulnerable, unsuspecting customers.

The threat model is simple: identity forgery is real, and proper identity validation requires more effort than many are trained for or willing to invest, placing entire enterprises, organizations, and their customer base at risk of theft and compromise.

This project offers a community-driven solution to bootstrap the hard work of **key identity assurance**, providing deployers with a cache of evidence supporting the validity of software signing identities. By inviting collaboration among security-focused professionals, it aims to establish an open, scalable, and accessible approach to verifying identities tied to cryptographic keys, providing a high degree of assurance for software signing and other critical applications, without the barriers of traditional identity verification services.

## Schema

The included [**schema**](/schema.json) in this repository defines the acceptable structure for identity assertions in the registry. Each identity is associated with a unique GPG key fingerprint and must include key proofs (evidence) to support the identity claim. This section details the necessary requirements for satisfying the minimum schema validation requirements.

> [!NOTE]
> Use an online schema validator like [JSONSchema.dev](https://jsonschema.dev/) to prepare a schema-valid JSON submission for a new identity assertion!

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
    - `key`: Demonstrates use of the signing key to sign an approved artifact (see [artifact-sign.sh](/artifact-sign.sh) for approved artifacts).

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

### Example

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

### Important
- **`fingerprint`**: Ensure that the **GPG fingerprint** is presented fully and adheres to the correct pattern (at least 16 alphanumeric characters).
- **`validity`**: The **validity** status should reflect the level of verification based on the provided references. A `full` validity status should only be assigned if multiple independent sources have verified the identity.
- **`refs`**: Each reference must be **verifiable** and should link to an **authoritative, accessible source**.
- **`tags`**: The **tags** field can be used to categorize the keyholder by roles or affiliations (e.g., linking keyholders to specific projects or organizations).

## Contributing
We welcome contributions to this registry, whether you're adding a new identity assertion or enhancing an existing one with additional evidence.

### Updating Existing Assertions
If you have additional evidence for an existing identity assertion, simply **open a pull request** to amend the key’s list of `refs` and help strengthen its validity.

### Adding New Assertions
- **Complete Schema**: Implement the full Schema to build your submission.
- **References**: Provide 1-2 valid references (`refs`) to substantiate the proposed validity.
- **GPG Fingerprints**: Use the full 160-bit, uppercase format wherever GPG fingerprints are presented.
- All contributions are subject to initial and recurring review and approval.

Thank you for helping build a robust identity assurance registry!

### Acceptance
Once a submission has been reviewed and verified for compliance, the signed submission will be merged into the main registry.

## Learn More
- [Building your web of trust](https://www.gnupg.org/gph/en/manual/x547.html), *The GNU Privacy Guard*
- [Using trust to validate keys](https://www.gnupg.org/gph/en/manual/x334.html#AEN384), *The GNU Privacy Guard*
- [Validating authenticity of a key](https://apache.org/info/verification.html#Validating), *The Apache Software Foundation*
- [Validating other keys on your public keyring](https://www.gnupg.org/gph/en/manual/x334.html), *The GNU Privacy Guard*
- [Exchanging keys](https://www.gnupg.org/gph/en/manual/x56.html), *The GNU Privacy Guard*
- [Integrity check](https://gnupg.org/download/integrity_check.html), *The GNU Privacy Guard*
- [Signature key](https://gnupg.org/signature_key.html), *The GNU Privacy Guard*

## Acknowledgments
The Code Owners of this project acknowledges and commemorates the extraordinary contributions of the following individuals and organizations dedicated to advancing the critical yet often underappreciated field of digital security and identity; whose work has significantly shaped and inspired this effort:

- [Werner Koch](https://www.propublica.org/article/the-worlds-email-encryption-software-relies-on-one-guy-who-is-going-broke) – for his dedication to developing and maintaining GnuPG, a cornerstone tool for secure communication and email encryption.
- [Elmar Hoffman](http://www.elho.net/crypto/policy/) – for his advocacy in cryptographic policy and practices.
- [Ian Young](https://iay.org.uk/identity/pgp/policy/2021-02-25/) – for his comprehensive documentation of PGP policy and its applications in identity verification.
- [Simon Josefsson](https://blog.josefsson.org/2014/06/23/offline-gnupg-master-key-and-subkeys-on-yubikey-neo-smartcard/) – for his innovation in secure key management and the use of hardware security devices.
- [Tails](https://tails.net/contribute/design/download_verification/) – for their commitment to providing users with robust, verifiable tools for privacy and security.

> *Wir nehmen Abschied von einem sicher geglaubten Freund, dem Fernmeldegeheimnis (Artikel 10 Grundgesetz), [18. Dezember 2015](https://lists.gnupg.org/pipermail/gnupg-users/2016-February/055173.html)*

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

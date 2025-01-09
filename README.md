# Identity Assertion Registry for Critical Infrastructure Security

## Purpose

This project establishes a robust, independent registry for verifying identity proofs and assertions, aligned with NIST Special Publication 800-63A standards. Designed to support critical infrastructure protection, the registry ensures the integrity of vendors, enhances supply chain security, and facilitates the secure exchange of identity credentials. By providing a reliable mechanism for identity validation, this initiative contributes to national security efforts, safeguarding vital systems from unauthorized access and potential threats.

## Schema
The included [**schema**](/schema.json) in this repository defines the acceptable structure for identity assertions in the registry. Each identity is associated with a unique GPG key fingerprint and must include key proofs (evidence) to support the identity claim. This section details the necessary requirements for satisfying the minimum schema validation requirements.

> [!NOTE]
> Use an online schema validator like [JSONSchema.dev](https://jsonschema.dev/) to prepare a schema-valid JSON submission for a new identity assertion!

### Main Structure

The following table summarizes the top-level properties of the schema:

| Key           | Description                                                      | Example Value                                              |
|---------------|------------------------------------------------------------------|------------------------------------------------------------|
| `fingerprint` | The GPG key fingerprint associated with the identity assertion. | `259A55407DD6C00299E6607EFFDE55BE73A2D1ED`                |
| `label`       | The name or title of the key holder.                             | `Jeremy Long`                                              |
| `validity`    | The trust level of the identity assertion.                      | `full`                                                    |
| `refs`        | An array of references supporting the identity claim.           | See "Refs" section below.                                  |
| `tags`        | An array of tags categorizing the identity assertion.           | `["OWASP", "Software Developer"]`                       |

### Extended Properties

#### Refs

The `refs` property contains an array of reference objects that support the identity assertion. Each reference includes details about the verification context.

| Key        | Description                                                          | Example Value                                             |
|------------|----------------------------------------------------------------------|-----------------------------------------------------------|
| `date`     | The date of the verification or cross-signing in `YYYY-MM-DD` format.| `2024-10-28`                                              |
| `comment`  | A description of the verification performed.                         | `Verified project affiliation with OWASP.`               |
| `artifact` | A cryptographic artifact demonstrating possession of the key.        | `Signed commit hash: 48074e6c0679cf4429f80292e3234f328fc870e9` |
| `url`      | A link to an authoritative source validating the reference.          | `https://github.com/OWASP/www-project-dependency-check`   |
| `type`     | The type of evidence provided. Possible values: `role`, `user`, `key`.| `role`                                                   |

**Full Example of `refs` Collection:**
```json
[
  {
    "date": "2024-10-28",
    "comment": "Verified project affiliation with OWASP through public documentation",
    "artifact": "Signed commit hash: 48074e6c0679cf4429f80292e3234f328fc870e9",
    "url": "https://github.com/OWASP/www-project-dependency-check",
    "type": "role"
  },
  {
    "date": "2024-10-29",
    "comment": "Verification of key ownership via signed commits",
    "artifact": "Signed commit hash: 87374e6c0659ef4529b80291e5234f328fc671e9",
    "url": "https://github.com/jeremylong/DependencyCheck/commit/87374e6c0659",
    "type": "user"
  }
]
```

#### Tags

The `tags` property is an array of strings representing categories or roles associated with the identity assertion.

| Key | Description                                       | Example Value               |
|-----|---------------------------------------------------|-----------------------------|
| -   | A tag categorizing the identity assertion.        | `"OWASP"`, `"Developer"` |

**Full Example of `tags` Collection:**
```json
["OWASP", "Software Developer"]
```

### JSON Example

Below is a theoretical example that would be proposed via new Pull Request as follows:

Filename: **/registry/259A55407DD6C00299E6607EFFDE55BE73A2D1ED.json**

```json
{
  "fingerprint": "259A55407DD6C00299E6607EFFDE55BE73A2D1ED",
  "label": "Jeremy Long",
  "validity": "full",
  "refs": [
    {
      "date": "2024-10-28",
      "comment": "Verified project affiliation with OWASP through public documentation",
      "artifact": "Signed commit hash: 48074e6c0679cf4429f80292e3234f328fc870e9",
      "url": "https://github.com/OWASP/www-project-dependency-check",
      "type": "role"
    },
    {
      "date": "2024-10-29",
      "comment": "Verification of key ownership via signed commits",
      "artifact": "Signed commit hash: 87374e6c0659ef4529b80291e5234f328fc671e9",
      "url": "https://github.com/jeremylong/DependencyCheck/commit/87374e6c0659",
      "type": "user"
    }
  ],
  "tags": ["OWASP", "Software Developer"]
}
```

### Limitations

Each `fingerprint` must be unique within the registry. The schema enforces a strict limitation of **one JSON file per fingerprint** being attested. This ensures that every GPG key fingerprint is represented by exactly one identity assertion, preventing duplication and maintaining consistency across the registry. When updating or modifying an assertion, the existing JSON file for the relevant fingerprint must be replaced or updated.

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

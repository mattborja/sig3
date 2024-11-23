# Identity Assertion Registry

## Purpose

To provide a centralized, authoritative registry of identity claims and evidence, in support of their proposed validity levels and use in verifying artifact integrity and signature origin.

## Rationale

While open keyservers distribute public keys, they lack support for identity assurance, leaving a gap in trust verification essential for high-stakes applications like software signing. Existing identity assurance methods, such as banking industry Identity Assurance Level 3 (IAL3) practices or Extended Validation SSL certificates, are often limited to single-entity validation, proprietary, or costly—making them inaccessible for many open-source and community projects.

This project offers a community-driven solution to enhance **GPG key identity assurance**. By inviting collaboration among security-focused professionals, it aims to establish an open, scalable, and accessible approach to verifying identities tied to cryptographic keys, providing a high degree of assurance for software signing and other critical applications without the barriers of traditional identity verification services.

## Schema

The **Schema** defines the structure for each identity assertion in the registry. Each identity is associated with a unique GPG key fingerprint and includes evidence to support the identity claim, along with metadata that helps clarify the trust level and origin of the verification.

### **Fields**

Each identity assertion has the following fields:

- **`key`**:  
  The unique GPG fingerprint of the key being asserted (160-bit, uppercase). This is the primary identifier for the key and must be presented in full.  
  Example: `259A55407DD6C00299E6607EFFDE55BE73A2D1ED`

- **`label`**:  
  The name of the key holder or entity. This should match the name associated with the GPG key.  
  Example: `Jeremy Long`

- **`validity`**:  
  The level of trust associated with the identity assertion. This field helps indicate how thoroughly the identity has been verified. Possible values:
  - `full`: The identity is fully verified with strong evidence from multiple independent sources.
  - `marginal`: The identity has been partially verified, but some evidence or verification may be limited.
  - `revoked`: The identity assertion has been withdrawn or is no longer valid.
  - `none`: No verification has been performed or the identity could not be verified.

- **`refs`**:  
  A list of references that provide evidence to support the identity assertion. Each reference must include:
  - **`date`**: The date when the verification or cross-signing took place (in YYYY-MM-DD format).
  - **`comment`**: A brief description of what the reference verifies (e.g., project affiliation, GPG key fingerprint, etc.).
  - **`url`**: A link to the online resource or evidence (e.g., a GitHub page, documentation, or project website).
  - **`type`**: The type of verification or evidence provided. Common types include:
    - `role`: Verifies the keyholder’s affiliation with a project, organization, or role.
    - `user`: Verifies the keyholder’s ownership of the GPG key, often via direct key verification or signed commits.

  Example:
  ```yaml
  refs:
    - date: 2024-10-28
      comment: Verified project affiliation with OWASP through public documentation
      url: https://github.com/OWASP/www-project-dependency-check/commits/master/index.md
      type: role
  ```

- **`tags`**:  
  Keywords or categories that provide additional context for the keyholder’s identity. Tags might include roles (e.g., `developer`, `maintainer`) or organizations (e.g., `OWASP`).

  Example:
  ```yaml
  tags:
    - OWASP
    - Software Developer
  ```

- **`summary`**:  
  A brief description of the keyholder’s identity, role, or involvement. This section provides context for understanding the keyholder's association with the key and their relevant activities.

  Example:
  ```yaml
  summary:
    role: Project maintainer of the Dependency-Check tool under OWASP.
    rating: Verified identity for high-trust software signing and open-source contributions.
  ```

### **Example Identity Assertion:**

Here is an example that demonstrates the full schema in use:

```yaml
259A55407DD6C00299E6607EFFDE55BE73A2D1ED:
  label: Jeremy Long
  validity: full
  refs:
    - date: 2024-10-28
      comment: Self-attestation from project website ("Dependency-Check") associated with OWASP
      url: https://jeremylong.github.io/DependencyCheck/dependency-check-cli/index.html
      type: role
    - date: 2024-10-28
      comment: Independent verification of project affiliation via documentation history
      url: https://github.com/OWASP/www-project-dependency-check/commits/master/index.md
      type: role
    - date: 2024-10-29
      comment: Verification of direct project involvement under OWASP organization
      url: https://github.com/OWASP/www-project-dependency-check/commits?author=jeremylong
      type: role
    - date: 2024-10-28
      comment: Confirmation of OWASP organization membership via GitHub
      url: https://github.com/orgs/OWASP/people?query=jeremylong
      type: role
    - date: 2024-10-28
      comment: Verification of GPG key fingerprint hosted on GitHub
      url: https://github.com/jeremylong.gpg
      type: user
    - date: 2024-10-29
      comment: Independent verification of key ownership via signed commits
      url: https://github.com/jeremylong/DependencyCheck/commit/48074e6c0679cf4429f80292e3234f328fc870e9
      type: user
  tags:
    - OWASP
  summary:
    role: Maintainer of Dependency-Check project under OWASP
    rating: High trust level for software signing and open-source contributions.
```

### **Important Notes:**
- Ensure that **every reference** is verifiable and points to an **accessible, authoritative source**.
- The **validity** status should reflect the level of verification based on the references. `Full` validity should be reserved for entries that are strongly supported by multiple independent sources.
- The **tags** field can help categorize identity assertions for easier searching, such as linking keyholders to particular organizations or projects.

## Contribution Guidelines

We welcome contributions to this registry, whether you're adding a new identity assertion or enhancing an existing one with additional evidence.

### Found New Evidence for an Existing Key?
If you have additional evidence for an existing identity assertion, simply **open a pull request** to amend the key’s list of `refs` and help strengthen its validity.

### Adding a New Identity Assertion
For new assertions, please follow these guidelines:

#### Required (MUST)
- **Complete Schema**: Implement the full Schema to build YAML content for the identity assertion.
- **References**: Provide 1-2 valid references (`refs`) to substantiate the proposed validity.
- **GPG Fingerprints**: Use the full 160-bit, uppercase format wherever GPG fingerprints are presented.

#### Recommended (SHOULD)
- **GPG Signature**: Clearsign, armor, and comment your YAML content with your own GPG key. Format the filename as your full-length, uppercase GPG fingerprint.
  
  Example:
  ```bash
  gpg --clearsign --armor --local-user <YOUR-KEY-ID> --comment "Verified GPG key for Jeremy Long" --output 259A55407DD6C00299E6607EFFDE55BE73A2D1ED.yml.asc
  ```
- **Public GPG Key**: Ensure your GPG key is publicly accessible on one or more approved key servers (Ubuntu, OpenPGP, GitHub).
- **Additional References**: Include as many valid references as possible to certify key ownership.

### Submission Rules
- Limit **one (1) identity assertion** per pull request.
- All contributions are subject to initial and recurring review and approval.

Thank you for helping build a robust identity assurance registry!

### Pull Request Example
The following example is considered ideally complete for the purpose of submitting an acceptable pull request a new issue requesting admission:

**PR/Issue Title:** `Key Verification for Jeremy Long (FFDE 55BE 73A2 D1ED)`  
**Filename:** `259A55407DD6C00299E6607EFFDE55BE73A2D1ED.yml.asc`  
**Body:**  
```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

259A55407DD6C00299E6607EFFDE55BE73A2D1ED:
  label: Jeremy Long
  validity: full
  refs:
    - date: 2024-10-28
      comment: Self-attestation from project website ("Dependency-Check") associated with OWASP
      url: https://jeremylong.github.io/DependencyCheck/dependency-check-cli/index.html
      type: role
    - date: 2024-10-28
      comment: Independent verification of project affiliation via documentation history
      url: https://github.com/OWASP/www-project-dependency-check/commits/master/index.md
      type: role
    - date: 2024-10-29
      comment: Independent verification of direct project involvement under organization (OWASP)
      url: https://github.com/OWASP/www-project-dependency-check/commits?author=jeremylong
      type: role
    - date: 2024-10-28
      comment: Independent verification of organization membership (OWASP)
      url: https://github.com/orgs/OWASP/people?query=jeremylong
      type: role
    - date: 2024-10-28
      comment: Independent verification of contribution activity and community involvement (open source)
      url: https://github.com/jeremylong
      type: role
    - date: 2024-10-29
      comment: Independent verification of GPG key fingerprint hosted at GitHub username (jeremylong)
      url: https://github.com/jeremylong.gpg
      type: user
    - date: 2024-10-29
      comment: Independent verification of key ownership via signed commits backed by GitHub vigilant mode
      url: https://github.com/jeremylong/DependencyCheck/commit/48074e6c0679cf4429f80292e3234f328fc870e9
      type: user
  tags:
    - OWASP
-----BEGIN PGP SIGNATURE-----
Comment: Verified GPG key for Jeremy Long

iHUEARYKAB0WIQTUGoPhxrcBYZ0NgS/D9p0b5ry9FgUCZx9towAKCRDD9p0b5ry9
FmZ6AQCJ7RPBpxL7SLC4u2PrITOB0BfaFCItz6BWNXl7Sw1qyAD9GJoRyHrfVFh8
Vr0RPXX8Sa0Pj2mDRkTTEYwiTRe07ww=
=212D
-----END PGP SIGNATURE-----
```

### Acceptance
Once a submission has been reviewed and verified for compliance, the signed YAML will be extracted and merged into the main registry as a native YAML (`*.yml`) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

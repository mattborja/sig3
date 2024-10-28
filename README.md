# Identity Assertion Registry

## Purpose

To provide a centralized, authoritative registry of identity claims and evidence, in support of their proposed validity levels and use in verifying artifact integrity and signature origin.

## Schema

**Key**: The full length unique fingerprint identifier for the GPG key being attested.

**Fields:**
- **`label`**: The name of the key holder
- **`validity`**: Indicates the status of the identity assertion (see also https://www.gnupg.org/gph/en/manual/x334.html)
  - Options: `full`, `marginal`, `revoked`, `none`
- **`refs`**: Documentation supporting the identity assertion, which may include multiple entries:
  - **`date`**: The date when the verification or cross-signing occurred
  - **`comment`**: Notes regarding the verification process
  - **`url`**: A link to relevant documentation or evidence
  - **`type`**: The type of verification performed
    - Options: `live`, `cross-sign`, `role`
- **`tags`**: Keywords for categorizing the identity assertion (e.g., roles, organizations)
- **`summary`**: Brief overview of the key holder's role and ownership claims
  - **`role`**: Description of the key holder's role
  - **`rating`**: Trust level rating of the identity assertion

### Identity Assertion Example

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
```

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

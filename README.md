# Identity Assertion Registry

This repository provides a registry for identity assertion claims, detailing the minimal information needed to substantiate each claim and its validity level.

## Schema
**Key**: The full length unique fingerprint identifier for the GPG key being attested.

**Fields:**
- **`label`**: The name of the key holder (e.g., `Scott Cantor`).
- **`validity`**: Indicates the status of the identity assertion.
  - Options: `full`, `marginal`, `revoked`, `none`
- **`refs`**: Documentation supporting the identity assertion, which may include multiple entries:
  - **`date`**: The date when the verification or cross-signing occurred.
  - **`comment`**: Notes regarding the verification process.
  - **`url`**: A link to relevant documentation or evidence.
  - **`type`**: The type of verification performed
    - Options: `live`, `cross-sign`, `role`
- **`tags`**: Keywords for categorizing the identity assertion (e.g., roles, organizations).
- **`summary`**: Brief overview of the key holder's role and ownership claims.
  - **`role`**: Description of the key holder's role.
  - **`rating`**: Trust level rating of the identity assertion.

## Identity Assertion Example

```yaml
DCAA15007BED9DE690CD9523378B845402277962:
  label: Scott Cantor
  validity: full
  refs:
    - date: 2024-04-01
      comment: "In-person verification during Shibboleth Developer's Meeting, 2022-04-01"
      url: https://shibboleth.atlassian.net/wiki/spaces/DEV/pages/2951020545/2022-04-01
      type: live
    - date: 2024-01-01
      comment: Cross-signed by Ian Young (5E6D6EAE16C3DA75450B219C9A804E97D7079C77)
      url: gpg://5E6D6EAE16C3DA75450B219C9A804E97D7079C77
      type: cross-sign
  tags:
    - Shibboleth
```

## Contributing

This repository is open to contributions via pull requests under the following guidelines:

- **MUST** implement entire Schema
- **MUST** present full length GPG fingerprint uppercased wherever used
- **MUST** provide at least 1-2 valid references (`refs`) substantiating proposed `validity`
- **MUST** specify full length GPG fingerprint uppercased as the filename ending in *.yml
- **MUST** have YAML content be clearsigned by your GPG Key and armored, with comment (`gpg --clerasign --armor --local-user <YOUR-KEY-ID> --comment "Verified GPG key for Scott Cantor"`)
- Limit **one (1) claim** per pull request
- All submissions are ultimately subject to initial and recurring review and approval

### Pull Request Example
The following example is considered complete for the purpose of submitting an acceptable pull request:

**Filename:** `DCAA15007BED9DE690CD9523378B845402277962.yml.asc`

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

DCAA15007BED9DE690CD9523378B845402277962:
  label: Scott Cantor
  validity: full
  refs:
    - date: 2024-04-01
      comment: "In-person verification during Shibboleth Developer's Meeting, 2022-04-01"
      url: https://shibboleth.atlassian.net/wiki/spaces/DEV/pages/2951020545/2022-04-01
      type: live
    - date: 2024-01-01
      comment: Cross-signed by Ian Young (5E6D6EAE16C3DA75450B219C9A804E97D7079C77)
      url: gpg://5E6D6EAE16C3DA75450B219C9A804E97D7079C77
      type: cross-sign
  tags:
    - Shibboleth
-----BEGIN PGP SIGNATURE-----
Comment: Verified GPG key for Scott Cantor

iHUEARYKAB0WIQTUGoPhxrcBYZ0NgS/D9p0b5ry9FgUCZx9QSwAKCRDD9p0b5ry9
FpOjAP9qLKmmiskSNMrvKF9rXnRVYxb5w7qDokdp1Lw6gO+PgAD+MfHt3eyQ1uI1
+shmkAr7b3lXu+fV/y0zFejYaYt3ZgQ=
=FxEe
-----END PGP SIGNATURE-----
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

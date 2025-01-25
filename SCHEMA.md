# Schema
The included [**schema**](/schema.json) in this repository defines the acceptable structure for identity assertions in the registry. Each identity is associated with a unique GPG key fingerprint and must include key proofs (evidence) to support the identity claim. This section details the necessary requirements for satisfying the minimum schema validation requirements.

> [!NOTE]
> Use an online schema validator like [JSONSchema.dev](https://jsonschema.dev/) to prepare a schema-valid JSON submission for a new identity assertion!

## **Fields**

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
  For a complete list of known identity references, please see [**REFS.md**](/REFS.md).
- **`tags`**:  
  An array of strings representing keywords or categories that provide additional context for the keyholder’s identity. Tags might include roles (e.g., `developer`, `maintainer`) or organizations (e.g., `OWASP`).  
  Example:  
  ```json
  "tags": ["OWASP", "Software Developer"]
  ```

## Example

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

## Important
- **`fingerprint`**: Ensure that the **GPG fingerprint** is presented fully and adheres to the correct pattern (at least 16 alphanumeric characters).
- **`validity`**: The **validity** status should reflect the level of verification based on the provided references. A `full` validity status should only be assigned if multiple independent sources have verified the identity.
- **`refs`**: Each reference must be **verifiable** and should link to an **authoritative, accessible source**.
- **`tags`**: The **tags** field can be used to categorize the keyholder by roles or affiliations (e.g., linking keyholders to specific projects or organizations).
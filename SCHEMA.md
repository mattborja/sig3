# Schema
The included [**schema**](/schema.json) in this repository defines the acceptable structure for identity assertions in the registry. Each identity is associated with a unique GPG key fingerprint and must include key proofs (evidence) to support the identity claim. This section details the necessary requirements for satisfying the minimum schema validation requirements.

> [!NOTE]
> Use an online schema validator like [JSONSchema.dev](https://jsonschema.dev/) to prepare a schema-valid JSON submission for a new identity assertion!

## Fields

The following table summarizes the top-level properties of the schema:

| Key           | Description                                                      | Example Value                                              |
|---------------|------------------------------------------------------------------|------------------------------------------------------------|
| `fingerprint` | The GPG key fingerprint associated with the identity assertion. | `259A55407DD6C00299E6607EFFDE55BE73A2D1ED`                |
| `label`       | The name or title of the key holder.                             | `Jeremy Long`                                              |
| `refs`        | An array of references supporting the identity claim.           | See "Refs" section below.                                  |
| `tags`        | An array of tags categorizing the identity assertion.           | `["OWASP", "Software Developer"]`                       |

## Extended Properties

### Refs
> [!NOTE]
> For latest definitions of acceptable references, please see [REFS.md](/REFS.md) in this repository.

The `refs` property contains an array of reference objects that support the identity assertion. Each reference includes details about the verification context.

| Key        | Description                                                          | Example Value                                             |
|------------|----------------------------------------------------------------------|-----------------------------------------------------------|
| `date`     | The date of the verification or cross-signing in `YYYY-MM-DD` format.| `2024-10-28`                                              |
| `comment`  | A description of the verification performed.                         | `Verified project affiliation with OWASP.`               |
| `artifact` | A cryptographic artifact demonstrating possession of the key.        | `Signed commit hash: 48074e6c0679cf4429f80292e3234f328fc870e9` |
| `url`      | A link to an authoritative source validating the reference.          | `https://github.com/OWASP/www-project-dependency-check`   |
| `type`     | The type of evidence provided. Possible values: `role`, `user`, `key`.| `role`                                                   |

**Full Example of `refs` Collection**
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

### Tags

The `tags` property is an array of strings representing categories or roles associated with the identity assertion.

| Key | Description                                       | Example Value               |
|-----|---------------------------------------------------|-----------------------------|
| -   | A tag categorizing the identity assertion.        | `"OWASP"`, `"Developer"` |

**Full Example of `tags` Collection:**
```json
["OWASP", "Software Developer"]
```

## JSON Example

Below is a theoretical example that would be proposed via new Pull Request as follows:

Filename: **/registry/259A55407DD6C00299E6607EFFDE55BE73A2D1ED.json**

```json
{
  "fingerprint": "259A55407DD6C00299E6607EFFDE55BE73A2D1ED",
  "label": "Jeremy Long",
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

## Additional Considerations & Limitations

- Each `fingerprint` must be unique within the registry. The schema enforces a strict limitation of **one JSON file per fingerprint** being attested. This ensures that every GPG key fingerprint is represented by exactly one identity assertion, preventing duplication and maintaining consistency across the registry. When updating or modifying an assertion, the existing JSON file for the relevant fingerprint must be replaced or updated.
- **`fingerprint`**: Ensure that the **GPG fingerprint** is presented fully and adheres to the correct pattern (at least 16 alphanumeric characters).
- **`refs`**: Each reference must be **verifiable** and should link to an **authoritative, accessible source**.
- **`tags`**: The **tags** field can be used to categorize the keyholder by roles or affiliations (e.g., linking keyholders to specific projects or organizations).

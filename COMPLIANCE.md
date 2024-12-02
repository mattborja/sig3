# Compliance
This document outlines the steps this repository implements to uphold *continuous compliance*.

## Branch protections
- Applies to default branch (`master`)
- Restricts deletions
- Requires signed commits
- Requires pull request before merging
- Requires status checks to pass
- Blocks force pushes
## Required pull requests
Required pull request before merging:
- Dismisses stale pull request approvals on update
- Requires review from Code Owners
- Requires conversation resolution before merging
## Required review from Code Owners
All files require review from Code Owners ([CODEOWNERS](/.github/CODEOWNERS)), except the following:
- Any /registry/*.json files not affiliated with Code Owners
- Any /pubring/*.asc files not affiliated with Code Owners
## Required status checks
- Requires branches to be up to date before merging
- Requires schema validation to pass
- Requires [GitGuardian Security Checks](https://www.gitguardian.com/monitor-internal-repositories-for-secrets) to pass
## Required schema validation
JSON schema validation ([schema.json](/schema.json)) applied as follows:
- Requires minimum GPG identity fingerprint length of 128 bits (16 characters)
- Requires label or name of associated identity
- Requires validity level to be either `full`, `marginal`, `revoked`, or `none`.
- Requires a **minimum of 2 references** (`refs`) that provide evidence to support the identity assertion, specifying required fields: date, comment, type (`role`, `user`, or `key`)
- Requires a list of tags associated with the identity, for the purpose of categorizing or further classifying the associated identity
- No additional properties are permitted
- Limit **1 identity per file** with strict filename validation ([filename-validate.sh](/filename-validate.sh))
- Applies to all ***.json** files found within the registry


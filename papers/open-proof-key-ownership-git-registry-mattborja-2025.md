**Title:**
Open Proof of Cryptographic Key Ownership Using Git as a Registry

**Author:**
Matt Borja

**Copyright:**
Copyright © 2025 Matt Borja  
Licensed under the MIT License.

---

**Abstract**

This paper presents a decentralized approach for cryptographic proof of key ownership using clearsigned artifacts and Git as a global registry. By combining the immutability and transparency of Git with GPG’s clearsigning capabilities, the proposed method ensures global replay resistance, complete traceability, and secure validation. A detailed workflow is outlined, leveraging Git’s content-addressable storage and distributed architecture to establish a self-contained, auditable registry. The paper concludes with a complete implementation of the artifact signing script and practical recommendations for deployment.

---

### Introduction
The ability to prove control of a cryptographic private key is fundamental to modern security protocols. Traditionally, centralized systems such as databases or timestamp authorities are used to provide uniqueness and replay resistance for signed proofs. However, these systems introduce dependencies and scalability challenges. This paper proposes a decentralized alternative that utilizes Git’s version control system as a global, immutable registry for cryptographic artifacts.

The proposed method employs GPG (GNU Privacy Guard) for signing artifacts in a clearsigned format, embedding the artifact payload, signature, and public key fingerprint in a single self-contained document. Replay resistance and auditing are achieved through Git’s deduplication and content-addressable storage.

---

### Artifact Structure
Artifacts are defined as self-contained, uniquely identifiable units that provide cryptographic proof of key ownership. The structure of an artifact is:

```
urn:artifact:<scope>:<random_sequence>
```

- **`<scope>`**: A static identifier defining the artifact’s context (e.g., `mattborja/identity`).
- **`<random_sequence>`**: A 32-byte cryptographically secure random sequence ensuring uniqueness.

An example artifact might look like:
```
urn:artifact:mattborja/identity:4BED165C91073D9F65B88DAC23AF5BCDE520F723C1E62A69B369F278
```

---

### System Workflow

#### Artifact Creation
1. **Generate the Artifact**:
   - Construct the artifact using the predefined format, ensuring that `<random_sequence>` is generated using a cryptographically secure random number generator (e.g., `openssl rand -hex 32`).

2. **Clearsign the Artifact**:
   - Use GPG to create a clearsigned artifact, which packages the artifact, signature, and public key fingerprint.

#### Submission to Git
1. **Add to Git**:
   - Submit the clearsigned artifact to the parent project’s Git repository. Each artifact is stored as a uniquely named file (e.g., `artifact_<random_sequence>.asc`).

2. **Commit and Push**:
   - Use Git’s version control capabilities to commit the artifact and push it to the shared repository.

#### Validation
1. **Verify Signature**:
   - Verifiers fetch the repository and validate the signature of the artifact using the corresponding public key.

2. **Replay Resistance**:
   - Git inherently prevents duplicate artifacts due to its hash-based storage. Replayed artifacts are rejected during the commit process.

---

### Advantages
1. **Decentralized Replay Resistance**:
   - Git’s content-addressable storage ensures that duplicate artifacts are automatically rejected.

2. **Transparency and Auditing**:
   - The repository acts as a public, immutable log of all submitted artifacts.

3. **Self-Contained Proof**:
   - Clearsigned artifacts include all necessary metadata for independent verification, eliminating external dependencies.

4. **Collaborative Workflow**:
   - Git’s distributed architecture enables seamless collaboration between signers and verifiers.

---

### Implementation

#### Artifact Signing Script
The following Bash script automates artifact creation and signing:

```bash
#!/bin/bash
# MIT License
# 
# Copyright (c) 2025 Matt Borja
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# Static scope parameter
SCOPE="mattborja/identity"
LOCAL_USER=""

# Parse optional arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --local-user)
      LOCAL_USER="$2"
      shift 2
      ;;
    *)
      echo "Usage: $0 [--local-user <key_id>]"
      exit 1
      ;;
  esac
done

# Generate a 32-byte cryptographically strong random sequence
RANDOM_SEQUENCE=$(openssl rand -hex 32)

# Construct the artifact
ARTIFACT="urn:artifact:${SCOPE}:${RANDOM_SEQUENCE}"

# Sign and output
if [ -n "$LOCAL_USER" ]; then
  echo "$ARTIFACT" | gpg --clearsign --local-user "$LOCAL_USER"
else
  echo "$ARTIFACT" | gpg --clearsign
fi
```

---

### Conclusion
This approach leverages Git’s distributed, version-controlled architecture and GPG’s cryptographic guarantees to create a decentralized and transparent registry for cryptographic proofs. By eliminating dependencies on centralized authorities, it ensures replay resistance, traceability, and self-contained validation for modern cryptographic systems.

Future work could explore automating this workflow further with CI/CD pipelines or integrating blockchain technologies for additional decentralization.

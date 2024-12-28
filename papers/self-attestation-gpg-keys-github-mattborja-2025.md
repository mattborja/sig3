**Title:**
Self-Attestation of Additional GPG Keys Using GitHub’s Internal Signing Key

**Author:**
Matt Borja

**Copyright:**
Copyright © 2025 Matt Borja\
Licensed under the MIT License.

---

**Abstract**

This document outlines a method for asserting ownership of an external GPG key in a GitHub repository with Vigilant Mode enabled. Since the GitHub-provided signing key used for commits cannot be exported, this process leverages a self-attestation statement to cryptographically link the external GPG key to the repository. The commit signature, clearsigned artifact, and self-attestation statement together establish decentralized proof of ownership. This approach ensures transparency, traceability, and compliance with GitHub’s security requirements.

---

### Introduction

GitHub’s Vigilant Mode requires all commits to be signed with a GitHub-provided GPG key. While this key is suitable for ensuring commit authenticity, its non-exportable nature limits its use for external attestations. This document proposes a process that enables repository owners to claim ownership of an additional GPG key using a self-attestation statement. The self-attestation is made verifiable through the commit signature generated with GitHub’s internal GPG key, allowing decentralized and transparent proof of key ownership.

---

### Self-Attestation Process

#### Prerequisite

Refer to the "Open Proof of Cryptographic Key Ownership Using Git as a Registry" paper (Matt Borja, 2025) for the detailed steps required to generate and clearsign a unique artifact using the external GPG key. The artifact must follow the format defined in that paper (e.g., `urn:artifact:<scope>:<random_sequence>`). This clearsigned artifact will serve as cryptographic proof of ownership for the external GPG key and is a critical component of the self-attestation process.

#### Formation of Self-Attestation Statement

1. **Confirm Key ID**:

   - Before proceeding, confirm the external GPG key ID to be used in the self-attestation.

2. **Create the Self-Attestation Statement**:

   - Declare ownership of the external GPG key.
   - Include the fingerprint of the external GPG key and reference the clearsigned artifact, as outlined in the "Open Proof of Cryptographic Key Ownership Using Git as a Registry" paper (Matt Borja, 2025). Ensure the artifact follows the required format and is clearsigned using the external GPG key.
   - Example statement:
     ```
     # Self-Attestation Statement
     
     I, [GitHub Username], hereby claim ownership of the GPG key with fingerprint:
     <public_key_fingerprint>

     Artifact signed with this key:
     -----BEGIN PGP SIGNED MESSAGE-----
     Hash: SHA256

     urn:artifact:<scope>:<random_sequence>
     -----BEGIN PGP SIGNATURE-----

     ...
     -----END PGP SIGNATURE-----
     ```

3. **Save the Statement**:

   - Save the self-attestation statement to a file named `repo-attest-KEYID.txt` to align the filename with the external key ID being attested.

#### Commit the Self-Attestation

1. **Add the Self-Attestation Using GitHub’s Web Interface**:

   - **Recommended.** Ensure you have [Vigilant Mode](https://docs.github.com/github/authenticating-to-github/displaying-verification-statuses-for-all-of-your-commits) enabled for your GitHub account.
   - Navigate to the target repository on GitHub.
   - Use only the GitHub web interface to upload the `repo-attest-KEYID.txt` file containing your self-attestation statement.

2. **Create a Signed Commit**:

   - During the file upload process, enter a descriptive commit message, such as:
     ```
     Self-attestation of external GPG key ownership
     ```
   - Complete the commit process. GitHub’s internal signing key will automatically sign the commit under Vigilant Mode.

By using GitHub's internal non-exportable GPG key, this method ensures the authenticity of the commit while maintaining compatibility with Vigilant Mode's strict security requirements.

---

### Validation of Self-Attestation

#### Practical Example
Suppose a user with GitHub username `mattborja` wants to self-attest ownership of the GPG key with fingerprint `99BB608E30380C451952D6BBA1C7E813F160A407` (in accordance with the aforementioned artifact requirements).

1. **Generate and Clearsign the Artifact**:
   ```bash
   sh ./artifact-sign.sh --local-user 99BB608E30380C451952D6BBA1C7E813F160A407
   ```

2. **Create the Self-Attestation Statement**:
   Build a self-attestation statement with the resulting clearsigned artifact appended as follows. Replace `<scope>` and `<random_sequence>` with the actual values used in your artifact:
   ```
   # Self-Attestation Statement
   
   I, @mattborja, hereby claim ownership of the GPG key with fingerprint:
   99BB608E30380C451952D6BBA1C7E813F160A407

   Artifact signed with this key:
   -----BEGIN PGP SIGNED MESSAGE-----
   Hash: SHA512

   urn:artifact:mattborja/identity:ad7b6bf381cdffe7b025e9943d46c2eae7d0e5bb483a93867be4ed060aa33fe3
   -----BEGIN PGP SIGNATURE-----

   iHUEARYKAB0WIQTUGoPhxrcBYZ0NgS/D9p0b5ry9FgUCZ3Bp9wAKCRDD9p0b5ry9
   FiDsAPsH2NXrLLlIE0pFe27v04/B/yi4xbq+gu7uWlwC/huz3gEA0L2WDxqGj+fP
   O6PQJZHqNEXo68fFMlP/JYErl8vxFwY=
   =UBtD
   -----END PGP SIGNATURE-----
   ```

3. **Upload and Commit the File**:
   - Use GitHub’s web interface to create this file as `repo-attest-99BB608E30380C451952D6BBA1C7E813F160A407.txt`.
   - Add an appropriate commit message: `Self-attestation of external GPG key: 99BB608E30380C451952D6BBA1C7E813F160A407`.

This example completes the process from start to finish.

### Validation of Self-Attestation

1. **Verify the Commit Signature**:

   - Ensure the commit containing the self-attestation is signed with GitHub’s internal GPG key:
     ```bash
     git log --show-signature
     ```
   - Confirm that the signature matches GitHub’s key.

2. **Validate the Artifact Signature**:

   - Extract and validate the artifact within the self-attestation statement using the claimed external GPG key:
     ```bash
     gpg --verify <clearsigned_artifact_section>
     ```

3. **Check Consistency**:

   - Ensure the external GPG key’s fingerprint in the self-attestation matches the fingerprint of the key used to sign the artifact.
   - Confirm the artifact is cryptographically valid.

---

### Advantages

#### Clarification on External Key Signing

If the GitHub-provided internal GPG key were exportable, the external GPG key could simply be signed directly by the GitHub key, providing a streamlined method to establish ownership. However, since the internal key is non-exportable, this process relies on a self-attestation statement and commit signature to establish a verifiable chain of ownership.

1. **Commit Signature Validity**:

   - The GitHub-signed commit provides strong evidence that the self-attestation originates from the repository owner.

2. **Cryptographic Proof**:

   - The external GPG key’s ownership is demonstrated through the clearsigned artifact.

3. **Immutability and Transparency**:

   - Once committed, the self-attestation and associated files are part of the immutable repository history, ensuring transparency.

4. **Alignment with GitHub’s Vigilant Mode**:

   - The process complies with Vigilant Mode’s requirement for commits to be signed with GitHub’s internal GPG key.

---

### Recommendations

1. **Standardized Self-Attestation Format**:

   - Adopt a standardized template for self-attestation statements to reduce ambiguity and improve verifiability.

2. **Automate Validation**:

   - Develop scripts or CI workflows to automate the validation of commit signatures, self-attestation statements, and artifact signatures.

3. **Publish External GPG Key**:

   - Ensure the public key of the external GPG key is available on trusted keyservers for independent verification.

---

This approach enables users to assert ownership of additional GPG keys while maintaining compliance with GitHub’s Vigilant Mode. By leveraging cryptographic proofs and Git’s immutable history, it provides a transparent and decentralized mechanism for establishing key ownership.


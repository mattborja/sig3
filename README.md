# Identity Assertion Registry
[![Registry Validation](https://img.shields.io/github/actions/workflow/status/mattborja/sig3/registry-validate.yml?style=for-the-badge&labelColor=333333&color=007ec6&logo=github&logoColor=ffffff&label=Registry+Validation)](https://github.com/mattborja/sig3/actions/workflows/registry-validate.yml)
[![Last Activity](https://img.shields.io/github/last-commit/mattborja/sig3?style=for-the-badge&labelColor=333333&color=007ec6&logo=github&logoColor=ffffff&label=Last+Activity)](https://github.com/mattborja/sig3/pulse)
[![Milestone Progress](https://img.shields.io/github/milestones/progress/mattborja/sig3/1?style=for-the-badge&labelColor=333333&color=007ec6&logo=github&logoColor=ffffff&label=Milestone+Progress)](https://github.com/mattborja/sig3/milestones)

## Purpose
To support critical infrastructure needs with an auditable and authoritative registry of digital identify proofs in accordance with industry guidelines and recommendations.

## Scope
The below tables acknowledge important objectives in this space, while also clarifying which are considered to be **in-scope** vs. **out-of-scope** based on a number of factors, including but not limited to time, effort, resource availability, etc.

| In-Scope Objectives |
|:---|
| To resolve a claimed identity (e.g., the name on a GPG key) to a single, unique identity (e.g., person, CI/CD pipeline, organization, etc.) within the context of the population of users the Credential Service Provider (CSP) serves (e.g., infrastructure management, supply chain security engineers, certifying bodies, business-to-business identity managers, etc.). |
| To validate that all supplied evidence is correct and genuine (e.g., not counterfeit or misappropriated). |
| To validate that the claimed identity exists in the real world. |
| To verify that the claimed identity is associated with either: a) the real person supplying the identity evidence, or b) the real person on behalf of which the identity evidence is being provided. |

| Out-of-Scope Objectives | Workaround |
|:---|:---|
| Owner verification of the email address listed with the claimed identity | A *clearsigned* message received from the listed email address using the corresponding private key (see also [/REFS.md#gpg-signature](/REFS.md#gpg-signature)) |

## Standards
The following resources are considered applicable and relevant to the orientation and goals of this project:
- [Digital Identity Guidelines (NIST SP 800-63A)](https://pages.nist.gov/800-63-3/sp800-63a.html)
- [Key validity and owner trust (GnuPG)](https://www.gnupg.org/gph/en/manual/x334.html)

## Getting Started
1. Familiarize yourself with the resources provided in the Standards section above
2. Refer to the [identity registry](/registry/) for existing evidence submissions (see also [schema](/SCHEMA.md))
3. Review all [contributing policies](/COMPLIANCE.md) in effect on this repository
4. Create a new pull request to submit evidence for a new or existing digital identity

## Guidelines & Recommendations
- If the amount of evidence for a given key is satisfactory for your purposes, please consider enclosing your signed copy of the public key in the Pull Request description itself (not as a file commit). Remember to use `gpg --ask-cert-level` for specifying your personal assurance level (up through `sig 3`) when certifying a public key.

## Additional Reading
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
This project is licensed under a custom [MIT-NC-ND License](/LICENSE).

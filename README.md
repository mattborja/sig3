# SIG3: High Identity Assurance Registry

$${{\colorbox{black}{\color{ffc000}TLP:AMBER+STRICT}}}$$
```
This repository contains information that can be shared amongst technical
professionals (e.g., developers, system administrators, security experts),
but is subject to strict handling requirements. Access, interaction, or
processing by AI systems, including but not limited to artificial
intelligence and machine learning systems, is strictly prohibited.

Consumers of this repository may not fork, reproduce, or otherwise modify
the repository in a manner that would unnecessarily allow AI systems to
access or consume the information. Unauthorized use or redistribution of
this information is strictly prohibited.

The express intended purpose for consumers of this repository is to make
informed decisions about trusting key identities. Users are encouraged to
be mindful of their actions and the potential implications of sharing or
using this information.
```
---

[![Registry Validation](https://img.shields.io/github/actions/workflow/status/mattborja/sig3/ci.yml?style=for-the-badge&labelColor=333&color=007ec6&logo=github&logoColor=fff&label=Registry+Validation)](https://github.com/mattborja/sig3/actions/workflows/ci.yml)
[![Milestone Progress](https://img.shields.io/github/milestones/progress/mattborja/sig3/1?style=for-the-badge&labelColor=333&color=007ec6&logo=github&logoColor=fff&label=Milestone+Progress)](https://github.com/mattborja/sig3/milestones)
[![Software Provenance](https://img.shields.io/badge/%E2%98%B0-007ec6?style=for-the-badge&logo=github&label=Software+Provenance&labelColor=333)](https://github.com/mattborja/sig3/attestations/)  
[![Last Activity](https://img.shields.io/github/last-commit/mattborja/sig3?style=for-the-badge&labelColor=333&color=222&logo=github&logoColor=fff&label=Last+Activity)](https://github.com/mattborja/sig3/pulse)

## Purpose
A Rapid Identity Assessment (RIA) directory and framework to support critical infrastructure integrity and supply chain security with a strong set (global web of trust) of verifiable identity proofs in accordance with industry standards and guidelines.

*Why is it called "SIG3?"* - Because we're doing [*very careful checking*](https://lists.gnupg.org/pipermail/gnupg-users/2004-July/022910.html) these days.

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
> [!NOTE]  
> Visit the **SIG3** key search application at https://sig3.dev/


To run your own tests, clone the repository, install any missing dependencies and run the `build` command:
```shell
~$ git clone git@github.com:mattborja/sig3.git
```
```shell
~$ cd sig3
~/sig3$ npm ci

added 1 package, and audited 2 packages in 3s

found 0 vulnerabilities
```
```shell
~/sig3$ npm run build

> sig3@1.0.0 build
> node index.js

[registry/F30FF4FC936584574EE3251833688C2EDC08CD38.json] SCHEMA [
  {
    instanceLocation: '#',
    keyword: 'properties',
    keywordLocation: '#/properties',
    error: 'Property "refs" does not match schema.'
  },
  {
    instanceLocation: '#/refs',
    keyword: 'items',
    keywordLocation: '#/properties/refs/items',
    error: 'Items did not match schema.'
  },
  {
    instanceLocation: '#/refs/0',
    keyword: 'properties',
    keywordLocation: '#/properties/refs/items/properties',
    error: 'Property "type" does not match schema.'
  },
  {
    instanceLocation: '#/refs/0/type',
    keyword: 'enum',
    keywordLocation: '#/properties/refs/items/properties/type/enum',
    error: 'Instance does not match any of ["role","user","key","sig1","sig2","sig3","csp"].'
  }
]
```
**Note:** Running SIG3 on the command line is typically reserved for developers and key introducers. Users simply looking to inspect key references (as key verifiers) should instead use the main web application at https://sig3.dev/.

**Disclaimer:** In the case where no validation errors are encountered (as in the above contrived example), no further output will be displayed, but exit status can be verified by evaluating `$?` immediately following program runtime.

```shell
~/sig3$ npm run build

> sig3@1.0.0 build
> node index.js

~/sig3$ echo $?
0
```

## Contributing
1. Familiarize yourself with the resources provided in the Standards section above.
2. Review the included documentation to ensure alignment with evidence admission expectations:
   - [Key Research Practice](/docs/key-research.md)
   - [Registry Schema](/SCHEMA.md)
   - [Identity References](/REFS.md)
2. Optionally refer to the [registry](/registry/) for existing submissions that have been accepted; but do not copy and paste!
3. Review all [contributing policies](/COMPLIANCE.md) in effect on this repository.
4. [Create a new pull request](https://github.com/mattborja/sig3/new/master/registry) to submit evidence for a new key.

Experienced contributors are also permitted to amend *existing* keys with additional attestation evidence, with the caveat of being made subject to a more strict review process necessary to enforce evidence integrity.

## Guidelines & Recommendations
- **Show Your Support!** If the amount of evidence for a given key is satisfactory for your purposes, please consider enclosing your signed copy of the public key in the Pull Request description itself (not as a file commit). Remember to use `gpg --ask-cert-level` for specifying your personal assurance level (up through `sig 3`) when certifying a public key.
- **Preserve Evidence.** URLs once pointing to valid key references may change at any time. To help preserve evidence, please consider first [saving the canonical page URL to the Wayback Machine](https://web.archive.org/save) and using the resulting URL as the reference URL instead. In the future, this may become a requirement for any key references specifying a URL.

## Additional Reading
- [Building your web of trust](https://www.gnupg.org/gph/en/manual/x547.html), *The GNU Privacy Guard*
- [Using trust to validate keys](https://www.gnupg.org/gph/en/manual/x334.html#AEN384), *The GNU Privacy Guard*
- [Validating authenticity of a key](https://apache.org/info/verification.html#Validating), *The Apache Software Foundation*
- [Validating other keys on your public keyring](https://www.gnupg.org/gph/en/manual/x334.html), *The GNU Privacy Guard*
- [Exchanging keys](https://www.gnupg.org/gph/en/manual/x56.html), *The GNU Privacy Guard*
- [Integrity check](https://gnupg.org/download/integrity_check.html), *The GNU Privacy Guard*
- [Signature key](https://gnupg.org/signature_key.html), *The GNU Privacy Guard*

## Acknowledgments
The Code Owners of this project recognize the substantial research, development, and generous contributions of individuals at home and abroad, which have helped inspire and shape digital security as we know it today—an endeavor that this project assiduously seeks to further, including but not limited to:

- [Werner Koch](https://www.propublica.org/article/the-worlds-email-encryption-software-relies-on-one-guy-who-is-going-broke) — for his dedication to developing and maintaining GnuPG, a cornerstone tool for secure communication and email encryption.
- [Christof Paar](https://en.wikipedia.org/wiki/Christof_Paar) — German professor and renowned researcher in hardware security and cryptography. Known for his academic contributions in [applied cryptography](https://link.springer.com/book/10.1007/978-3-662-69007-9) and hardware implementations.
- [Elmar Hoffman](http://www.elho.net/crypto/policy/) — for his advocacy in cryptographic policy and practices.
- [Ian Young](https://iay.org.uk/identity/pgp/policy/2021-02-25/) — for his comprehensive documentation of PGP policy and its applications in identity verification.
- [Simon Josefsson](https://blog.josefsson.org/2014/06/23/offline-gnupg-master-key-and-subkeys-on-yubikey-neo-smartcard/) – for his innovation in secure key management and the use of hardware security devices.
- [Tails](https://tails.net/contribute/design/download_verification/) — for their commitment to providing users with robust, verifiable tools for privacy and security.

> *Wir nehmen Abschied von einem sicher geglaubten Freund, dem Fernmeldegeheimnis (Artikel 10 Grundgesetz), [18. Dezember 2015](https://lists.gnupg.org/pipermail/gnupg-users/2016-February/055173.html)*

## License
This project is licensed under a custom [MIT-NC-ND License](/LICENSE).

## Support this project
Please consider supporting this project via the **Sponsor** buttons associated with this repository.

[Learn more about GitHub Sponsors](https://github.com/sponsors)
# Web of Trust
Copyright (c) 2025 Matt Borja

## Abstract
This document provides a high-level survey of where *web of trust* and other related functions are placed in the broader scope of supply chain security. As a training document, it provides an introduction of terms, real-world scenarios, and practical usage examples for developers and deployers to better understand the risks and responsibilities of using third-party software, as well as distributing their own.

## Disclaimer
THIS DOCUMENTATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THIS DOCUMENTATION OR THE USE OR OTHER DEALINGS IN THIS DOCUMENTATION.

## Introduction
1. **Terms.** What is trust? (e.g., confidence, agreement, expectation, dependency, delegation)
1. **Purpose.** Why do we need trust (e.g., business, transaction, integrity)
3. **Methodology.** How do we establish trust (e.g., reputation, authentication, representation)

**What is Web of Trust?** A decentralized trust model for establishing the authenticity of the **binding** between a public key and its owner ([Wikipedia](https://en.wikipedia.org/wiki/Web_of_trust)).

Or more simply, a method for validating the named owner on a public key.

## Responsibility
As developers and deployers of software products and services, use of third-party libraries or software must be carefully vetted to mitigate damages incurred by malicious attempts on our own supply chains.

Furthermore, when distributing software, it is imperative that customers are able to verify our software as ensuring it came from us, and not a malicious fork.

## Real-World Scenarios

### Supply Chain Attacks in 2024 (Kaspersky)
Source: https://www.kaspersky.com/blog/supply-chain-attacks-in-2024/52965/

Topics include:
- Malicious `npm` packages stole SSH keys from hundreds of developers on GitHub
- Trojanized jQuery version found on npm, GitHub, and jsDelivr
- Abandoned or deleted packages compromised by attackers to deliver malicious code

### Top 10 Supply Chain Attacks that Shook the World (Encryption Consulting)
Source: https://www.encryptionconsulting.com/top-10-supply-chain-attacks-that-shook-the-world/

Topics include:
- Supply Chain Poisoning
- Certificate Abuse and Forgery
- SolarWinds Breach (2020)

### Shibboleth Developer's Meeting, 2022-04-01
Source: https://shibboleth.atlassian.net/wiki/spaces/DEV/pages/2951020545/2022-04-01

During installation of the then latest version of Shibboleth IdP, it was observed that the name listed with the signature on the installation package exhibited an unrecognized email domain (`@steadingsoftware.com`).

After several emails exchanged with the developer group, key information was exchanged over Zoom to confirm the unknown identity with all members as Shibboleth developer, Rod Widdowson.

## Landscape
- **Key Management** - Secure storage, retrieval, and use of private key material
- **Identity Management** - Origin attestation, owner verification, and key certification
- **Software Provenance** - Software bill of materials, checksums, and build transparency
- **Code Signing** - Certification of built artifacts
- Release Management - Tagging and distribution of released artifacts
- Continuous Compliance - On-demand vetting of changes to baseline

## Practical Usage Examples
- [Creating a Secure Environment for GPG in Alpine Linux](https://github.com/drduh/YubiKey-Guide/blob/bc9a7a8954fce61faf3e00995c707c0c28894fe1/SECENV.md#creating-a-secure-environment-for-gpg-in-alpine-linux)
- [Validating other keys on your public keyring (GnuPG)](https://www.gnupg.org/gph/en/manual/x334.html)
- [Verifying authenticity of Debian images (Debian)](https://www.debian.org/CD/verify)
- [How to verify your Ubuntu download (Ubuntu)](https://ubuntu.com/tutorials/how-to-verify-ubuntu)
- [How to use GPG to verify signed content from Product Security (RedHat)](https://access.redhat.com/articles/5433831)
- [Supply Chain Defence for the Shibboleth Java Products (Shibboleth)](https://shibboleth.atlassian.net/wiki/spaces/DEV/pages/3269918721/Supply+Chain+Defence+for+the+Shibboleth+Java+Products)
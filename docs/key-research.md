# Key Research
Copyright (c) 2025 Matt Borja

## Abstract
This document demonstrates methodologies for corroborating key validity through a variety of circumstantial evidence, techniques, and rationale; as applied to a number of research cases. A framework of tools is provided as guidance to the reader to explain how each contribute to the effectiveness of research and to what extent they are to be used in assessments. The overall document is intended to produce a more holistic view of any given key, based on the spread of information available at the time of collection.

## Framework
**Search Engine Algorithm (SEA).** While not conclusively authoritative, search engines alone often contribute a certain degree of verity to the identity of official websites, including but not limited to content analysis, relevancy, and page ranking algorithms. Search engines typically consider external factors in the determination of page rank such as the amount of high quality links back to a given domain. To an extent, this provides a framework for trusting search engine results to a certain degree, backed by a large number of decentralized resources.

**Public Key Infrastructure (PKI).**

**Open Source (OSS).**

## Research Cases
### Node.js
#### Inferrence of Domain
Node.js is a widely used JavaScript runtime, commonly found in high performing server-side applications, serverless APIs, microservices, and cloud-based development environments. Because of its widespread industry adoption in production environments, an official website must be publicly available for the general audience to access and download the runtime from. The de facto mode of discovery of said website will be through the use of also widely accepted search engines, such as Google, Bing, DuckDuckGo, etc.

**Result:**
```yaml
Yield: Domain (https://nodejs.org/)
Method: SEA
Authority: DuckDuckGo
Reputation: +0
Chain: SEA
```

#### PKI Verification
Given the implementation and requirements of the `https://` protocol, users are expected to carefully examine the certificate presented by the server to determine if it meets their expectations ([RFC 2818, § 3.1](https://www.rfc-editor.org/rfc/rfc2818#section-3.1)).

This can be done in the terminal using the `openssl s_client` command to observe that the certificate is [Domain Validated by Sectigo Limited](https://www.sectigo.com/ssl-certificates-tls/dv-domain-validation), a Certificate Authority and Lifecycle Management platform in use by a number of other high profile businesses:
```shell
$ date
Fri May 30 05:33:47 PM UTC 2025

$ openssl s_client -connect nodejs.org:443
CONNECTED(00000003)
depth=2 C = US, ST = New Jersey, L = Jersey City, O = The USERTRUST Network, CN = USERTrust RSA Certification Authority
verify return:1
depth=1 C = GB, ST = Greater Manchester, L = Salford, O = Sectigo Limited, CN = Sectigo RSA Domain Validation Secure Server CA
verify return:1
depth=0 CN = *.nodejs.org
verify return:1
---
Certificate chain
 0 s:CN = *.nodejs.org
   i:C = GB, ST = Greater Manchester, L = Salford, O = Sectigo Limited, CN = Sectigo RSA Domain Validation Secure Server CA
   a:PKEY: rsaEncryption, 4096 (bit); sigalg: RSA-SHA256
   v:NotBefore: Mar 12 00:00:00 2025 GMT; NotAfter: Apr 12 23:59:59 2026 GMT
 1 s:C = GB, ST = Greater Manchester, L = Salford, O = Sectigo Limited, CN = Sectigo RSA Domain Validation Secure Server CA
   i:C = US, ST = New Jersey, L = Jersey City, O = The USERTRUST Network, CN = USERTrust RSA Certification Authority
   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA384
   v:NotBefore: Nov  2 00:00:00 2018 GMT; NotAfter: Dec 31 23:59:59 2030 GMT
 2 s:C = US, ST = New Jersey, L = Jersey City, O = The USERTRUST Network, CN = USERTrust RSA Certification Authority
   i:C = GB, ST = Greater Manchester, L = Salford, O = Comodo CA Limited, CN = AAA Certificate Services
   a:PKEY: rsaEncryption, 4096 (bit); sigalg: RSA-SHA384
   v:NotBefore: Mar 12 00:00:00 2019 GMT; NotAfter: Dec 31 23:59:59 2028 GMT
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIHLDCCBhSgAwIBAgIQOST8RhmGwpOXfZLSqSLC3TANBgkqhkiG9w0BAQsFADCB
jzELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G
A1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTcwNQYDVQQD
Ey5TZWN0aWdvIFJTQSBEb21haW4gVmFsaWRhdGlvbiBTZWN1cmUgU2VydmVyIENB
MB4XDTI1MDMxMjAwMDAwMFoXDTI2MDQxMjIzNTk1OVowFzEVMBMGA1UEAwwMKi5u
b2RlanMub3JnMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAv4TCzWJ/
L8XsyNHPjfFZESWFbtpeQuJ3NsEJxUXBc43R21GN2faLESQCbxtQvrMNn+KBMaze
zWVGHbmSL3UEdBuPMAVqvV3riepQmGd2swueRKO5RrYk3ZKIyeSS9JUvVot4mCyI
tllymPLM4Lz/9suwusMiwn8gEW968SL4/zS+hZYJe9PTu3GZdGdFKe3Nh1ZPZsuP
tsjegKmAiLkKWtq83vi3UxxTDHkssnr43yr9RmmvBW5Z9b/bXxCnUA4lZYn7G5wJ
WNvETynHlosIYChkicEkDODAl/jhgnP9bdEO9m5QXn1HaewBjcx2kFs6IrZ06IG6
dyeQR0NY4X/igC01lT1zgm3YchL80gQk+R5351+fZdF84sTReaz43KaTB+HMPeDG
N9e1XLm11ResbZEPbcBDXg45nENYz3AdfwzlPmwNz4JA6yO2HwaR/HiJIKe1Olmc
2MkYmkxDfOtq1izwZUEcgATkJVw8+tHOpzE9RXg6fObnQgKlvHG8pVhPTLLb50dn
ebKHxUASORBsFLW5scNdiQjKmW1J0JlukPwcVJffIC4M/feVTV1I5HN3sWC9XMfJ
6nLINvl/yu/dyniVtVe36wceORq/Ht6S6g1zWgbQy61qi0tQOm44uOkdTHoItneT
shE4YZpf4Ozbn5uYRHtgZUzxa38q2nHa5MMCAwEAAaOCAvkwggL1MB8GA1UdIwQY
MBaAFI2MXsRUrYrhd+mb+ZsF4bgBjWHhMB0GA1UdDgQWBBQYUmN/mgNGlebhm3W9
SdATdX9tVTAOBgNVHQ8BAf8EBAMCBaAwDAYDVR0TAQH/BAIwADAdBgNVHSUEFjAU
BggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEEAbIxAQICBzAl
MCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29tL0NQUzAIBgZngQwBAgEw
gYQGCCsGAQUFBwEBBHgwdjBPBggrBgEFBQcwAoZDaHR0cDovL2NydC5zZWN0aWdv
LmNvbS9TZWN0aWdvUlNBRG9tYWluVmFsaWRhdGlvblNlY3VyZVNlcnZlckNBLmNy
dDAjBggrBgEFBQcwAYYXaHR0cDovL29jc3Auc2VjdGlnby5jb20wIwYDVR0RBBww
GoIMKi5ub2RlanMub3Jnggpub2RlanMub3JnMIIBfQYKKwYBBAHWeQIEAgSCAW0E
ggFpAWcAdgCWl2S/VViXrfdDh2g3CEJ36fA61fak8zZuRqQ/D8qpxgAAAZWMKsHX
AAAEAwBHMEUCIB8BBLdVwe/tK596qZ2xd+zpDvZlKamOLLb/FJsf3jGXAiEA6RHZ
z4sUVH8W/rOln9b38kuwNCfXRg69OKE5HAu0oIkAdQAZhtTHKKpv/roDb3gqTQGR
qs4tcjEPrs5dcEEtJUzH1AAAAZWMKsG0AAAEAwBGMEQCIE6Al5/J6PgCA8lY7uBz
t3a4Milg20fpCtS92p7Zeyz9AiBBj3KWrb4GowxZGHOANFOWlaUCxIvfCZEtmOu3
xMbDKAB2AMs49xWJfIShRF9bwd37yW7ymlnNRwppBYWwyxTDFFjnAAABlYwqweYA
AAQDAEcwRQIgdf8KH1gTFDJZI9hc03afnJ2m6DD1a2KOxmxPOgEwrK4CIQDoxvVG
ankll1LlYBvYS2qIx8l61fTeMSOXjpO0cIG+dTANBgkqhkiG9w0BAQsFAAOCAQEA
LcoNt0VFS4jVoMMihgEup1t5Vasmz6kFUkxQRWeH7rZuJnyR0DOywx0xKDqUFvKV
1BbHSfEHBYoZtRMFJKO4FWd9rWp1Duyz1lvgM4HnJYHd3aGVggqtkGqshSSURiiR
T4wzRBygggoNZH4tXDqq5+USkUt9r9fGKFX7Pyft8WXdqvThAjfB7hPh6qa7GPU8
Ddvno5kYK67boKw7sM2+vt9orwlD+upKwxMVJgqupOalFJlu1ZVvPBAGABE4HUYg
pCRPpjOTha/NtEFeJQYYZa6of8DHTNoS6Y3HW+3gXOZbe2sLYKA+6iKtYzd3yiWu
UB9p5Te4M3zWtYgvE4SWYw==
-----END CERTIFICATE-----
subject=CN = *.nodejs.org
issuer=C = GB, ST = Greater Manchester, L = Salford, O = Sectigo Limited, CN = Sectigo RSA Domain Validation Secure Server CA
```

**Result:**
```yaml
Yield: Domain Validation (nodejs.org, *.nodejs.org)
Method: PKI
Authority: Sectigo Limited
Reputation: +10
Chain: SEA+PKI
```

#### Inferrence of GPG Source
Borrowing from `Domain Validation` trust, it is both common and expected to find GPG sources involved in the cryptographic signing of artifacts that provide assurance to the user communities of the integrity and origin of released software. Therefore, public keys will typically be found on or in close connection to the same page where downloads are published.

Linear navigation sequence:
1. https://nodejs.org/en - Home page with Download button in main navigation
1. https://nodejs.org/en/download - Linked Download page with link in footnotes to "Learn how to verify signed SHASUMS" at external and open source GitHub repository resource presumably owned by same identity
1. https://github.com/nodejs/node#verifying-binaries - Linked external resource anchored to "Verifying binaries" section of the corresponding page with link to "the GPG keys of individuals authorized to create releases"
1. https://github.com/nodejs/node#release-keys - Linked list of identities, email addresses, and fingerprints of primary GPG keys and subkeys authorized to sign Node.js releases.

**Result:**
```yaml
Yield:
- GitHub repository (https://github.com/nodejs/node)
- Release signing keys (https://github.com/nodejs/node#release-keys)
Method: OSS
Authority: GitHub
Reputation: +1
Chain: SEA+PKI+OSS
```

#### Fingerprint Corroboration
Noting the discovery of release signing keys has only been built on a singular chain of trust to this point (`SEA+PKI+OSS`), additional research is preferred to being corroborating evidence with other external sources.

Additional sources include, but are not limited to:
- Forums
- Blogs
- Mailing lists
- Archives
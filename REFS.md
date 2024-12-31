# ID References (Proofs)
A reference table listing circumstantial evidence that supports the presumptive correlation between identity proofs and their reasonable outcomes.

> [!WARNING]
> **Exercise caution when using the proofs listed in this document.** Many of these entries contain **sensitive personally identifiable information (PII)**, which should **NOT** be disclosed publicly (e.g., in commits or pull requests in this repository). 
>
> The information provided here is for **informational purposes only** and is not intended as legal or professional advice. By utilizing or sharing this information, you acknowledge that you are responsible for ensuring that no confidential or sensitive data is exposed inappropriately.
>
> **Indemnification Notice**: The authors and contributors of this document shall not be held liable for any misuse, legal consequences, or damage resulting from the use, dissemination, or exposure of the information contained herein. It is the user's responsibility to ensure that this document is used in compliance with applicable privacy laws and regulations.


| Classification            | Example                                | Assertion                                        | Verification                                         | Authority                      |
|---------------------------|--------------------------------------------------|-----------------------------------------------------------|------------------------------------------------------------|----------------------------------------|
| **Cryptographic**          | GPG signature bearing public key fingerprint     | Subject possesses the corresponding private key            | Public key infrastructure (PKI) validation of keypair       | Self-validated through cryptographic system |
| **Communication**          | S/MIME encrypted and/or signed email             | Email address and corresponding private key belong to subject | Public key cryptography ensures message integrity and identity | Email service provider, cryptographic system |
| **Content-Based**          | Residential utility bill                         | Subject resides at a specific address                      | Utility company's billing and account records               | Utility company                        |
| **Content-Based**          | Mortgage statement                               | Subject is financially linked to property ownership        | Mortgage lender’s financial records                          | Mortgage lender                        |
| **Content-Based**          | Project involvement, published content           | Subject is associated with specific roles or contributions | System timestamps, version control logs, and publication metadata | System records, version control system  |
| **Institutional**          | Employee ID                                      | Subject is employed by a specific organization or entity   | Issuer's official records (e.g., HR system)                 | Employer                               |
| **Institutional**          | Driver’s license                                 | Subject is authorized to operate a vehicle                 | Government registry confirmation (e.g., DMV)                | Government (e.g., Department of Motor Vehicles) |
| **Institutional**          | Warehouse or grocery store membership card       | Subject is a member or customer of a specific organization | Membership system verification                               | Retailer or membership organization    |
| **Institutional**          | Voter identification card                        | Subject is eligible to vote and registered with an electoral body | Government electoral rolls verification                     | Government (e.g., Election Commission)  |
| **Institutional**          | Dental insurance card                            | Subject is covered by a specific dental insurance plan    | Insurer’s policy records                                    | Insurance provider                     |
| **Institutional**          | Medical, vision, Rx card                         | Subject is covered by a health, vision, or Rx plan         | Health insurer’s records validation                          | Insurance provider                     |
| **Institutional**          | Explanation of Benefits (EOB)                    | Subject has received healthcare benefits                    | Issuer’s records and claim system                            | Healthcare provider or insurer         |
| **Institutional**          | Property tax information statement               | Subject owns or is responsible for the tax on property     | Local government or tax authority database                  | Local government/tax authority         |
| **Institutional**          | Industry license (e.g., amateur radio)           | Subject is licensed to operate within a specific industry or activity | Issuing licensing agency confirmation                        | Licensing authority (e.g., FCC)        |
| **Institutional**          | IRS notice                                        | Subject is the subject of an IRS notice or tax action      | Government records and official IRS documentation           | Government (IRS)                       |
| **Industry Certification** | Industry certification (e.g., GIAC)               | Subject has demonstrated proficiency in a specific field, such as cybersecurity | Online certification validation or records search           | Certifying authority (e.g., GIAC)      |


## About Classifications

- **Institutional Proofs**: Many of the examples like the driver's license, voter ID, and insurance cards are **institutional** because they are issued by recognized entities (government, private insurance, or service providers) to confirm the subject’s identity, qualifications, or rights.
  
- **Content-Based Proofs**: Utility bills, mortgage statements, and project involvement fall under **content-based proofs** because they provide evidence of specific actions, locations, or financial status through records that the subject may not directly control but can be verified through other systems or organizations.

- **Communication Proofs**: The S/MIME email example fits under **communication** since it involves the subject's email address, and cryptographic methods are used to confirm identity and message integrity.

- **Institutional proofs** generally involve some form of external validation through an issuing body (e.g., government, healthcare provider, or employer).
- **Content-based proofs** rely on records that document specific actions or information related to the subject, such as utility bills, project timestamps, and financial statements.

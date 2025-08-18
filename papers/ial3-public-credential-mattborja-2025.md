# Delegated Verification in Identity Assurance

© 2025 Matt Borja

### **Abstract**

This paper explores the utility of delegated verification and proof beyond a reasonable doubt for the purpose of establishing identity assurance. While it considers the framework of NIST Special Publication 800-63A as a guide, it proposes to demonstrate the possibility of achieving a high identity assurance level (as in IAL3) without the need for direct handling of sensitive personally identifiable information (PII) by the prover. The example of remote proctored certification exams is provided, illustrating how identity verification can be conducted by a trusted third party to ensure one of potentially many secure and reliable approaches to high-assurance identity verification.

### **1. Introduction**

Identity assurance is a critical component of secure digital interactions, ensuring that individuals are who they claim to be. Traditional identity verification methods often require direct handling of personally identifiable information (PII), creating security and privacy risks. This paper explores the concept of delegated verification and the application of proof beyond a reasonable doubt to identity assurance. Using the framework of NIST Special Publication 800-63A as a reference, it examines an alternative method for achieving a high identity assurance level (IAL3) without requiring the prover to directly manage sensitive PII.

### **2. Foundations of Identity Assurance**

Identity assurance refers to the confidence level in the claimed identity of an individual. NIST Special Publication 800-63A categorizes identity assurance levels (IAL) to define the strength of identity verification processes. IAL3 represents the highest level of assurance, requiring strong evidence for identity proofing and verification.

Traditional methods rely on direct PII handling, including government-issued documents and biometric data. However, these approaches introduce risks related to data exposure, identity theft, and regulatory compliance. This paper proposes an alternative: delegated verification, where a third party performs identity proofing and attests to the validity of the individual's identity.

### **3. Delegated Verification as an Alternative Approach**

Delegated verification shifts identity proofing responsibilities to a trusted third party that verifies an individual's identity on behalf of a relying party. This method minimizes direct PII handling by the prover while maintaining high assurance levels.

#### **Example: Remote Proctored High-Stakes Certification Exam**

A concrete example of delegated verification in practice is the identity assurance model used in the remote proctored high-stakes certification exam[3] for **GIAC Cloud Security Automation (GCSA) certification** from the **SANS Institute** (ANAB accredited[2]). The verification process consists of multiple layers:

- **Pre-requisites:** The certification requires subject matter knowledge, completion of the SEC540 course, and payment of course and exam fees.
- **Proctored Identity Verification:** Before the exam, a **ProctorU** human proctor verifies the test taker’s identity using a **government-issued driver’s license and a secondary identity document**. A **photo is taken, and the testing environment is scanned** for compliance.
- **Secure Exam Process:** The proctor continuously **monitors and records** the exam taker’s activity to ensure integrity.
- **Certification & Badge Issuance:** If the candidate passes, GIAC notifies them via email about their **official certification**, which is **integrated with Credly**, a digital credentialing platform.
- **Badge as Proof of Identity Assurance:** The **Credly digital badge** can only be issued to an account holder who has undergone this entire process. The badge serves as **verified proof** of identity, as it is **impossible to obtain without passing the identity-verification checks** conducted during the exam process.

### **4. Proof Beyond a Reasonable Doubt in Identity Assurance**

### **Legal Principle: Beyond a Reasonable Doubt**

In criminal law, the standard of **beyond a reasonable doubt** is the highest burden of proof, requiring that the evidence presented leaves no **logical uncertainty** about the defendant’s guilt. This principle ensures that no one is convicted unless the facts demonstrate **with overwhelming certainty** that they committed the crime.

### **Application to Identity Fraud**

While typically applied in criminal trials, this principle can be adapted to identity fraud disputes where two entities claim ownership of the same identity. Instead of proving guilt, the burden shifts to proving the **rightful ownership of an identity** beyond a reasonable doubt. In such cases, the decision must be based on **indisputable evidence**—not mere appearances, similarities, or circumstantial claims. This ensures that identity theft or fraudulent claims do not succeed due to **gaps in verification** or subjective interpretations.

In the given example ("Remote Proctored High-Stakes Certification Exam"), the **Credly badge itself serves as proof beyond a reasonable doubt** of the account holder’s verified identity because:

- The **badge cannot be obtained without passing the certification** under a strict, monitored and verified process.
- Identity verification of the examinee is **performed by an independent, trusted third party (ProctorU)** as a **precondition for exam access**, involving two forms of ID and a new photo being taken.
- Badge issuance is **tied to the individual’s GIAC certification** through the institution's **direct, underlying integration with Credly**, which in turn is linked to their verified account information and billing.
- The **exam submission and scoring process** ensure that only the verified individual demonstrating high quality subject matter expertise can obtain the certification and corresponding badge.

While not expressly verifiable or transparent, additional protections further ensuring the integrity of this process are available in both GIAC's and Credly's systems through the use of **multifactor authentication (MFA)**, which can be enabled and configured by the account holder to add an extra layer of security against unauthorized access.

### **5. Applying Delegated Verification and Proof Standards to IAL3**

In pursuit of **NIST 800-63A’s IAL3 requirements** and other industry guidelines addressing security and privacy concerns, the following elements are minimally satisfied **without requiring the prover to directly handle or repeatedly submit their PII** beyond the initial verification:

- **Identity proofing through a trusted third party:** ProctorU ensures identity verification by reviewing government-issued documents and securing the test environment.
- **Strong authentication and monitoring:** The exam process involves real-time proctoring, activity recording, and behavioral monitoring.
- **Non-repudiation and tamper-resistant credentialing:** The GIAC certification and Credly badge are cryptographically secured and cannot be falsified.
- **Minimized Exposure of Sensitive Data:** The candidate does not need to share or store their ID beyond the verification step.
- **Trusted Third-Party Verification:** The proctor acts as an intermediary, ensuring compliance and reducing risks of identity theft.
- **Data Integrity & Auditability:** All verification steps are recorded, ensuring transparency and security.
- **Regulatory Compliance:** The process aligns with privacy laws such as **GDPR** and **U.S. federal guidelines**, as the candidate retains control over their PII.

### References

[1] GIAC Guide to Taking Exams with ProctorU, p.7, [https://assets.contentstack.io/v3/assets/blt36c2e63521272fdc/blt9f8212dd88213c4c/ProctorUTechTips.pdf#page=7](https://assets.contentstack.io/v3/assets/blt36c2e63521272fdc/blt9f8212dd88213c4c/ProctorUTechTips.pdf#page=7)

[2] ANAB accreditation of Global Information Assurance Certification (GIAC), [https://anabpd.ansi.org/Accreditation/credentialing/personnel-certification/AllDirectoryDetails?prgID=201&orgID=98&statusID=4](https://anabpd.ansi.org/Accreditation/credentialing/personnel-certification/AllDirectoryDetails?prgID=201\&orgID=98\&statusID=4)

[3] Protecting the Integrity of GIAC Certifications: The Real Consequences of Cheating, [https://www.giac.org/blog/protecting-the-integrity-of-giac-certifications-the-real-consequences-of-cheating/](https://www.giac.org/blog/protecting-the-integrity-of-giac-certifications-the-real-consequences-of-cheating/)

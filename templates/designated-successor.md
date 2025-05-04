# Designated Successor (Power of Attorney) Protocol for Cryptographic Keys
by Matt Borja

## About this document

Derived from its usage in U.S. government, a "designated successor" is an alternate primary key (albeit, controlled by the same owner) that is secured away from the current primary key in use, to reduce the chance that previously verified identities will be lost or disassociated in a catastrophic event (e.g., theft, hardware failure, expiry, replacement).

The successor key(s) shall be established using the same procedures for production use, but kept in an undisclosed secure location, reserved only for future use.

In such an event whereby the primary key has been compromised or is being superseded, the signed attestation serves to appoint delegates as its effective replacement, or designated successor(s).

## Identity Equivalency and Authority (Template)

Beyond a general power of attorney, and in accordance with this adaptation of the "designated successor," the following template further restricts exercise of the instrument to the Principal itself ("controlled by the same owner").

The attestation must be cryptographically signed by the signing key of the Principal, along with a copy of the Agent's public key certified by the Principal using **signature level 3** (see `gpg --list-sigs`), in order for the instrument to be valid.

```
DESIGNATED SUCCESSOR (POWER OF ATTORNEY)
For: Cryptographic identities and key usages
---

Principal: <SIGNING KEYID>, <UID>
Agent: <DELEGATE KEYID>, <UID>
Scope: GPG, SSH

It is the intent of this instrument (clearsigned by aforementioned "Principal")
to unequivocally vest identity equivalency and authority and do hereby make,
constitute, and appoint aforementioned "Agent" to perform within the protocols
listed ("Scope") all related cryptographic operations on its behalf.

IN WITNESS WHEREOF, I have hereunto set my hand and cryptographic signature,
and have furnished my certification on a copy of the Agent's public key at
signature level 3, this <DAY> day of <MONTH> <YEAR>.
```

To sign the statement, use the command `gpg --clearsign -u <SIGNING KEYID>`, paste in the completed template, and hit **Ctl+D** to conclude message input.
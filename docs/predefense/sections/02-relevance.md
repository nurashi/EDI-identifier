# 2 Evidence of relevance

## Evidence available now

Official X12 documentation establishes the business role of shipment-status messages [P01]. Stedi's implementation-guide documentation describes partner-specific constraints and the distinction between static guides and machine-readable specifications [P02]. These establish context; they are not interviews or independent proof of demand for this particular toolkit.

The pilot corpus offers inspectable examples of the comparison problem. The examples below come from the existing normalized records, whose original PDF URLs, hashes and physical page numbers are preserved in `corpus/214-004010/guides/`.

| Observation | Document evidence | Implication for a proposed requirement |
|---|---|---|
| Usage differs even within the same transaction/version | AT7: C.H. Robinson pages 3 and 21 and KBX pages 6 and 18 mark it required; Domtar page 17 marks it optional | FR-04 must compare declared usage while retaining base-standard and partner labels |
| Explicit time-code lists differ | AT707: C.H. Robinson page 22 and KBX page 20 list LT; Domtar page 20 lists CT, ET, MT and PT | FR-05 must compare code sets with page evidence |
| A guide can contradict its own examples | Domtar page 9 uses LT in an example, but page 20's structured list excludes it | FR-07/08 retain evidence and review notes; the research codebook's G5 governs contradiction handling |
| Similar condition wording can reverse an implication | C.H. Robinson page 22: AT707 implies AT706; KBX page 18: AT706 implies AT707 | FR-06 must preserve direction, rather than equating similar words |
| Repetition is a separate property | LX loop repeat: C.H. Robinson pages 3 and 19 and KBX page 6 state 1 (KBX page 2 records its correction from 99999 to 1); Domtar page 8 states 999999, while Domtar's LX segment max-use on page 17 is 1 | FR-05 must keep max-use and loop-repeat distinct |

These observations concern the selected revisions and pilot scope. They motivate source-linked comparison and review, while operational frequency, impact and time savings require user evidence.

## Corpus sources

| Guide | Source PDF | Pages | Pilot requirements | Source SHA-256 prefix |
|---|---|---|---|---|
| C.H. Robinson | [Published guide](https://www.chrobinson.com/en-us/-/media/chrobinson/documents/carrier-specs-docs/carrier-specs-dec-2020/chr-truckload-tl-carrier-x12-214.pdf) | 32 | 45 | 0d28243812f1 |
| KBX Technology Solutions | [Published guide](https://kbx.com/wp-content/uploads/2025/09/KBXTECH214-1.pdf) | 30 | 43 | c5e6ed5f63fa |
| Domtar Industries | [Published guide](https://www.iconnect-corp.com/specifications/vendors/Domtar/214SPECS_toolkit.pdf) | 23 | 30 | 098b98e96d79 |

Full hashes, revision notes and evidence excerpts are retained in the guide JSON records.

## Findings versus assumptions

**Document findings:** the selected guides use different notations and state different constraints; some evidence needs interpretation. **User questions:** frequency of comparison, costly errors, useful interface actions and acceptable review effort.

The three-guide selection is purposive. Revision age and authoring conventions may affect observed guide divergence. The project studies the documents rather than inferring how partners behave in production.

## Required user or client evidence

The required 3-5 user discussions or substantive client agreement remain pending in GH-10. Corpus analysis is a separate source of relevance evidence and does not replace those records.

The protocol in `research/interview-guide.md` specifies recruitment criteria, neutral questions, consent, evidence recording and how findings will alter requirements. Each real finding must be linked to at least one requirement, design decision or explicit scope decision. Unconfirmed assumptions remain labelled until those records exist.

# 1 Project proposal

## Project identity and team

**Title:** Development of a Toolkit for Automated Comparison of ANSI X12 EDI Implementation Guides with an Investigation into Partner-Specific Implementation Divergence in Freight Logistics.

**Institution:** Astana IT University. **Group:** SE-2405. **Stage:** first pre-defense. **Deadline:** 24 October 2026, 18:00 UTC+05:00.

**Supervisor:** Айтмұханбетова Эльвира Айтмұханбетқызы. **Position:** ____________________

| Team member | Diploma responsibility |
|---|---|
| Nurassyl Orazbek (nurashi) | Backend, comparison rules and evaluation |
| Asylan Usen (Asylann) | Review interface, corpus work, evaluation and pre-defense documentation |
| Anuar Zhenissov (azhenissov) | PDF extraction and normalization development |

Component ownership guides implementation and technical review. The repository records the work already delivered: Nurassyl developed the schemas, reference corpus, comparison CLI and initial PDF extractor; Asylan prepared the report, diagrams, review prototype and integration checks. Further contributions and reviews are recorded under each student's account.

## Problem and users

X12 214 conveys freight shipment status [P01]. Partners publish implementation guides that specify required fields, allowed codes, repetition limits and conditional rules [P02]. Comparing two PDFs requires an engineer to find corresponding requirements before interpreting their differences. Repeated segments, qualifiers and inconsistent notation make text-only comparison insufficient.

The intended users are EDI integration engineers and logistics IT analysts. They need a comparison that identifies the affected requirement, shows both constraints and provides the source pages needed to verify a finding. Their workflow priorities will be validated through the discussions described in section 2.

## Aim and objectives

The aim is to build a reproducible, evidence-linked comparison toolkit and investigate the variation found in comparable freight implementation guides.

1. Represent guide identity, structural keys, constraints and PDF evidence in a common schema.
2. Maintain a reference corpus with documented scope and revision identity.
3. Extract candidate requirements from supported PDF layouts and flag unresolved notes.
4. Align requirements by structural key and, where appropriate, qualifier.
5. Compare usage, code lists, repetition and conditions, retaining uncertainty.
6. Support source inspection, separate review decisions and reusable exports.
7. Evaluate extraction, alignment and comparison against reviewed reference data.

## Scope and current results

The first scope is English-language truckload **X12 214 / 004010**. The manually normalized reference covers B10, header L11 and the status-loop segments defined in the three selected guides. Envelopes, the party loop, MAN and MS3 are outside this pilot reference.

The implementation includes two PDF-layout parsers, source-integrity checks, exact and qualifier-assisted alignment, four-category comparison, JSON output and a local review interface. The reference contains **118 requirements** from C.H. Robinson, KBX and Domtar. Comparison produces **188 findings** with source-page references. Section 9 reports the measured regression checks and their scope.

The next application stage adds shared persistence, comparison API routes, an integrated frontend and broader document coverage. Transaction sets 204 and 210 require their own data and evaluation cases.

## Research questions and expected outcomes

**RQ1:** Which constraint categories differ in the selected guides after structural alignment? **RQ2:** Which extraction, alignment and interpretation errors limit reliable comparison? **RQ3:** How accurately and efficiently can users review source-linked findings compared with manual PDF inspection?

The expected outcomes are a versioned toolkit, a source-linked corpus, documented comparison rules, reviewed evaluation data and an account of observed guide divergence. Independent reference annotation and user task measurements are planned.

The engineering complexity lies in preserving identity across repeated segments, resolving code-list references, separating segment limits from loop limits and handling conditional language. The research evaluates these decisions rather than treating textual similarity as requirement equivalence.

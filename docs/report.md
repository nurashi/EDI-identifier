# EDI-identifier: pre-defense 1 report

**Development of a Toolkit for Automated Comparison of ANSI X12 EDI Implementation Guides with an Investigation into Partner-Specific Implementation Divergence in Freight Logistics**

Astana IT University, School of Software Engineering, group SE-2405. Diploma project, team of three.
Supervisor: Elvira Aitmukhanbetova, senior lecturer.
Repository: https://github.com/nurashi/EDI-identifier, tag `pre-defense-1`.

## 1. Project proposal

### Problem

Freight companies exchange shipment data through ANSI X12 EDI. The standard defines each message, for example the 214 shipment status, as a set of segments and elements with usage designators, code lists and syntax rules. Every large shipper, carrier and 3PL then publishes its own implementation guide: a PDF that narrows, extends or overrides the standard for that partner. Two messages that are both valid X12 214 can therefore be rejected by one partner and accepted by another.

When a company connects a new trading partner, or a partner releases a new guide revision, an integration engineer reads the PDF and compares it by hand with the guides already supported. The PDFs differ in layout and wording, the same requirement can appear as a usage flag in one guide and only as a sentence in a note in another, and one segment can be defined several times at the same position for different qualifiers. Differences are easy to miss, and a missed difference surfaces later as a rejected message or a lost status update.

Existing validators check one message against one specification. They do not compare the specifications of different partners with each other, and they do not show where in the source document a requirement comes from.

### Target users

- Integration engineers and EDI analysts at shippers, carriers, 3PLs and TMS vendors who onboard trading partners.
- Developers of transportation management systems who maintain partner-specific EDI mappings.
- Researchers studying how a shared standard is implemented differently by its users.

### Aim

Build a toolkit that extracts the requirements of X12 implementation guides from their PDFs into one machine-readable model, aligns the requirements of different partners, and reports every divergence together with the page of each source document, and evaluate how accurately it does so.

### Objectives

1. Select comparable public guides and define a requirement model in which every value is linked to its page and excerpt.
2. Extract requirements from guide PDFs of different layouts into that model and flag what cannot be extracted reliably.
3. Align requirements across partners by segment, position, loop, element and qualifier, and classify divergences in usage, code lists, repetition and conditions.
4. Provide a REST API and a web viewer that shows two guides side by side with the source page of each divergence, and validate a test message against two partners' rules.
5. Build a reference set and measure the accuracy of extraction and comparison on guides not used during development.

### Expected outcomes

- A working toolkit: guide import, normalized requirement store, divergence report with page references, side-by-side viewer, validation of test messages.
- A public corpus of normalized guides for X12 214/004010 with verified page evidence.
- An evaluation of extraction and comparison accuracy (precision, recall, F1 per category) on held-out guides.

### Scope

| In scope | Out of scope |
|---|---|
| X12 214 (shipment status), release 004010, truckload; 204 and 210 as extensions | EDIFACT, XML and API-based exchange |
| Public PDF guides of shippers, carriers and 3PLs | Guides that are not available as text PDFs (scans need OCR) |
| Transaction-set content: segments, elements, usage, codes, repetition, conditions | Envelope segments (ISA, GS, GE, IEA) and transport protocols (AS2, SFTP) |
| Validation of a test message against two partners' requirements | Translation or mapping of production messages |

### Engineering complexity

The guides follow no common layout, and the same requirement is written as a table value in one guide and as prose in another. One segment can have several definitions at one position, split by qualifier codes, so matching by segment name is wrong. Code lists can be given as an explicit list, as "all standard codes" or by reference to another element. Every extracted and compared value has to stay traceable to its page so that an engineer can check it. The prototype already covers these cases on three guides (Sections 7–9).

## 2. Evidence of relevance

### What the evidence must show

The requirements in Section 6 rest on four assumptions. Each is listed with the evidence that supports it so far and its status.

| ID | Assumption | Evidence | Status |
|---|---|---|---|
| A1 | Guides for the same message differ materially between partners | Analysis of three public 214 guides (below) | Verified on three guides |
| A2 | Engineers compare guides by hand when onboarding a partner, and it takes significant time | Professional practice of one team member; user discussions | Being verified in discussions |
| A3 | Engineers need the source page to trust a reported difference | User discussions | Being verified in discussions |
| A4 | A report of differences would be used in onboarding and guide updates | User discussions | Being verified in discussions |

### Analysis of available data

The pilot corpus contains three public truckload 214/004010 guides: C.H. Robinson (32 pages), KBX (30 pages) and Domtar (23 pages). Their 118 requirements were normalized by hand and every value was checked against its page in CI. Comparing them with the prototype (`edi diff`) gives the following counts of aligned requirement pairs.

| Guide pair | Usage | Code list | Repetition | Only in one guide |
|---|---|---|---|---|
| C.H. Robinson ~ KBX | 14 of 34 | 8 of 10 | 1 of 7 | 11 + 9 |
| C.H. Robinson ~ Domtar | 5 of 7 | 7 of 7 | 2 of 6 | 18 + 3 |
| KBX ~ Domtar | 6 of 8 | 7 of 7 | 2 of 8 | 13 + 0 |

Each cell gives the pairs that differ out of the pairs where both guides state the property. Pairs where only one guide states it, and repetition of definitions split by qualifier, are left out of the counts and reported separately by the tool.

Examples: C.H. Robinson allows all 42 standard shipment status codes in AT701, KBX allows 16; C.H. Robinson and KBX allow only the time code `LT` in AT707, Domtar only `CT`, `ET`, `MT` and `PT`; C.H. Robinson allows the status loop once per message, KBX up to ten times. In each case a mapping built for one partner sends values the other rejects. The data supports A1 for these three partners; whether the same holds across the industry is checked on further guides in Section 9.

### Discussions with user representatives

Three to five integration engineers and EDI analysts outside the team are interviewed with five questions: how often they onboard partners or receive guide updates, how they compare guides today and how long it takes, which differences occur and which caused failures, whether the source page matters, and which form of tool they would use. Participants are anonymous; the record keeps role, company type and experience.

| ID | Date | Role | Company type | EDI experience | Findings | Linked requirements |
|---|---|---|---|---|---|---|

## 3. Literature review

## 4. Existing system comparison

## 5. Technology comparison

Each decision lists the options considered, the criteria taken from the requirements in Section 6, and the choice.

### 5.1 Reading text from PDF guides

| Criterion | poppler `pdftotext -layout` | pdfplumber | PyMuPDF | Learned layout models (Table Transformer, LayoutLMv3) |
|---|---|---|---|---|
| Keeps table columns of the guide | Yes, as aligned text | Yes, with character coordinates | Yes, with block coordinates | Detects tables and cells |
| Deterministic output for one PDF | Yes | Yes | Yes | Depends on model version |
| Same text layer as the evidence check (NFR1) | Yes | No | No | No |
| Dependencies | One system package | Python package | Python package with native library | Model weights, GPU preferred |
| Explains its own result | Yes | Yes | Yes | Partly |

Choice: `pdftotext -layout` for the prototype. The two guide layouts in the corpus are generated by EDI authoring tools and keep their columns in the text layer, and using the same text as the evidence check means every extracted excerpt can be verified against its page. pdfplumber is the planned fallback for layouts whose columns do not survive as text, because it exposes character coordinates without a learned model.

### 5.2 Backend platform

| Criterion | Go + Gin | Python + FastAPI | Java + Spring Boot |
|---|---|---|---|
| Deployment | Single static binary, small image | Interpreter and packages | JVM and packages |
| Performance of in-memory comparison | High | Moderate | High |
| Team experience | Strong (Go in production) | Strong | Moderate |
| Fit with the extractor | Separate process | Same language as the extractor | Separate process |

Choice: Go with Gin. The comparison engine and validator are CPU-bound code over in-memory requirement sets, the result ships as one binary, and the team member responsible for the backend uses Go daily. Python stays where its libraries matter, in extraction.

### 5.3 Requirement storage

| Criterion | PostgreSQL (relational + JSONB) | MongoDB | JSON files in Git |
|---|---|---|---|
| Versions of a guide and their history | Relational tables | Documents | Commits |
| Query across partners by key | SQL with indexes | Aggregation pipeline | Load everything |
| Integrity of guide, version and requirement links | Foreign keys | Application code | None |
| Fit for the prototype stage | Higher setup cost | Higher setup cost | Simplest, reviewable in PRs |

Choice: JSON files in Git for the corpus during development, because every change is reviewed and diffed; PostgreSQL for the toolkit, with guides and versions as tables and requirements in JSONB validated by the same schema.

### 5.4 Interaction between extractor and backend

| Criterion | HTTP with JSON | Subprocess call to a CLI | Message queue |
|---|---|---|---|
| Independent deployment of Python and Go parts | Yes | No | Yes |
| Long PDFs without blocking a request | Needs a timeout or a job | Blocks | Yes |
| Operational cost | Low | Lowest | A broker to run |
| Contract | `guide.schema.json` | Same | Same |

Choice: HTTP with JSON. The extractor already works as a CLI that writes schema-valid JSON; wrapping it in a small HTTP service keeps the Python and Go parts deployable separately. A guide of 30 pages is extracted in about 0.1 s, so a queue is not needed now.

### 5.5 Comparison method

| Criterion | Structural alignment by X12 key | Text similarity of requirement descriptions | Large language model comparison |
|---|---|---|---|
| Uses the structure the standard defines | Yes | No | Partly |
| Same result on every run | Yes | Yes | No |
| Each result traceable to both pages | Yes | Yes | Hard to guarantee |
| Handles prose-only requirements | No, flags them | Partly | Yes |

Choice: structural alignment by segment, position, loop, element and qualifier, with a rule per category. Prose that the rules cannot judge is flagged for review instead of guessed; a language model may later propose labels for such items, but only as suggestions checked against the source page.

### 5.6 Web viewer

| Criterion | React + TypeScript | Server-rendered Go templates | Vue |
|---|---|---|---|
| Side-by-side view with filters and a PDF page panel | Component libraries and PDF.js | Possible, more manual | Component libraries and PDF.js |
| Team experience | Yes | Yes | Limited |
| Typed contract with the API | TypeScript types from the schema | Go types | TypeScript |

Choice: React with TypeScript.

## 6. Requirements specification

Priorities use MoSCoW. Status: done, prototype (works on the pilot corpus), planned.

### Functional requirements

| ID | Requirement | Priority | Acceptance criterion | Status |
|---|---|---|---|---|
| FR1 | Extract a guide PDF of a supported layout into the requirement schema, with page and excerpt for every value | Must | On the pilot guides all structured fields equal the hand-normalized reference; every excerpt is found on its cited page | Prototype |
| FR2 | Flag text the extractor does not classify | Must | Every requirement with unclassified notes carries a review flag; the count is reported | Prototype |
| FR3 | Let a reviewer confirm or correct extracted requirements, saved as a new guide version | Should | A corrected value is stored with reviewer and time; the previous version stays readable | Planned |
| FR4 | Store guides with partner, transaction set, X12 version, revision, source URL and SHA-256 | Must | Importing the same PDF twice creates no new version; a new revision does | Planned (fields exist in the schema) |
| FR5 | Align the requirements of two guides by segment, position, loop, element and qualifier | Must | Definitions split by qualifier align with an undivided definition when their codes intersect; unit tests pass | Done |
| FR6 | Classify each aligned pair in usage, codes, repetition and conditions as same, different, stated by one side, or needs review | Must | The known cases of the pilot corpus give the expected verdicts in tests | Done |
| FR7 | Show both source pages and excerpts for every finding | Must | No finding without pages on both sides | Done |
| FR8 | List requirements defined in one guide only | Must | Matches the alignment result | Done |
| FR9 | Export the comparison report as JSON and CSV | Should | JSON validates against a report schema; CSV opens in a spreadsheet | JSON done |
| FR10 | Web viewer: two guides side by side, filters by category and verdict, source page panel | Must | A user opens the page of any finding in one action from the list | Planned |
| FR11 | Validate a test X12 214 message against the requirements of two partners | Should | Seeded violations in test messages are reported with the partner and rule | Planned |
| FR12 | REST API for import, comparison and validation | Must | Endpoints documented with OpenAPI; integration tests in CI | Planned |
| FR13 | Record reference labels for findings | Must | Labels stored per finding and reviewer; used by the evaluation | Planned |
| FR14 | Evaluate extraction and comparison against reference data | Must | Command reports recall, precision and field accuracy per guide | Extraction done |
| FR15 | Support transaction sets 204 and 210 | Could | One guide of each extracted and compared | Planned |

### Non-functional requirements

| ID | Requirement | Acceptance criterion | Status |
|---|---|---|---|
| NFR1 | Traceability: every stored or reported value cites a page and excerpt | Evidence check finds 100% of excerpts on their pages in CI | Met on the pilot corpus |
| NFR2 | Reproducibility: the same PDF gives the same output | CI downloads the PDFs, checks SHA-256 and reruns extraction and comparison on every change | Met |
| NFR3 | Performance | A 30-page guide is extracted in under 10 s and two guides compared in under 1 s on a CI runner | Met: about 0.1 s and 5 ms |
| NFR4 | Extraction accuracy on unseen guides | Field accuracy at least 0.90 on held-out guides of supported layouts | To be measured |
| NFR5 | Usability | An engineer finds a given divergence and its source page within three actions, checked with 3–5 users | To be measured |
| NFR6 | Confidentiality: guides uploaded by a company stay in its deployment | No external service is called during extraction or comparison; no secrets in the repository | Met by design |
| NFR7 | Deployability | `docker compose up` starts the stack | Backend and database |
| NFR8 | Maintainability | New layouts are added as separate parsers; every module has tests in CI | Met |

## 7. Architecture and diagrams

### Overview

The toolkit is a pipeline around one contract, `schema/guide.schema.json`. A guide is identified by partner, transaction set, X12 version and the SHA-256 of its PDF. Each requirement has a structural key (segment, position, loop path, element, qualifier codes), usage as printed and as normalized, maximum use and loop repeat, code set, conditions, and a list of evidence entries with page and excerpt.

1. The **extractor** (Python) reads the PDF text layer, recognises the layout, and writes requirements with evidence. Notes it cannot classify are flagged.
2. The **evidence checker** (Go) confirms that every excerpt occurs on its cited page.
3. The **comparison engine** (Go) aligns two guides and classifies divergences.
4. The **REST API** (Go, Gin) exposes import, comparison and validation and stores guides in PostgreSQL; PDFs are kept by hash.
5. The **web viewer** (React) shows the report next to the source pages.
6. The **message validator** (Go) checks a test message against two partners' requirements using the same engine.

The CLI `edi` uses the comparison engine and evidence checker directly; it is the current user interface and the test harness.

### System context

![System context](diagrams/context.svg)

### Use cases

![Use cases](diagrams/use-cases.svg)

### Components

![Components](diagrams/components.svg)

Diagram sources are in `docs/diagrams/*.dot` (Graphviz) and are exported to SVG.

### Alignment of use cases, requirements and components

| Use case | Requirements | Components | Data |
|---|---|---|---|
| UC1 Import a partner guide | FR1, FR2, FR4 | Extractor, evidence checker, REST API, stores | PDF, guide JSON |
| UC2 Review flagged requirements | FR3 | Web viewer, REST API, requirement store | Guide versions |
| UC3 Compare two guides | FR5, FR6, FR8 | Comparison engine, REST API, CLI | Two guide versions, report |
| UC4 Inspect a divergence at its source page | FR7, FR10 | Web viewer, PDF store | Finding with pages |
| UC5 Export the report | FR9 | REST API, CLI | Report JSON / CSV |
| UC6 Validate a test message | FR11 | Message validator, comparison engine | X12 file, two guides |
| UC7 Label reference findings | FR13 | Web viewer, requirement store | Labels |
| UC8 Evaluate accuracy | FR14 | Extractor evaluation, comparison engine | Reference guides and labels |

## 8. Prototype

The toolkit has no web interface yet; the prototype is the command line, its input and output data, and the planned viewer layout.

### Extract a guide from its PDF

```
$ python3 -m extractor extract pdfs/kbx-214.pdf --meta corpus/214-004010/guides/kbx-214.json -o kbx.json
$ python3 -m extractor evaluate kbx.json corpus/214-004010/guides/kbx-214.json
kbx-214: 43 of 43 reference requirements found, 43 extracted in the same segments
  recall 1.000, precision 1.000
  usage         43/43  1.000
  base          43/43  1.000
  max_use       43/43  1.000
  loop_repeat   43/43  1.000
  codes         43/43  1.000
  syntax        43/43  1.000
  free-text conditions in the reference, not extracted: 54; extracted records flagged for review: 24
```

One extracted requirement (the excerpt is shortened here):

```json
{
  "key": { "segment": "AT7", "position": "140", "loop": ["0200", "0205"], "element": "AT701" },
  "usage": { "declared": "conditional", "declared_label": "X" },
  "codes": { "mode": "enumerated", "values": ["AF", "AG", "AR", "CD", "K1", "P1", "PR", "RA", "RD", "RL", "XB", "X1", "X3", "X4", "X6", "ZZ"] },
  "evidence": [{ "page": 18, "excerpt": "AT701 1650 Shipment Status Code X ID 2/2 / AF Carrier Departed Pick-up Location with Shipment / AG Estimated Delivery / …", "supports": ["usage", "codes"] }],
  "review": { "reason": "1 free-text note(s) not classified" }
}
```

### Compare guides

```
$ edi diff corpus/214-004010/guides/*.json
            guide pair    category  same  different  one side  review
     chr-214 ~ kbx-214       usage    20         14         0       0
     chr-214 ~ kbx-214       codes     2          8         1       0
     chr-214 ~ kbx-214  repetition     6          1         0       1
     chr-214 ~ kbx-214   condition     0          0         8      11
...
chr-214 ~ kbx-214
  different codes 0200/0205:AT7@140/AT701
    chr-214 p.21: all standard codes (42)
    kbx-214 p.3,5,18: AF, AG, AR, CD, K1, P1, PR, RA and 8 more (16 codes)
    kbx-214 lists 16 codes, chr-214 allows all standard codes
  different repetition 0200/0205:AT7@140
    chr-214 p.3,20,21,22: max use 1; loop repeat 1
    kbx-214 p.6,18: max use 1; loop repeat 10
    loop repeat 1 vs 10
```

`edi diff -json report.json` writes the same findings for the API and the viewer; `edi evidence -pdfs DIR` checks every excerpt of a guide file against its PDF.

### Planned viewer

The viewer has three panes: the list of findings with filters by guide pair, category and verdict; the two requirements side by side with the difference highlighted; and the PDF page of each side with the excerpt marked. Choosing a finding opens both pages (FR7, FR10, NFR5).

## 9. Verification and evaluation plan

### Testing

| Level | What | Where |
|---|---|---|
| Unit | Key normalisation, alignment rules, each divergence rule, both layout parsers, evaluation counts | Go and Python tests, CI jobs `backend` and `extractor` |
| Data | Every corpus file validates against the schema; every excerpt is found on its page in the downloaded PDF with the recorded SHA-256 | CI jobs `schema` and `pilot` |
| End to end | The three guides are extracted from their PDFs, validated, checked for evidence, evaluated against the reference and compared | CI job `pilot` on every change |
| API and viewer | Endpoint integration tests; scripted viewer scenarios | Planned with FR10, FR12 |

### Metrics

| Aim | Metric | Target |
|---|---|---|
| Extraction finds the requirements | Recall and precision of requirement keys against the reference | Recall at least 0.95 on supported layouts |
| Extraction reads them correctly | Accuracy per field: usage, maximum use, loop repeat, codes, syntax rules | At least 0.90 per field (NFR4) |
| Comparison finds the real differences | Precision, recall and F1 of `different` findings per category against reference labels | Reported per category; F1 at least 0.85 for usage and codes |
| The report is usable | Task success and time to locate a given divergence and its page | 3–5 engineers; within three actions (NFR5) |
| Validation catches partner-specific errors | Share of seeded violations in test messages reported with the right partner | At least 0.9 |

### Conditions

- Development guides (C.H. Robinson, KBX, Domtar) are kept separate from held-out guides: at least three further public 214/004010 guides, normalized by hand before the parser is run on them.
- Every PDF is fixed by SHA-256; runs happen in CI on a clean runner.
- Reference labels for comparison come from two reviewers labelling independently; disagreements are resolved before the evaluation.

### Baselines

- **Text diff:** `diff` of the `pdftotext` output of two guides, the closest thing to what a generic document comparison offers. Measured: how many reference divergences it surfaces and how much unrelated change it reports.
- **Manual comparison:** time an engineer needs to list the divergences of two guides by hand, from the user discussions and the usability sessions.
- **Hand-normalized corpus:** the reference for extraction.

### Current results

On the three development guides the extractor finds 118 of 118 reference requirements, and every structured field (usage, base designator, maximum use, loop repeat, code set, syntax rules) equals the reference. 75 conditions written as free text in the guides are not classified and are flagged for review. These are development results: the parser was written against these guides, so they do not yet measure generalisation; that is what the held-out guides are for.

## 10. Project management and risks

### Repository and tracker

- Repository: https://github.com/nurashi/EDI-identifier. `main` is the reviewed baseline; work is done in branches and merged through pull requests reviewed by another team member; CI must pass.
- Tracker: GitHub issues with milestone "Approbation", grouped on the project board. Each task names the responsible student, expected outcome, acceptance criteria and deadline, and links the pull request and commits.

### Responsibilities

| Member | Responsibility (approved plan) |
|---|---|
| Nurassyl Orazbek | Requirement model, comparison engine, backend and REST API, evaluation |
| Asylan Usen | Guide selection, reference corpus and labelling, web viewer |
| Anuar Zhenissov | PDF extraction and normalization |

### Milestones

| Date | Milestone | Content |
|---|---|---|
| 24 Oct 2026 | Pre-defense 1 (`pre-defense-1`) | Analysis, design, plan; requirement model, pilot corpus, extraction and comparison prototypes |
| Pre-defense 2 | 50% of the work | REST API with storage, viewer for comparison and source pages, held-out corpus, first evaluation, all report chapters except results |
| Final pre-defense | Complete system | Validation of test messages, 204 and 210, full evaluation, final report |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Unseen guides use layouts the parsers do not recognise | High | High | Parsers per layout family; pdfplumber fallback; unrecognised layouts reported instead of guessed; hand normalization for the reference |
| Prose requirements dominate some guides | Medium | Medium | Flag for review; measure how much is prose; optional suggestions checked against the page |
| Too few comparable public guides | Medium | High | Search carrier and shipper portals early; include 204 and 210 if 214 is too narrow |
| Reference labels are inconsistent | Medium | Medium | Written labelling rules, two independent reviewers, disagreement resolution before evaluation |
| Uneven availability of team members | Medium | High | Tasks with owners and deadlines on the board; weekly review of the board; work reassigned when a deadline is missed |
| Partner guides change during the project | Low | Low | Each guide is fixed by SHA-256 and revision date |

### Dependencies

- Public availability of partner guides (source URLs are recorded with hashes).
- Poppler on the build machine; Go and Python toolchains in CI.
- Supervisor feedback on the proposal and requirements (Section 11).
- Participants for user discussions and usability sessions.

## 11. Supervisor feedback

| Date | Deliverable reviewed | Comment | Decision |
|---|---|---|---|

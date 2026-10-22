# 6 Requirements specification

P0 is mandatory for the stated stage; P1 is desirable; P2 is deferred. **P** denotes this pre-defense and **D** the later diploma implementation. A planned D requirement is not counted as delivered software.

## Functional requirements

| ID | Priority / stage | Requirement and measurable acceptance criterion | Verification and current state |
|---|---|---|---|
| FR-01 | P0-P | Identify inputs: every reference guide records partner, transaction, release, revision, source URL, SHA-256 and page count | Three guide files and schema checks; implemented |
| FR-02 | P0-P | Preserve evidence: all 118 reference requirements contain page/excerpt evidence; selected findings show both sources | Source audit and browser checks; implemented |
| FR-03 | P0-P | Align keys: support exact and qualifier rules; repeated definitions retain distinct keys; report unmatched requirements | Go alignment tests and 34/27/30 qualifier-pair counts; implemented |
| FR-04 | P0-P | Compare declared usage while retaining the original designator and label | Go comparison tests and source-linked findings; implemented |
| FR-05 | P0-P | Compare enumerated/reference/all-standard code sets and distinguish max use from loop repeat | Go comparison tests and cases in the corpus; implemented |
| FR-06 | P0-P | Preserve condition uncertainty: identical normalized condition text can match; differing free-text conditions require review | Go comparison tests and explicit review verdict; implemented |
| FR-07 | P0-P | Review findings: select all three pairs, filter category/verdict, search keys/text and inspect source pages | Browser checks, including AT707; implemented |
| FR-08 | P0-P | Save a separate same/different/unknown review and note; export all 188 findings without changing machine fields | Persistence and CSV round-trip checks; implemented |
| FR-09 | P0-D | Establish independent reference labels: two compatible study sheets, frozen codebook, per-category agreement and adjudication | Separate research repository; execution pending |
| FR-10 | P0-D | Record disagreement causes: extraction, alignment, wording, codebook or slip, with an adjudicated label | Codebook procedure; application to actual annotations pending |
| FR-11 | P0-P | Extract supported PDFs: output schema-valid records with evidence; reject mismatched source hash/page count; flag unclassified notes | Eight extractor tests and three-PDF regression; implemented for two layouts |
| FR-12 | P0-D | Persist shared work with guide revisions, identifiable reviewers and independent-coder access controls | Service, database and authorization tests; planned |
| FR-13 | P0-P | Trace each preparation task to its owner, priority, deadline, acceptance criteria and PR/deliverable | Task tracker and task-linked commits; available |
| FR-14 | P0-P | Provide all eleven documentation sections and a requirements-coverage matrix | Source/PDF checks; supplied, with user-validation and supervisor-review dependencies |
| FR-15 | P0-P | Export comparison JSON with guide IDs, keys, category, verdict, both values and pages; keep unmatched keys separate | CLI output and prototype rebuild; implemented |
| FR-16 | P2-D | Add transaction sets 204/210 only with versioned reference data and regression/evaluation cases | Extension gate; deferred |
| FR-17 | P0-D | Expose extraction and comparison through documented API routes with validated requests and explicit failures | API contract and integration tests; planned |

## Non-functional requirements

| ID | Priority / stage | Requirement and acceptance criterion | Verification |
|---|---|---|---|
| NFR-01 | P0-P | Reproducibility: the same ordered guides and CLI produce identical dataset content; rebuilding changes neither the reference nor saved study data | Byte-identical data rebuild |
| NFR-02 | P0-P | Source integrity: source hashes/page counts match; every cited excerpt fragment occurs on its page | Poppler evidence audit of reference and extracted records |
| NFR-03 | P0-P | Traceability: exported findings retain both guide IDs, both keys, category and page references | JSON/CSV checks |
| NFR-04 | P0-P | Usability: labelled controls, visible focus, literal text rendering, useful empty states and no horizontal page overflow at 390 px | Browser checks and visual inspection |
| NFR-05 | P0-P | Local review: opening the packaged prototype and saving decisions sends no guide/review content to an external server | Browser request log; PDF links open on user action |
| NFR-06 | P0-P | Maintainability: Go tests/vet, extractor tests, report tests and documented build commands pass; reference records remain versioned | Test runs and CI configuration |
| NFR-07 | P0-D | Input validation: malformed schema, duplicate keys and incompatible transaction/release combinations receive explicit errors before results are accepted | Existing key checks; comprehensive request validation planned |
| NFR-08 | P1-D | Performance measurement: record stage timings for at least ten repetitions on fixed inputs/hardware and report median/p95; agree a target after baseline measurement | Planned benchmark protocol |

## Requirements provenance

FR-01/02/03/11 and NFR-01/02 follow the source-data contract. FR-04/05/06 respond to the cases in section 2. FR-07/08 express the proposed analyst workflow and require user validation. FR-09/10 follow the existing research codebook. FR-13/14 cover school traceability and documentation requirements.

Each user finding or supervisor decision will identify the affected requirement, evidence and resulting change. Code regression results establish implementation behavior; research acceptance depends on the independent evaluation in section 9.

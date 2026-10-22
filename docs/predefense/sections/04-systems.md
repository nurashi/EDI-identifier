# 4 Existing system comparison

## Method

Four systems are compared against eight common criteria. Stedi and IBM address EDI integration, Acrobat compares documents, and Docling extracts structured document content. The matrix describes documented capabilities rather than measured product performance.

**D** means the source documents the stated capability. **NE** means it was not established from the reviewed material. A partial capability is described explicitly.

| Criterion | Stedi Guides [P02] | IBM Sterling Map Editor [P03] | Adobe Acrobat Compare [P04] | Docling [P05] |
|---|---|---|---|---|
| C1 Input | D: EDI guide definitions | D: EDI, XML, SQL and other mapping formats | D: two PDF versions | D: PDF and other document formats |
| C2 X12 structure | D: partner-specific EDI structure | D: EDI mapping support | NE: X12 requirement semantics | NE: X12 requirement schema |
| C3 Cross-document comparison | NE: arbitrary PDF-guide constraint comparison | NE: cross-guide constraint comparison | D: text/graphics differences; semantic constraints NE | NE: constraint comparison |
| C4 Source-location evidence | NE: links to original imported PDF pages | NE: original guide-page links | D: changes located in compared documents | D: item provenance and geometry; PDF-link export NE |
| C5 Human inspection | D: interactive guides and validation | D: graphical mapping client | D: side-by-side view, filters and statuses | D: structured representation; dedicated constraint-review UI NE |
| C6 Local execution | NE: complete local guide-management workflow | D: offline Windows mapping application | D: desktop comparison workflow | D: local execution |
| C7 Reusable outputs | D: machine-readable guide data | D: translation maps | D: comparison report | D: JSON/Markdown and structured document data |
| C8 Programmatic integration | D: guides used in transaction processing | D: maps included in business-process models | NE: automation API in the reviewed page | D: Python API and CLI |

## Design implications

EDI systems support structured partner constraints but the reviewed pages do not establish an arbitrary-PDF comparison workflow. Acrobat is a useful document-difference baseline; its changes still need interpretation as requirements. Docling offers extraction and provenance capabilities that could support an alternative parser.

The proposed toolkit focuses on structural identity, four constraint categories and reviewable source-linked findings. Its benefit over manual or generic document comparison must be measured with the protocol in section 9.

## Evidence limits

The Stedi, Adobe and Docling pages were read directly. Docling's document model explicitly describes provenance and item geometry; this supports the qualified C4 entry, without establishing a finished PDF-link review workflow.

IBM's indexed official 6.2.2 documentation describes Map Editor as an offline Windows application and its use in translation processes. Direct retrieval of that page returned HTTP 403, so the comparison retains this access limitation. No licensed IBM or Acrobat trial was performed.

Source URLs and verification notes are retained in the bibliography and source register.

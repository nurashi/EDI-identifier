# EDI-identifier

Toolkit for automated comparison of ANSI X12 EDI implementation guides, with an investigation into partner-specific implementation divergence in freight logistics.

Diploma project, Astana IT University, School of Software Engineering, group SE-2405.

## Problem

Shippers, carriers and 3PLs each publish their own implementation guide for the same X12 message. The guides narrow, extend or override the standard in different ways, so a message that one partner accepts can be rejected by another. Engineers compare these PDFs by hand when they onboard a partner or receive a new revision, and differences are easy to miss.

**Users:** integration engineers and EDI analysts who onboard trading partners; developers of transportation management systems.

**Expected outcomes:** extraction of partner requirements from PDF guides into one model with page evidence; a report of divergences between partners with the source page of each; a side-by-side viewer; validation of a test message against two partners; an evaluation of extraction and comparison accuracy on held-out guides.

## Team

| Member | Responsibility |
|---|---|
| Nurassyl Orazbek ([@nurashi](https://github.com/nurashi)) | Requirement model, comparison engine, backend and REST API, evaluation |
| Asylan Usen ([@Asylann](https://github.com/Asylann)) | Guide selection, reference corpus and labelling, web viewer |
| Anuar Zhenissov ([@azhenissov](https://github.com/azhenissov)) | PDF extraction and normalization |

Supervisor: Elvira Aitmukhanbetova, senior lecturer.

## Scope and status

First stage: X12 214 Transportation Carrier Shipment Status, release 004010, truckload. Transaction sets 204 and 210 are planned extensions.

| Component | Directory | Status |
|---|---|---|
| Requirement schema | `schema/` | Done |
| Pilot corpus: three guides, 118 requirements with page evidence | `corpus/214-004010/` | Done |
| PDF extraction, two guide layouts, with evaluation against the corpus | `extractor/` | Prototype: 118 of 118 requirements, all structured fields equal on the development guides |
| Alignment and divergence classification | `backend/internal/compare/` | Done for usage, codes, repetition; conditions flagged for review |
| Evidence check of every excerpt against its PDF page | `backend/internal/compare/` | Done |
| Command-line tool `edi` | `backend/cmd/edi/` | Done |
| REST API and PostgreSQL store | `backend/` | Skeleton |
| Web viewer | `prototype/` | Clickable prototype on real data (`prototype/viewer.html`); React viewer planned |
| Validation of test messages | | Planned |

## Technologies

Go and Gin for the backend and comparison engine, Python with poppler `pdftotext` for extraction, PostgreSQL for storage, React and TypeScript for the viewer, JSON Schema as the contract between components, GitHub Actions for CI, Docker for deployment. The choices are compared with alternatives in the [report](docs/report.md#5-technology-comparison).

## Documentation and tracker

- [Pre-defense report](docs/report.md): proposal, relevance, literature, existing systems, technologies, requirements, architecture, prototype, evaluation plan, management and risks, supervisor feedback.
- [Pre-defense report as PDF](docs/SE-2405_Orazbek_ProbPeriod1.pdf): the consolidated report submitted for the approbation period, built from `docs/report.md` at tag `prob-period-1`.
- [Architecture diagrams](docs/diagrams): Graphviz sources and SVG exports.
- [Requirement schema](docs/schema.md) and [pilot corpus](corpus/214-004010/README.md).
- Tracker: [YouTrack project DIP](https://edi-ide.youtrack.cloud/projects/DIP) and its [Kanban board](https://edi-ide.youtrack.cloud/agiles/204-1/current).

## Repository layout

```
schema/              JSON schema of a normalized guide
corpus/214-004010/   hand-normalized guides with page evidence
extractor/           PDF to schema, layout parsers, evaluation, tests
backend/             Go: comparison engine, CLI edi, API skeleton, tests
docs/                report, schema description, diagrams
.github/workflows/   CI
```

## Run and test

Requirements: Go (version in `backend/go.mod`), Python 3.12, poppler (`pdftotext`). The guide PDFs are not stored here; download them from the URLs in `corpus/214-004010/guides/*.json` into `pdfs/<guide id>.pdf`.

```sh
go -C backend test ./...
python3 -m unittest extractor.test_extractor

go -C backend build -o ../edi ./cmd/edi
guides="corpus/214-004010/guides/chr-214.json corpus/214-004010/guides/kbx-214.json corpus/214-004010/guides/domtar-214.json"
./edi evidence -pdfs pdfs $guides
./edi diff $guides

python3 -m extractor extract pdfs/kbx-214.pdf --meta corpus/214-004010/guides/kbx-214.json -o kbx.json
python3 -m extractor evaluate kbx.json corpus/214-004010/guides/kbx-214.json

docker compose up --build
curl localhost:8080/healthz
```

CI runs all of this on every pull request, including the download of the PDFs and the check of their SHA-256.

## Workflow

- Every work item is a YouTrack task (`DIP-n`) with the responsible student, expected outcome, acceptance criteria, deadline, priority and target pre-defense.
- Work is done in a branch named after the task (`DIP-14-viewer-mockup`); commit titles end with the task ID, for example `feat(report): add viewer mockup (DIP-14)`.
- Changes reach `main` through a pull request that lists its tasks, says how it was checked and is reviewed by another team member; CI must pass. A task is closed only when its acceptance criteria are met.
- Each pre-defense submission is tagged: `pre-defense-1`, `pre-defense-2`, `final-pre-defense`.

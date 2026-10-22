# EDI-identifier

Toolkit for automated comparison of ANSI X12 EDI implementation guides and investigation of partner-specific implementation divergence in freight logistics.

Diploma project, Astana IT University, SE-2405. Supervisor: **Айтмұханбетова Эльвира Айтмұханбетқызы**. Supervisor position: ____________________

## Problem and scope

EDI engineers compare partner-specific usage rules, code lists, repetition limits and conditions. A useful comparison must identify the same loop, segment, element and qualifier in both guides and retain page evidence for each finding.

The initial scope is English-language truckload **X12 214 / 004010**. The reference corpus contains three guides and 118 manually normalized requirements. Target users are EDI integration engineers and logistics IT analysts. Expected outcomes are a reproducible comparison workflow, evidence-linked results and an evaluation against reviewed reference data.

## Team and responsibilities

| Member | Diploma responsibility |
|---|---|
| Nurassyl Orazbek (`nurashi`) | Backend, comparison and evaluation |
| Asylan Usen (`Asylann`) | Review interface, corpus and evaluation |
| Anuar Zhenissov (`azhenissov`) | PDF extraction and normalization |

## Component ownership

Ownership covers the target application and technical review. The status table below distinguishes the current toolkit from planned integration.

| Directory | Component | Stack and status | Owner |
|---|---|---|---|
| `extractor/` | Requirement extraction and normalization from PDF guides | Python and Poppler currently; PyMuPDF, pdfplumber and Pydantic are alternatives to evaluate | Anuar Zhenissov (`azhenissov`) |
| `backend/` | Requirement store, comparison, X12 message validation and REST API | Go, Gin, PostgreSQL; comparison CLI and health endpoint implemented, storage/API/validation integration planned | Nurassyl Orazbek (`nurashi`) |
| `frontend/` (planned) | Side-by-side divergence viewer and annotation UI | TypeScript, React; local HTML/JavaScript prototype available | Asylan Usen (`Asylann`) |
| `corpus/` | Guide selection, reference corpus and annotations | Git, Python | Asylan Usen (`Asylann`) |
| `evaluation/` (planned) | Precision, recall, F1 and inter-annotator agreement | Python; pandas/scikit-learn under evaluation; current regression evaluator and separate research repository available | Nurassyl Orazbek and Asylan Usen |

## Pilot corpus

Three X12 214/004010 truckload guides are normalized into [`schema/guide.schema.json`](schema/guide.schema.json) ([schema description](docs/schema.md)). Scope and reproduction steps are in the [corpus documentation](corpus/214-004010/README.md). `extractor` reads a guide PDF into the same schema; its output can be evaluated against the manually normalized corpus. `backend/cmd/edi` checks source evidence, aligns requirements and reports divergences with page references.

The annotation study and its codebook are maintained in [EDI-identifier-rmt](https://github.com/nurashi/EDI-identifier-rmt).

Contributions and reviews are recorded in the repository's commits and pull requests.

## Components and status

| Component | Technology | Status |
|---|---|---|
| API | Go, Gin | Health endpoint; comparison API integration planned |
| Comparison CLI | Go | Evidence checks, alignment and four-category divergence reports |
| Reference corpus | Versioned JSON and schemas | Three normalized partner guides |
| PDF extraction | Python, Poppler | Two supported PDF layouts; extraction evaluation against the reference corpus |
| Review prototype | HTML, CSS, JavaScript | CLI findings, source evidence, local review and CSV export |
| Shared persistence | PostgreSQL | Planned |
| Application frontend | TypeScript, React | Planned |

The [consolidated pre-defense report](docs/predefense/output/report.pdf) contains analysis, requirements, architecture, a local prototype and an evaluation plan. User validation and supervisor review are tracked in [GH-10](https://github.com/nurashi/EDI-identifier/issues/10).

## Documentation and task tracking

- [Pre-defense documentation](docs/predefense/README.md) and [requirements coverage](docs/predefense/REQUIREMENTS-MATRIX.md).
- [Report sections](docs/predefense/sections/), [bibliography](docs/predefense/BIBLIOGRAPHY.md) and [diagram sources and exports](docs/predefense/diagrams/).
- [Review prototype](docs/predefense/prototype/index.html), [demonstration](docs/predefense/DEMO.md) and [verification record](docs/predefense/evidence/verification.md).
- [Project board](https://github.com/users/Asylann/projects/1) and [task index](docs/predefense/tracker/README.md).
- [Preparation PR #26](https://github.com/nurashi/EDI-identifier/pull/26).

The board uses GitHub Projects as the permitted tracker equivalent. Reviewer access must be configured before submission. The first pre-defense deadline is **24 October 2026, 18:00 UTC+05:00**.

## Run and test

Use Go **1.27.1**, as pinned by `backend/go.mod`, Python 3.10+ and Poppler's `pdftotext` on `PATH`. Docker is optional for the API and PostgreSQL service:

```sh
docker compose up --build
curl localhost:8080/healthz
```

Run the available Go checks from the repository root:

```sh
go -C backend test ./...
go -C backend vet ./...
python -m unittest extractor.test_extractor -v
```

The [demonstration](docs/predefense/DEMO.md) covers PDF extraction, evidence checks, comparison and prototype-data generation. Open `docs/predefense/prototype/index.html` in a browser to review the generated findings. Review decisions are stored on that device and can be exported as CSV.

## Development workflow

Use task-linked branches, descriptive commits and pull requests. Another team member reviews significant changes before merge, and CI must pass. Submission tags identify the exact submitted commit; tags are kept immutable.

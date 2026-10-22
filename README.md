# EDI-identifier

Toolkit for automated comparison of ANSI X12 EDI implementation guides, with an investigation into partner-specific implementation divergence in freight logistics.

Diploma project, Astana IT University, group SE-2405.

The first stage covers X12 214 Transportation Carrier Shipment Status Message, release 004010. Transaction sets 204 and 210 are planned extensions.

## Components

| Directory | Component | Stack | Owner |
|---|---|---|---|
| `extractor/` | Requirement extraction and normalization from PDF guides | Python, poppler `pdftotext` | Anuar Zhenissov |
| `backend/` | Requirement store, comparison engine, X12 message validation, REST API | Go, Gin, PostgreSQL | Nurassyl Orazbek |
| `frontend/` | Side-by-side divergence viewer and annotation UI | TypeScript, React | Asylan Usen |
| `corpus/` | Guide selection, reference corpus and annotations | Git, Python | Asylan Usen |
| `evaluation/` | Precision, recall, F1 and inter-annotator agreement | Python, pandas, scikit-learn | Nurassyl Orazbek, Asylan Usen |

## Pilot corpus

Three X12 214/004010 truckload guides normalized into [`schema/guide.schema.json`](schema/guide.schema.json) ([description](docs/schema.md)); scope and reproduction steps are in [`corpus/214-004010`](corpus/214-004010/README.md). `extractor` reads a guide PDF into the same schema, and its output is evaluated against the hand-normalized corpus. `backend/cmd/edi` checks every record against the source PDF, aligns requirements across guides and reports the divergences of every aligned pair with page references.

## Running locally

```sh
docker compose up --build
curl localhost:8080/healthz
```

## Workflow

- One branch per task: `<area>/<short-description>`, for example `backend/requirement-schema`.
- Changes reach `main` only through a pull request reviewed by another team member.
- CI must pass before merge.

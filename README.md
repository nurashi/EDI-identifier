# EDI-identifier

Toolkit for automated comparison of ANSI X12 EDI implementation guides, with an investigation into partner-specific implementation divergence in freight logistics.

Diploma project, Astana IT University, group SE-2405.

The first stage covers X12 214 Transportation Carrier Shipment Status Message, release 004010. Transaction sets 204 and 210 are planned extensions.

## Components

| Directory | Component | Stack | Owner |
|---|---|---|---|
| `extractor/` | Requirement extraction and normalization from PDF guides | Python, PyMuPDF, pdfplumber, Pydantic | Anuar Zhenissov |
| `backend/` | Requirement store, comparison engine, X12 message validation, REST API | Go, Gin, PostgreSQL | Nurassyl Orazbek |
| `frontend/` | Side-by-side divergence viewer and annotation UI | TypeScript, React | Asylan Usen |
| `corpus/` | Guide selection, reference corpus and annotations | Git, Python | Asylan Usen |
| `evaluation/` | Precision, recall, F1 and inter-annotator agreement | Python, pandas, scikit-learn | Nurassyl Orazbek, Asylan Usen |

## Pilot study

The first research step tests whether two people can classify requirement differences between guides consistently. The pilot corpus, its scope and the commands that reproduce it are in [`corpus/214-004010`](corpus/214-004010/README.md); the labelling rules are in [`docs/codebook.md`](docs/codebook.md). `backend/cmd/study` checks the corpus against the source PDFs, aligns requirements across guides, writes the annotation sheet and computes agreement between coders.

## Running locally

```sh
docker compose up --build
curl localhost:8080/healthz
```

## Workflow

- One branch per task: `<area>/<short-description>`, for example `backend/requirement-schema`.
- Changes reach `main` only through a pull request reviewed by another team member.
- CI must pass before merge.

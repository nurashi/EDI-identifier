# 5 Technology comparison and decisions

The choices below follow the requirements for source traceability, reproducibility and a maintainable implementation. Each decision compares three alternatives.

| Decision | Alternatives | Trade-off | Choice and implementation status |
|---|---|---|---|
| ADR-01 Backend platform | Go/Gin; Python/FastAPI; TypeScript/Node | Go reuses the tested comparison package; Python simplifies extractor integration; Node shares a language with the intended frontend | Retain Go/Gin. The edi CLI and health endpoint exist; comparison API routes are planned |
| ADR-02 Storage | Versioned JSON; PostgreSQL/JSONB; SQLite | Files are easy to review and reproduce. PostgreSQL supports transactions and indexed JSON [P08]. SQLite simplifies a local application | Use JSON for the reference and interchange. PostgreSQL is configured in Compose; application persistence remains to be implemented |
| ADR-03 PDF extraction | Poppler text plus layout rules; PyMuPDF/pdfplumber; Docling | Poppler's layout-preserving text supports simple rules [P09]. Coordinate and table APIs offer more control [P06,P07]. Docling provides a broader layout/table pipeline [P05] with additional dependencies | Python rules over Poppler are implemented for two layouts. Test coordinate/table alternatives when the current rules fail on new guides |
| ADR-04 Component interaction | JSON/CSV files; synchronous REST; asynchronous jobs | Files preserve inspectable inputs and outputs. REST fits interactive review. Jobs add progress and retries at the cost of more infrastructure | CLI and file interchange are implemented. REST integration follows; a queue requires a measured workload need |
| ADR-05 Interface | HTML/CSS/JavaScript; React/TypeScript; CLI and CSV only | A static interface makes the current findings easy to inspect. React supports a larger shared workspace. CLI/CSV has the least setup but weaker evidence navigation | The static prototype is implemented. React remains the planned application frontend |

## Data contracts

The guide JSON Schema defines identity, structural keys, constraints and evidence. The comparison output is the Go Report/Finding structure: each report identifies two guides, category findings and unmatched keys. A separate divergence JSON Schema is no longer part of the toolkit.

The prototype builder invokes the comparison CLI and combines its output with reference records. Its CSV retains the automated verdict, values, keys and page references; review labels and notes occupy separate fields. The research study maintains a separate sheet format and codebook.

## Alternatives to evaluate

Layout-aware and generative methods [S01,S02,S07] are candidates for broader extraction coverage. They need the same schema, page evidence and held-out-guide evaluation as deterministic rules. A more complex model is justified by a demonstrated failure pattern and improved measured results.

The current measurements concern the three development guides. Database throughput, frontend task time and performance on new layouts remain evaluation work.

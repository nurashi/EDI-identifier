# 3 Literature review

## Search and selection

The review connects document extraction, structural matching and evaluation. It uses eleven scientific publications and official technical sources. Eight conference publications are from 2022-2025; Sentence-BERT, schema-matching taxonomy and Cohen's kappa are retained as foundational methods. Author manuscripts, conference records and maintainer documentation provide the source evidence.

The source register records access and version limits. Recent rechecks used author manuscripts where conference pages were inaccessible. This is a focused engineering review rather than a systematic literature survey.

## Critical synthesis and design consequences

Document recognition and comparison answer different questions. The extraction literature motivates preserving layout, tables and page identity. It does not justify inferring a partner obligation from a correctly extracted phrase. The project therefore keeps normalized requirements and evidence between extraction and comparison, with a human correction path.

Matching similarly requires more than segment names. The schema-matching taxonomy supports separating structural candidate alignment from semantic judgment [S10]. The corpus's repeated L11 definitions make that separation concrete. Semantic retrieval is a reasonable future baseline [S09], but the reversed AT706/AT707 implication illustrates why similarity cannot be accepted as equivalence.

The evaluation papers motivate testing each stage and avoiding layout leakage. Independent annotation must establish a reviewed reference before comparison accuracy is scored. Page evidence and ambiguity notes remain part of that reference. Official guide documentation explains why a partner-specific constraint model is relevant [P02], while the X12 transaction description bounds the shipment-status business context [P01].

The reviewed work supports a staged design: recover document structure, normalize keys, compare constraints and review uncertain cases. The current Poppler rules provide a simple development baseline; richer document models are justified when a held-out guide exposes failures. X12 defines the shipment-status context [P01], while partner-guide documentation explains why implementation constraints vary [P02]. Domain feedback and independent reference labels are the next evidence needed for evaluating this design.

## Structured publication analysis

The transfer limitations and project decisions in the last two columns are our assessment, not claims that the publications tested freight guides. No cited benchmark score is a measurement of this project.

| Source | Task | Method | Data | Contribution or result | Transfer limitation | Project implication |
|---|---|---|---|---|---|---|
| S01 LayoutLMv3, 2022 | General document understanding | Joint text, layout and image pretraining | Forms, receipts and document benchmarks | Unified multimodal pretraining supports several document tasks | OCR/token preparation and task adaptation remain; freight constraints were not evaluated | Preserve geometry as an extraction option; measure domain accuracy separately |
| S02 Donut, 2022 | OCR-free document understanding | Image-to-sequence structured generation | Document images and task-specific structured targets | Demonstrates an alternative to an OCR-dependent pipeline | Generated output needs verification; no X12 requirement-equivalence evidence | Treat as an extractor candidate with schema/evidence validation |
| S03 DocLayNet, 2022 | Document layout analysis | Human layout annotation, repeated annotations and detector evaluation | 80,863 pages; 11 layout classes | Layout benchmark includes repeated annotation and tests cross-layout robustness | Layout labels do not encode partner constraints; avoid page leakage across splits | Preserve whole-guide splits and measure agreement independently |
| S04 DocILE, 2023 | Field and line-item extraction | Localization, extraction and layout-aware item association evaluation | 6.7k annotated business documents; 55 field classes | Separates localization/extraction from line-item association | Mostly short invoice-like documents, unlike long implementation guides | Score extraction and association separately; examine unseen layouts |
| S05 OmniDocBench, 2025 | PDF parsing evaluation | Task- and attribute-level benchmark evaluation | Diverse PDF pages and parsing annotations | Makes quality inspectable beyond one aggregate score | Parsing quality does not measure semantic divergence detection | Report errors by stage and property category |
| S06 M6Doc, 2023 | General document layout analysis | Layout annotations and detection evaluation | 9,080 pages; 74 annotation categories | Reported TransDLANet baseline reaches 64.5% mAP | Layout diversity is not evidence of X12-specific correctness | Record layout/scan limitations rather than assuming transfer |
| S07 TableFormer, 2022 | Recover table structure and cells | Transformer-based structure identification and cell detection | Table images, structures and cell annotations | Reported TEDS: 98.5% on simple and 95% on complex tables | A correct grid does not determine whether a row states an obligation | Keep parsing and requirement interpretation as separate stages |
| S08 PubTables-1M, 2022 | Table detection and structure recognition | Structure canonicalization and detection models | Large scientific-article table dataset | Addresses inconsistent ground truth and oversegmentation | Scientific tables differ from logistics-guide tables | Define canonical keys before evaluating alignment |
| S09 Sentence-BERT, 2019 | Efficient sentence similarity | Siamese sentence embeddings | Sentence-pair similarity evaluation | Provides a practical retrieval mechanism | Similarity is not logical equivalence; reversed implications can look similar | Retrieval baseline only, gated by structural identity and review |
| S10 Rahm and Bernstein, 2001 | Organize schema-matching methods | Taxonomy of matching approaches | Prior methods and schema-matching examples; not a freight corpus | Distinguishes element/structure and language/constraint approaches | Older survey, not modern PDF extraction or a freight benchmark | Separate alignment from comparison and expose matching rules |
| S11 Cohen, 1960 | Measure two-coder agreement | Chance-corrected agreement for nominal judgments | Nominal categorical judgments; methodological examples | Supplies the basis of kappa for two coders | Kappa depends on marginal labels and can be undefined | Also report raw agreement, matrices, counts and uncertainty |

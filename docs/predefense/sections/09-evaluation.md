# 9 Verification and evaluation plan

## Measured implementation checks

The development corpus contains three manually normalized guides with 118 pilot requirements. The extractor parses wider document sections; its evaluator restricts key precision/recall to the segment/position pairs present in the pilot reference.

| Guide | All extracted records | Pilot reference keys | Matched keys / extracted in pilot scope | Six-field regression |
|---|---|---|---|---|
| C.H. Robinson | 65 | 45 | 45 / 45 | 45/45 for each field |
| KBX | 78 | 43 | 43 / 43 | 43/43 for each field |
| Domtar | 55 | 30 | 30 / 30 | 30/30 for each field |

The six fields are declared usage, base usage, max use, loop repeat, codes and syntax notes. Thus key recall/precision in this restricted reference scope is 1.000 for these development inputs. The checks do not score the 75 non-syntax reference conditions, complete-document recall or performance on unseen guides. Extraction review flags remain for 28/24/6 records respectively.

All six reference/extracted guide files pass the guide schema. PDF hashes and page counts match. Poppler 26.09.0 locates all 414 reference and 768 extracted excerpt fragments on their cited pages.

Qualifier alignment produces 34/27/30 pairs and 72/54/62 category findings. Across the 188 findings, the CLI returns 42 same, 52 different, 78 one_side and 16 review verdicts. These are automatic outputs from manually normalized inputs, not independently validated prevalence or classification accuracy.

Go tests/vet, eight extractor tests, four report-renderer tests, dataset rebuild and browser/CSV checks pass. Detailed records are in [the verification record](../evidence/verification.md).

## Independent reference protocol

The [research repository](https://github.com/nurashi/EDI-identifier-rmt) maintains the [existing codebook](https://github.com/nurashi/EDI-identifier-rmt/blob/00a67556397732c47ffe704bd4254670bc5a6142/docs/codebook.md) and frozen study-sheet format. Two coders work independently against the cited PDF pages. Round 1 covers CHR-KBX units U001-U072; after both sheets are committed, disagreements are analysed and codebook revisions recorded. Round 2 uses the revised rules and is reported separately.

Disagreement causes are extraction, alignment, wording, codebook or slip. Adjudicated labels form the reference. Prototype exports use F-prefixed IDs and show automated verdicts, so they are unsuitable as independent blind-coding sheets.

Independent annotations, substantive user sessions and an adjudicated reference have not yet been supplied. Agreement, comparison F1 and time-saving results therefore remain planned.

## Metrics, baselines and measurement conditions

| Evaluation | Metric | Baseline / comparator | Conditions |
|---|---|---|---|
| Independent annotation | Raw agreement, label confusion matrix, per-category Cohen's kappa and exploratory bootstrap interval [S11] | Two independent coders; all units and both-stated subset reported separately | Frozen sheets/codebook; same IDs; label frequencies and undefined kappa reported |
| Extraction | Key precision/recall/F1, per-field accuracy, schema-valid fraction and evidence-page correctness | Current Poppler/layout rules versus a selected coordinate/table or learned parser | New complete guide/revision held out; reference labels reviewed before scoring [S03,S04] |
| Alignment | Precision/recall/F1 over adjudicated key pairs; unmatched and ambiguous-pair counts | Exact keys versus qualifier-assisted alignment | Fixed guide scope/order; many-to-one cases adjudicated |
| Constraint comparison | Per-category and macro F1, confusion matrix and coverage at each abstention level | Exact normalized-value equality; optional structurally gated embedding retrieval [S09] | Same adjudicated reference; one_side maps to unknown; review is an abstention reported separately |
| Evidence integrity | Hash/page matches and excerpt-fragment location rate | Original source PDFs and edi evidence | Frozen PDF bytes and recorded Poppler version; semantic interpretation checked separately |
| User task performance | Completion time, missed/false findings and corrections | Manual PDF comparison; optional licensed Acrobat comparison [P04] | Equal task scope, consent, separate practice, counterbalanced order and actual participant records |

Precision = TP/(TP+FP); recall = TP/(TP+FN); F1 = 2PR/(P+R). Kappa = (observed agreement - expected agreement)/(1 - expected agreement). Zero denominators and expected agreement equal to one are reported as undefined. Automation coverage and accuracy are reported together so abstention cannot inflate a quality claim.

For timing measurements, record the software version, CPU, memory, input pages/requirements and at least ten repeats; report median and p95 separately for extraction, comparison and export. A performance target follows the baseline measurement.

## Threats and decision rules

The current parsers were developed with the three evaluated guides. Their perfect pilot-field regression is therefore a development check. Hold out complete guides or revisions rather than random pages, preserve layout diversity and publish errors by stage/category [S05,S06]. Canonical structural keys reduce reference inconsistencies [S08].

Repeated requirements and guide pairs are dependent observations. Unit-level intervals are descriptive for the pilot; they do not establish population prevalence. Review actual errors before adding a model or extending transaction coverage. A new extraction method is accepted only if it improves held-out results while retaining the source-evidence contract.

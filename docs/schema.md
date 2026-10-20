# Requirement schema v0

The schema is the contract between the three parts of the toolkit: the extractor writes it, the backend stores and compares it, and the annotation workflow labels pairs of it.

- `schema/guide.schema.json`: one normalized implementation guide.
- `schema/divergence.schema.json`: one judgement about one aligned pair of requirements.
- `corpus/214-004010/guides/`: the pilot corpus, three 214/004010 guides normalized by hand. Every value cites a page of the source PDF.

## Guide

One JSON file per guide. `guide` holds the document identity: partner, partner role, transaction set, X12 version, transport modes, revision, and the source URL with the SHA-256 of the exact PDF that was read. The PDFs themselves are not stored in the repository.

`revision_date` is the latest dated entry of the guide's change log; without a change log, the date printed in the page header. `revision` keeps the version label or the other dates the document prints, because the three guides date themselves inconsistently.

`requirements` is a flat list. A requirement is one documented constraint at one key.

## Key

| Field | Meaning |
|---|---|
| `segment` | Segment ID, e.g. `AT7` |
| `position` | Position number as printed, e.g. `140` |
| `loop` | Loop path from the outermost loop, e.g. `["0200", "0205"]` |
| `element` | Present for element-level requirements, e.g. `AT707` |
| `qualifier` | Codes that tell apart several definitions of one segment at one position |

Segment name alone is not a key. C.H. Robinson defines `L11` four times at position 150, and each definition has its own usage and max use. The qualifier set (`QN`, `LK/LQ`, `LH/LL`, `VT`) separates them. A guide with one definition at a position has no `qualifier`.

## Usage

| Field | Meaning |
|---|---|
| `base` | Base-standard designator `M`/`O`/`X`, only when the guide prints it next to its own usage |
| `declared` | The guide's usage, normalized |
| `declared_label` | The label exactly as printed |

Normalized levels: `required`, `recommended`, `optional`, `not_recommended`, `not_used`, `conditional`, `unknown`.

| Guide label | `declared` |
|---|---|
| C.H. Robinson `Must use` / `Recommended` / `Not recommended` / `Not used` | `required` / `recommended` / `not_recommended` / `not_used` |
| C.H. Robinson `Used` | the level of `base`: `M` required, `O` optional, `X` conditional |
| KBX `Mandatory`, `M` / `Optional`, `O` / `X` | `required` / `optional` / `conditional` |
| KBX `Mandatory except ...` | `conditional` |
| Domtar `Mandatory` / `Optional` | `required` / `optional` |
| Domtar element tables, which print no designator | `unknown` |

Usage is per transaction set. A note about which statuses a carrier must report over the life of a shipment is a condition, not usage: Domtar marks `AT7` `Optional` and asks for at least five truckload statuses in a note, so the record keeps `Optional` and stores the note under `conditions`.

## Codes

| `mode` | Meaning |
|---|---|
| `enumerated` | Only `values` are allowed |
| `all_standard` | The guide states that every code of the base standard is allowed |
| `reference` | The list is defined by another element in `ref` |
| `unspecified` | A coded element for which the guide gives no list |

Domtar describes `AT704` only as "Same 70 codes as AT702", which is recorded as `reference`. A code printed twice is recorded once, with a `review` note.

## Conditions

`conditions` keeps rules as text with a kind: `syntax` (X12 syntax notes), `semantic`, `timing`, `context` (mode- or stage-dependent rules).

- A condition is attached to the segment or element in whose section it is printed. Syntax notes of a segment stay on the segment.
- A note in a general section, outside any segment, is attached to the element it names (KBX names `AT7_01` and `AT7_03` in its status code table). General notes that name no element are not recorded.
- Only statements with an obligation or a condition are recorded (`must`, `should`, `required`, `only`, `if`, `unless`, `not valid`). Descriptions such as "Carrier Pro Number" are not.
- Statements that apply only to other modes are not recorded.

## Evidence and review

Every requirement has at least one `evidence` entry: the 1-based physical PDF page, the excerpt, and the fields it supports. ` / ` separates fragments that are not adjacent on the page; every fragment must occur on the cited page once whitespace is collapsed. `study evidence` checks this against the PDF.

`review` marks a requirement a human must decide on, with the reason.

A requirement that a guide does not mention is not stored.

## Divergence

One record is one annotator's judgement on one aligned pair in one category:

- categories: `usage`, `codes`, `repetition`, `condition`;
- labels: `same`, `different`, `unknown`.

The rules for labels are in `docs/codebook.md`. Agreement between annotators is computed per category over records with the same pair and category.

## Cases the pilot corpus covers

| Case | Where |
|---|---|
| One requirement, three usage notations | `AT7`: C.H. Robinson `Req O` + `Must use`, KBX `Mandatory`, Domtar `Optional` |
| Requirement only in a note | Domtar `AT7`: at least five truckload statuses |
| Disjoint code lists | `AT707`: `LT` at C.H. Robinson and KBX, `CT/ET/MT/PT` at Domtar |
| Guide contradicts itself | Domtar sample messages use `AT707 = LT`, which its own code list excludes |
| Same rule in opposite directions | C.H. Robinson `C0706`: AT707 requires AT706; KBX: AT706 requires AT707 |
| Repetition | Loop 0200 repeats 1 / 1 / 999999 times, loop 0205 repeats 1 / 10 / 10 times |
| Code list by reference | Domtar and KBX `AT704` |
| Several definitions at one position | C.H. Robinson `L11` at 150 |
| Usage changed and reverted | KBX change summary for `L11` at 030, 3 and 4 May 2022 |
| Usage field and notes disagree | KBX `MS2` |
| Element tables without designators | Domtar |

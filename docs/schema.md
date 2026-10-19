# Requirement schema v0

The schema is the contract between the three parts of the toolkit: the extractor writes it, the backend stores and compares it, and the annotation workflow labels pairs of it.

- `schema/guide.schema.json`: one normalized implementation guide.
- `schema/divergence.schema.json`: one judgement about one aligned pair of requirements.
- `schema/examples/`: hand-built subsets of the three 214/004010 guides in the first-stage corpus. Every value cites a page of the source PDF.

## Guide

One JSON file per guide. `guide` holds the document identity: partner, partner role, transaction set, X12 version, transport modes, revision, and the source URL with the SHA-256 of the exact PDF that was read. The PDFs themselves are not stored in the repository.

`requirements` is a flat list. A requirement is one documented constraint at one key.

## Key

| Field | Meaning |
|---|---|
| `segment` | Segment ID, e.g. `AT7` |
| `position` | Position number as printed, e.g. `140` |
| `loop` | Loop path from the outermost loop, e.g. `["0200", "0205"]` |
| `element` | Present for element-level requirements, e.g. `AT707` |
| `qualifier` | Codes that tell apart several definitions of one segment at one position |

Segment name alone is not a key. C.H. Robinson defines `L11` four times at position 150, and each definition has its own usage and max use. The qualifier set (`QN`, `LK/LQ`, `LH/LL`, `VT`) separates them.

## Usage

| Field | Meaning |
|---|---|
| `base` | Base-standard designator `M`/`O`/`X`, only when the guide prints it |
| `declared` | What the guide's structured usage field says, normalized |
| `declared_label` | The label exactly as printed |
| `effective` | Set only when notes or prose change the declared usage |

Normalized levels: `required`, `recommended`, `optional`, `not_recommended`, `not_used`, `conditional`, `unknown`.

| Guide label | `declared` |
|---|---|
| C.H. Robinson `Must use` / `Used` / `Recommended` / `Not recommended` / `Not used` | `required` / `optional` / `recommended` / `not_recommended` / `not_used` |
| KBX `M` / `O` | `required` / `optional` |
| Domtar `Mandatory` / `Optional` | `required` / `optional` |

`declared` and `effective` are separate because one requirement can be written in different places. `AT7` must be sent in all three guides, but C.H. Robinson writes it as `Req O` plus `Usage Must use`, KBX as `Mandatory`, and Domtar as `Optional` with a note demanding at least five truckload statuses.

## Codes

| `mode` | Meaning |
|---|---|
| `enumerated` | Only `values` are allowed |
| `all_standard` | Every code of the base standard is allowed |
| `reference` | The list is defined by another element in `ref` |
| `unspecified` | The guide gives no list |

Domtar describes `AT704` only as "Same 70 codes as AT702", which is recorded as `reference`.

## Conditions, evidence, review

`conditions` keeps rules as text with a kind: `syntax` (X12 syntax notes), `semantic`, `timing`, `context` (mode- or stage-dependent rules).

Every requirement has at least one `evidence` entry: the 1-based physical PDF page, the excerpt, and the fields it supports.

`review` marks a requirement a human must decide on, with the reason.

A requirement that a guide does not mention is not stored. Comparison treats it as unknown unless the guide explicitly marks it `Not used`.

## Divergence

One record is one annotator's judgement on one aligned pair in one category:

- categories: `usage`, `codes`, `repetition`, `condition`, `extension`;
- labels: `same`, `different`, `unknown`.

Agreement between annotators is computed per category over records with the same pair and category.

## Cases the examples cover

| Case | Where |
|---|---|
| One requirement, three usage notations | `AT7` in all three guides |
| Disjoint code lists | `AT707`: `LT` only at C.H. Robinson and KBX, `CT/ET/MT/PT` at Domtar |
| Guide contradicts itself | Domtar sample messages use `AT707 = LT`, which its own code list excludes |
| Same rule in opposite directions | C.H. Robinson `C0706`: AT707 requires AT706; KBX note: AT706 requires AT707 |
| Repetition | Loop 0200 repeats 1 / 1 / 999999 times, loop 0205 repeats 1 / 10 / 10 times |
| Requirement only in prose | Domtar `AT7` |
| Code list by reference | Domtar `AT704` |
| Usage changed and reverted | KBX change summary for `L11` at 030, 3 and 4 May 2022 |

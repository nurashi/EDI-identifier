# Annotation codebook v1

Rules for labelling `corpus/214-004010/annotation/sheet.csv`. Each row is a unit: one aligned pair of requirements from two guides, judged in one category.

## Procedure

1. Code alone. Do not discuss units or open the other coder's sheet until both sheets are committed.
2. Copy `sheet.csv` to `<your-name>.csv`. Fill only `label` and `note`, and only for the units of the current round. `study agree` skips units that neither coder labelled, and rejects a unit labelled in one sheet only or a sheet whose other columns differ from the original.
3. Read the cited pages of both PDFs for every unit. The `left` and `right` columns summarize the records; the page is the source. If a summary misstates the page, label by the page and start the note with `extraction:`.
4. Round 1 (pilot) is C.H. Robinson ~ KBX, units U001–U072. After it the coders compare results, record the cause of every disagreement and revise this codebook. Round 2 covers the remaining units with the revised rules.

## Labels

| Label | Meaning |
|---|---|
| `same` | Both guides state the property, and the statements impose the same constraint |
| `different` | Both guides state the property, and the constraints differ |
| `unknown` | At least one guide does not state the property, or states it in a way the guide itself cannot resolve |

## General rules

- **G1.** Judge only what the two documents state. Do not use the base X12 standard, other partners' guides, or knowledge of how a partner behaves in practice.
- **G2.** Silence is not a difference. If one guide says nothing about the property, label `unknown`, even when the other guide states a constraint.
- **G3.** Truckload only. Ignore statements restricted to LTL, intermodal or other modes.
- **G4.** The same constraint in different words is `same`.
- **G5.** If a guide contradicts itself, label by its structured field (usage field, element table, code list) and start the note with `contradiction:`.
- **G6.** If the two keys do not describe the same requirement, label by the rules anyway and start the note with `alignment:`.
- **G7.** Start the note with `unsure:` whenever no rule decides the unit.

## Usage

- **U1.** Usage is judged per transaction set, that is, for one 214.
- **U2.** Read each side's level:
  - C.H. Robinson prints the base designator (`Req`) and its own usage. `Must use` is required, `Recommended` recommended, `Not recommended` and `Not used` as named. `Used` takes the level of the base designator: `M` required, `O` optional, `X` conditional.
  - KBX prints its own designators. `Mandatory` and `M` are required, `Optional` and `O` optional, `X` conditional, `Mandatory except ...` conditional.
  - Domtar prints usage for segments only. An element without a designator has no stated usage, so the unit is `unknown` (G2).
- **U3.** A note that exempts the segment or element in named situations makes it conditional. A note about which statuses must be reported over the life of a shipment does not change usage; it is compared under condition.
- **U4.** `same` if both levels are equal, `different` otherwise. Two conditional levels are `same` here; their conditions are compared under condition.

## Codes

- **C1.** Read each side's permitted set: an enumerated list, all standard codes ("All valid standard codes are used"), or a reference to another element of the same guide, which is resolved to that element's list. No list is `unknown` (G2).
- **C2.** `same` if the two sets are identical. `different` if any code is permitted by one side and not by the other. An enumerated list against all standard codes is `different` unless the list is as long as the stated standard total.
- **C3.** Compare code values only. Different descriptions of one code are ignored. Restrictions on single codes, such as "(optional)" or "Only for use in AT7_04", are compared under condition.
- **C4.** If a guide's examples use a code its list does not contain, label by the list (G5).

## Repetition

- **R1.** Applies to segment-level units. Compare max use and, for the first segment of a loop (`LX`, `AT7`), the loop repeat.
- **R2.** `same` if every stated number is equal, `different` if one differs, `unknown` if one side does not state it.
- **R3.** If the pair was aligned by qualifier, the two definitions cover different code sets (for example C.H. Robinson `L11` for `QN` only against KBX `L11` for `PO`, `QN` and `VN`). The broader definition states no limit for the single code, so label `unknown` and write `qualifier scope` in the note.

## Condition

- **K1.** Applies when at least one side states a syntax note, semantic note, timing rule or context rule at this key.
- **K2.** `same` if every condition on each side has an equivalent on the other side. `different` if any condition has no equivalent or the sides contradict each other. `unknown` if one side states no conditions (G2).
- **K3.** A rule and its reverse are not equivalent: "If AT707 is present, then AT706 is required" differs from "If AT706 is present then AT707 is required".
- **K4.** Different numbers in a timing rule (15 minutes, 1 hour) are a difference.

## After a round

```sh
study agree <coder-a>.csv <coder-b>.csv -disagreements disagreements.csv
```

`study agree` reports every category twice: over all units, and over the units in which both guides state the property. A unit where one side is silent is decided by G2 alone, so it shows whether the rule was followed, not whether the scheme separates constraints; the second figure is the one that answers the research question.

The coders meet, go through `disagreements.csv` together and fill two columns:

- `cause`: `extraction` (a record misstates the guide), `alignment` (the keys are not the same requirement), `wording` (the guide is ambiguous or contradicts itself), `codebook` (a rule is missing or unclear), or `slip` (a coder misread; the rule was clear);
- `agreed_label`: the label both accept, which becomes the reference label.

Every rule changed because of a `codebook` cause is recorded below with the units that prompted it.

## Changes

- v1: initial rules, before the pilot.

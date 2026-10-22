# 10 Project management and risks

## Component ownership

The [repository](https://github.com/nurashi/EDI-identifier) and [project board](https://github.com/users/Asylann/projects/1) hold task ownership, status and change references. GitHub Projects is the equivalent tracker permitted in the class submission instructions. Intended reviewers require access to the private board.

| Component | Responsible member | Work and review scope |
|---|---|---|
| PDF extraction (`extractor/`) | Anuar Zhenissov (@azhenissov) | Supported layouts, normalization, input validation and source evidence |
| Backend (`backend/`) | Nurassyl Orazbek (@nurashi) | Comparison rules, requirement storage, message validation and REST API |
| Frontend (`frontend/`, planned) | Asylan Usen (@Asylann) | React viewer and annotation workflow; current local prototype |
| Corpus (`corpus/`) | Asylan Usen (@Asylann) | Guide selection, versions, reference records and annotation preparation |
| Evaluation (`evaluation/`, planned) | Nurassyl Orazbek and Asylan Usen | Stage metrics, baselines, independent annotation and held-out evaluation |

Ownership identifies responsibility for development and acceptance. Commit history records actual authorship. Nurassyl supplied the initial schema, corpus, comparison and extraction foundation; Asylan prepared the report, diagrams, local review prototype and integration checks. Component-owner reviews remain open where no review has been recorded.

## First pre-defense tasks

| Task | Deliverable and acceptance | Owner / priority | Deadline and dependency |
|---|---|---|---|
| GH-2 | Assemble the reviewed package, both PDFs and submission references | Asylan / P0 | 24 Oct, 18:00; section reviews and GH-10 |
| GH-3 | Proposal, source-cited relevance and discussion protocol | Asylan / P0 | 24 Oct; real user records in GH-10 |
| GH-4 | Critical review of 20 sources; extraction-literature technical review | Anuar / P0 | 24 Oct; report draft prepared, owner review pending |
| GH-5 | Four systems/eight criteria and five technology decisions | Nurassyl, Anuar / P0 | 24 Oct; component-owner review pending |
| GH-6 | Measurable requirements and three editable architecture diagrams | Nurassyl / P0 | 24 Oct; technical review pending |
| GH-7 | CLI-backed prototype, evidence inspection and CSV review export | Asylan / P0 | 24 Oct; implementation checks recorded |
| GH-8 | Metrics, baselines and independent-evaluation protocol | Nurassyl, Asylan / P0 | 24 Oct; technical review pending |
| GH-9 | README, roles, milestones, risks and deliverable links | Asylan / P0 | 24 Oct; current tracker and component responsibilities |
| GH-10 | Real user/client evidence, supervisor decisions and team review | Asylan coordinates / P0 | Before submission; external participants and reviewers |
| GH-11 | Consolidated eleven-section report with bibliography and coverage | Asylan / P0 | Before submission; report sources and export checks |
| GH-13 | Readable layout, complete figures and PDF metadata | Asylan / P0 | Before submission; report and screenshot exports |

The report draft was prepared by Asylan. GH-4, GH-5, GH-6 and GH-8 were reopened for their component owners' technical review; prepared material does not establish another member's completed review. Each task links to the preparation PR and its deliverable.

## Implementation tasks and next stage

The repository also tracks the existing foundation tasks: GH-14 (schema and initial corpus), GH-15 (structural alignment), GH-18 (extraction prototype) and GH-20 (constraint comparison), completed by Nurassyl in PR #1. GH-16 remains assigned to Anuar for independent source checking of all 118 normalized records, due 23 October. Locating excerpts automatically does not complete that semantic review.

| Task | Planned deliverable | Owner | Stage / acceptance gate |
|---|---|---|---|
| GH-21 | Unseen-layout extraction and validated input contract | Anuar | After first pre-defense; dates agreed with supervisor |
| GH-22 | Requirement storage, comparison API and validation scope | Nurassyl | After first pre-defense; dates agreed with supervisor |
| GH-23 | React divergence viewer and annotation workflow | Asylan | After first pre-defense; dates agreed with supervisor |
| GH-24 | Versioned guide selection and held-out reference corpus | Asylan | After first pre-defense; dates agreed with supervisor |
| GH-25 | Independent annotation and held-out evaluation | Nurassyl, Asylan | After first pre-defense; dates agreed with supervisor |

These five P1 tasks describe subsequent implementation and evaluation. Their acceptance criteria remain unchecked. They are not required to be completed as production application features by 24 October.

## Milestones

| Milestone | Date / stage | Exit condition |
|---|---|---|
| M0 Foundation | 15-20 October | Repository/API skeleton, schema, manual corpus and initial tools in PR #1 |
| M1 Integrated prototype | 21-22 October | PDF extraction, comparison, local review and regression checks reproducible |
| M2 Pre-defense review | 22-23 October | Report/diagrams consistent; technical corrections, user evidence and supervisor responses recorded |
| M3 Submission | By 24 October, 18:00 UTC+05:00 | Both PDFs reviewed, access verified, team PR review and exact submission version identified |
| M4 Application integration | After first pre-defense | Comparison API, shared storage and frontend meet agreed acceptance tests |
| M5 Evaluation and extension | Following M4 | Independent reference, unseen-guide and user-task evaluation; scope extension decided from results |

Dates for M4/M5 depend on the supervisor's academic schedule.

## Risk register

| ID | Risk | Likelihood / impact | Mitigation and owner |
|---|---|---|---|
| K01 | User validation unavailable by the deadline | High / High | Schedule 3-5 relevant discussions or obtain a substantive client agreement; Asylan |
| K02 | Substantive supervisor review pending | High / High | Review the package against the decisions in section 11 and record responses; Asylan |
| K03 | Three development guides overstate generalization | High / High | Bound results and add unseen guides/revisions; research team |
| K04 | Source URL or PDF revision changes | Medium / High | Preserve metadata and verify hashes before accepting inputs; team |
| K05 | Extraction/alignment error mistaken for divergence | High / High | Separate stage metrics, source evidence and cause-coded error review; team |
| K06 | Committee cannot access a private resource | Medium / High | Verify repository/board access with the intended reviewer accounts; Asylan |
| K07 | Responsibility mistaken for completed contribution | Medium / High | Record actual work and peer review under individual accounts; all members |
| K08 | Application scope delays stage deliverables | Medium / High | Keep service integration separate from the required prototype; Asylan |
| K09 | Missing Go/Poppler/browser dependencies | Medium / Medium | Document versions and commands; preserve CI checks; team |
| K10 | Submitted files differ from the identified version | Medium / High | Review both exports and create the immutable stage tag at the submitted commit; Asylan |

## Review and release

Component-owner reviews are recorded in the preparation PR and linked tasks. User validation and substantive supervisor feedback remain separate acceptance dependencies. Review ownership does not transfer authorship of existing code or report material.

The submission uses an immutable pre-defense-1 tag after the team checks both PDFs and the exact submitted commit. The form is submitted once on behalf of the team.

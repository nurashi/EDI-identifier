# First pre-defense requirements matrix

Requirements source: the school's 'До 24 октября' document and class submission instructions. Deadline: 24 October 2026, 18:00 UTC+05:00.

Available means that the document or prototype is present. Review identifies a remaining consistency or acceptance check. Pending identifies missing evidence or a submission action.

| ID | Requirement | Project material | Evidence | Status | Remaining work |
|---|---|---|---|---|---|
| R01 | Proposal: title, team, supervisor, problem, users, aim, objectives, outcomes and scope | `sections/01-proposal.md`, README | Section 01: problem, users, objectives, scope and team | Review | Confirm final team details |
| R02 | 3-5 user discussions or substantive client agreement | `sections/02-relevance.md`, `research/interview-guide.md` | Discussion protocol prepared; no completed discussion records | Pending | Collect discussion or client records and link findings to requirements |
| R03 | Critical review: at least 12 meaningful sources and 8 scientific publications | `sections/03-literature.md`, `BIBLIOGRAPHY.md`, `sources.json` | 20 used sources, including 11 scientific publications | Available | Review relevance and claim-to-source links |
| R04 | 3-5 systems, 6-10 consistent comparison criteria and supporting evidence | `sections/04-systems.md` | Four systems compared against eight shared criteria | Available | Review comparison claims and documented limits |
| R05 | At least 3 technical decisions, 2-3 alternatives each | `sections/05-technologies.md` | Five decisions, three alternatives per decision | Available | Five decisions reflect the current stack; revisit after evaluation |
| R06 | Functional/non-functional requirements, priorities and acceptance criteria | `sections/06-requirements.md` | 17 functional and eight non-functional requirements with acceptance criteria | Review | Current behavior and planned requirements separated; review with supervisor |
| R07 | Context, use-case and draft component diagrams with editable sources | `sections/07-architecture.md`, `diagrams/` | Three diagrams: DOT, SVG and PNG; use cases also in PlantUML | Available | Review scope with supervisor |
| R08 | UX scenarios and reproducible interaction examples | `sections/08-prototype.md`, `prototype/`, `DEMO.md` | 188 CLI findings; desktop/mobile browser and CSV checks | Available | Review the demonstrated workflow with a prospective user |
| R09 | Verification plan, metrics, measurement conditions and baseline | `sections/09-evaluation.md`, `evidence/verification.md` | 198 extracted records; 118 reference keys; six-field regression; future study protocol | Review | Development regression recorded; independent and held-out evaluation pending |
| R10 | Repository, tracker, responsibilities, milestones, risks and dependencies | `sections/10-management.md`, `tracker/README.md` | 21 repository tasks across all three members; preparation board, milestones, roles and risks | Review | Confirm task links and reviewer access |
| R11 | Supervisor comments and response decisions | `sections/11-feedback.md`, GH-10 | Review questions prepared; substantive feedback pending | Pending | Record substantive comments and resulting changes |
| G01 | Repository access and identifiable individual contributors | README and repository access settings | Named contributors in Git; private-board access unconfirmed | Pending | Verify team, supervisor and committee access |
| G02 | Complete project README with setup, execution and testing instructions | Root README | Setup, extraction, comparison, prototype and test commands | Available | Setup, CLI/extraction commands and local checks verified |
| G03 | Clear source/docs/diagram/test/config structure and suitable ignore rules | Repository directories and `.gitignore` | Backend, extractor, schema, corpus, tests, docs and CI directories | Available | Complete publication and history review |
| G04 | Progressive contributions and review activity | Task-linked commits and pull requests | Task-linked changes; teammate review still required | Review | Confirm individual contribution and review records |
| G05 | Assigned tasks with outcomes, criteria, deadlines and change links | Live Issues and project board; `tracker/README.md` | 21 assigned Issues: preparation, foundation and next-stage component work | Review | Obtain component-owner reviews and verify change links |
| G06 | Task branches and peer-reviewed pull requests | PR #1 and PR #12 | PR #1 foundation and PR #12 preparation branch | Pending | Obtain team-member review of the published preparation PR |
| G07 | Immutable tag identifying the submitted version | `pre-defense-1` at the submitted commit | Submission tag has not been created | Pending | Tag the reviewed submission version |
| G08 | Demonstrate repository, task traceability, review and available implementation | `DEMO.md`, task tracker and version history | DEMO.md and recorded local verification | Review | Rehearse the current commands and selected changes |
| S01 | One team submission with project, supervisor, members, contribution and links | Team submission record | One team form remains to be completed and submitted | Pending | Complete and check the form fields |
| S02 | Separate PDF of board and task screenshots | Board and task screenshot PDF | Fresh board overview and individual task captures in a separate PDF | Available | Confirm reviewer access and review the snapshot before submission |
| S03 | One consolidated report PDF with all required sections | Consolidated report PDF; eleven sections, bibliography and matrix | One PDF: eleven sections, bibliography and coverage matrix | Available | Final version and submission review |

## Reference data

The implementation includes schema-branch commit `cf4d3d2e15e3c8464804f6f9255caf6795f174ad`: three manually normalized X12 214/004010 guides, 118 requirements, PDF extraction and four-category comparison. The prototype shows 188 findings generated by the current CLI. Independent annotation tooling is maintained in the separate research repository. Architecture, requirements and evaluation distinguish the implemented toolkit from planned service integration.

## Tracker interpretation

The DOCX names YouTrack. The class instructions permit an equivalent system. GitHub Projects and repository Issues provide owner, priority, deadline, acceptance criteria, status and change references. The private board still requires reviewer access verification.

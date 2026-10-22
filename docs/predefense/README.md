# First pre-defense documentation

Astana IT University, SE-2405. Deadline: 24 October 2026, 18:00 UTC+05:00.

## Contents

- [Requirements coverage](REQUIREMENTS-MATRIX.md).
- [Consolidated report PDF](output/report.pdf).
- [Eleven report sections](sections/), [bibliography](BIBLIOGRAPHY.md) and [source register](sources.json).
- [Architecture diagrams](diagrams/): editable DOT/PlantUML files and SVG/PNG exports.
- [Local review prototype](prototype/index.html) and [CLI demonstration](DEMO.md).
- [Interview protocol](research/interview-guide.md).
- [Verification record](evidence/verification.md) and [task index](tracker/README.md).

The report sources are the eleven Markdown sections, bibliography and requirements matrix. The final submission uses one consolidated report PDF and a separate PDF containing project-board and task screenshots. Board captures are kept outside the public repository because the project board is private.

## Build and verify

The data builder uses Go 1.27.1 and the Python standard library. The Markdown-to-HTML builder uses the Python standard library and `report.css`. PDF checks and metadata normalization require `pypdf`; screenshot-PDF assembly requires ReportLab and Pillow; page inspection requires `pypdfium2` and Pillow. Diagram rendering requires `@viz-js/viz` and `sharp`. Browser checks and PDF export use Playwright 1.62.1 and Chromium or Chrome.

Run from the repository root:

```sh
python docs/predefense/scripts/prepare_data.py
node docs/predefense/scripts/render_diagrams.cjs
python docs/predefense/scripts/audit_package.py
python -m unittest discover -s docs/predefense/scripts -p "test_*.py" -v
python docs/predefense/scripts/build_report.py
node docs/predefense/scripts/render_report.cjs
python docs/predefense/scripts/finalize_pdf.py docs/predefense/output/report.pdf --title "EDI Identifier - First pre-defense report"
```

The data builder invokes `edi diff` and preserves machine verdicts separately from review labels. Pass `--edi <executable>` to reuse a built CLI. The report builder writes the intermediate `report.html`; the browser exporter writes `output/report.pdf`. Before PDF export, set `EDI_SOURCE_REF` to the published source commit or submission ref. The exporter converts local document links to repository links. Set `EDI_CHROME` when using a browser executable outside the default location. Configure `NODE_PATH` if Node dependencies are installed outside this repository.

Use `node docs/predefense/scripts/render_report.cjs --check-only` to check report images, table widths and internal anchors without creating a PDF.

Browser regression checks use a separate browser context and temporary annotation data:

```sh
node docs/predefense/scripts/check_prototype.cjs
python docs/predefense/scripts/check_export.py --dir <temporary-export-directory>
```

Set `EDI_AUDIT_TMP` to select that temporary directory. For the separate tracker PDF, run `python docs/predefense/scripts/build_board_pdf.py --manifest <capture-manifest.json> --out <board-and-tasks.pdf>`. The local manifest lists each original screenshot, its page title, source URL and orientation.

Generated check logs and page renders are local working files. The authoritative corpus is not used to store test annotations.

## Review status

The CLI, PDF extractor and prototype are integrated with the current schema branch. All eleven sections and diagrams reflect the integrated implementation. The report and separate task-screenshot PDF have been checked locally. User validation, substantive supervisor feedback, teammate review, reviewer access and submission approval remain outstanding. The [requirements matrix](REQUIREMENTS-MATRIX.md) identifies outstanding evidence and submission items.

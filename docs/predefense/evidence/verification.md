# Verification record

Implementation base: schema-branch commit cf4d3d2e15e3c8464804f6f9255caf6795f174ad. Checks recorded on 22 October 2026 use the three corpus PDFs with matching SHA-256 hashes.

## PDF extraction and evidence

The extractor produced 65 CHR, 78 KBX and 55 Domtar records. Within the manually normalized pilot scope, all 45/43/30 keys were found. Usage, base usage, max use, loop repeat, codes and syntax matched for those records. All reference and extracted JSON files passed the guide schema.

Poppler 26.09.0 verified all 414 reference excerpt fragments and all 768 extracted excerpt fragments on their cited pages. All PDF hashes and page counts matched.

These checks cover the development guides and six evaluated fields. Precision is restricted to the reference segment/position scope. Free-text obligations and accuracy on unseen layouts require further evaluation.

## Comparison and review

Qualifier alignment produced 34/27/30 pairs. The CLI generated 188 findings: 42 same, 52 different, 78 one_side and 16 review. The prototype dataset is generated from that JSON report and rebuilds byte-for-byte. It contains no completed user reviews.

Browser checks passed for pair/category/result/search filters, source-page links, review persistence, unchanged automated verdicts, empty filters, storage failure and a 390-pixel layout. CSV validation preserved all 188 findings and immutable fields, including quoted multiline review notes.

## Recorded evidence

- [Corpus and comparison summary](corpus-audit.json).
- [Source-PDF integrity](source-pdf-audit.json).
- [Extraction, schema, evidence and rebuild checks](implementation-checks.json).
- [Browser checks](prototype-checks.json).
- [Commands and expected results](../DEMO.md).

Go tests and vet passed. Eight extractor tests and four report-renderer tests passed. Report HTML loaded all five figures with no table overflow or missing internal anchors. CI includes extraction, schema, PDF evidence, data rebuild and browser/export checks; the updated workflow will run when the branch is published.

These implementation checks are separate from independent annotation and the evaluation on new guides planned in section 9.

## Report exports

The consolidated report contains all eleven sections, 20 bibliography entries and the requirements-coverage matrix. Report pages were rendered for visual inspection. Diagrams retain editable sources, and the prototype figures show the generated CLI findings. PDF checks cover document identity, extracted text, internal destinations, external link schemes and local-file references.

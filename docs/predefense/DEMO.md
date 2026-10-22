# Reproducible implementation demonstration

Run from the repository root in Windows PowerShell with Go 1.27.1, Python 3.10+ and Poppler's pdftotext on PATH. Commands use the three manually normalized reference guides. Downloaded PDFs, extracted files and executable builds stay in a local working directory.

## Build, verify and compare

~~~powershell
$work = '.predefense-local/demo'
New-Item -ItemType Directory -Force -Path $work | Out-Null
$guides = @(
  'corpus/214-004010/guides/chr-214.json',
  'corpus/214-004010/guides/kbx-214.json',
  'corpus/214-004010/guides/domtar-214.json'
)

go -C backend test ./...
go -C backend vet ./...
python -m unittest discover -s extractor -t . -v
go -C backend build -o ../.predefense-local/demo/edi.exe ./cmd/edi

python docs/predefense/scripts/fetch_guides.py --out "$work/pdfs"
& "$work/edi.exe" evidence -pdfs "$work/pdfs" @guides
& "$work/edi.exe" align @guides
& "$work/edi.exe" diff -rule qualifier -json "$work/comparison.json" @guides
~~~

Expected qualifier-aligned pairs: CHR-KBX 34, CHR-Domtar 27, KBX-Domtar 30. Comparison produces 72, 54 and 62 findings respectively, 188 overall. Their automated verdicts are 42 same, 52 different, 78 one_side and 16 review. A one_side finding means that the compared property is unstated on one side; it is separate from a requirement with no aligned counterpart.

The evidence command verifies PDF hashes, page counts and every excerpt fragment on its cited page. A textual match establishes source location; interpreting the rule still requires review.

## Extract a PDF

~~~powershell
New-Item -ItemType Directory -Force -Path "$work/extracted" | Out-Null
foreach ($guide in $guides) {
  $id = (Get-Content -Raw $guide | ConvertFrom-Json).guide.id
  python -m extractor extract "$work/pdfs/$id.pdf" --meta $guide -o "$work/extracted/$id.json"
  python -m extractor evaluate "$work/extracted/$id.json" $guide
}
$extracted = Get-ChildItem "$work/extracted/*.json" | ForEach-Object FullName
& "$work/edi.exe" evidence -pdfs "$work/pdfs" @extracted
~~~

The supplied metadata must identify the exact PDF bytes and page count. The supported layouts produce 65 CHR, 78 KBX and 55 Domtar records across their full parsed sections. In the narrower reference scope, all 45/43/30 keys and the six evaluated fields match. The evaluator restricts precision to the reference segment/position scope and checks usage, base usage, max use, loop repeat, codes and syntax. It does not score all free-text obligations. These three development documents provide a regression check; evaluation on unseen guides remains necessary.

## Review findings

~~~powershell
python docs/predefense/scripts/prepare_data.py --edi "$work/edi.exe"
~~~

Open docs/predefense/prototype/index.html in a browser. The initial CHR-KBX pair has 72 findings. Filter the automated result to Needs review to see 12 findings. Then reset that filter, choose CHR-Domtar, select Codes and search AT707. The result compares CHR's LT with Domtar's CT/ET/MT/PT and links to the original pages.

Save a separate review decision and note. Export all reviews to CSV; every automated verdict, key and source-page reference is retained. The expandable unmatched-requirement list shows records with no counterpart under the qualifier rule.

## Browser and export checks

Install Playwright 1.62.1 and its Chromium browser, or set EDI_CHROME to an existing Chrome executable. Node must be able to resolve Playwright.

~~~powershell
$env:EDI_AUDIT_TMP = "$work/browser-export"
node docs/predefense/scripts/check_prototype.cjs
python docs/predefense/scripts/check_export.py --dir $env:EDI_AUDIT_TMP
~~~

The checks use a separate browser context, verify filtering, page links, independent review storage, storage failure, mobile width and multiline CSV export. They refresh the two prototype screenshots.

## Independent annotation study

The separate [research repository](https://github.com/nurashi/EDI-identifier-rmt) maintains its own [codebook](https://github.com/nurashi/EDI-identifier-rmt/blob/main/docs/codebook.md), sheets and agreement tooling. The toolkit export includes automated verdicts and F-prefixed finding IDs; it is not the independent-coder study sheet. A research round must follow the study's frozen inputs and protocol.

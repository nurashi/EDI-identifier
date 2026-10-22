# Pilot corpus: X12 214, release 004010

Three public truckload shipment-status guides, normalized by hand into `schema/guide.schema.json`.

| File | Partner | Revision | Pages | Requirements |
|---|---|---|---|---|
| `guides/chr-214.json` | C.H. Robinson | 1.7 Final, 2022-09-13 | 32 | 45 |
| `guides/kbx-214.json` | KBX Technology Solutions | change log to 2023-11-09 | 30 | 43 |
| `guides/domtar-214.json` | Domtar Industries | 2008-09-24 | 23 | 30 |

The PDFs are not stored here. Each guide file records the source URL and the SHA-256 of the copy that was read.

## Scope

- The header segment `B10` and the header reference `L11` at 030.
- Every segment of the status loops 0200 and 0205 that a guide defines: `LX`, `AT7`, `MS1`, `MS2`, `L11` at 150, `K1`, `AT8`, with their elements.
- Not in the pilot: the envelope (`ISA`, `GS`, `GE`, `IEA`), `ST` and `SE`, the party loop 0100, `MAN` and `MS3`.

## Reproduce

From the repository root, with Go and `pdftotext` (poppler) installed:

```sh
go -C backend build -o ../edi ./cmd/edi
guides="corpus/214-004010/guides/chr-214.json corpus/214-004010/guides/kbx-214.json corpus/214-004010/guides/domtar-214.json"

# Download the PDFs from the URLs in the guide files into pdfs/<guide id>.pdf, then:
./edi evidence -pdfs pdfs $guides
./edi align $guides
./edi diff $guides
```

`evidence` verifies the SHA-256 and the page count of every PDF, then checks that every excerpt fragment occurs on the page it cites. `align` pairs the requirements of every two guides by structural key and lists those found in one guide only. `diff` compares each aligned pair in four categories (usage, codes, repetition, conditions) and gives every finding with the pages of both PDFs; `-all` also lists matching pairs and `-json` writes the reports to a file. CI runs all three commands in the `pilot` job.


import argparse
import hashlib
import json
import sys
from pathlib import Path

from . import ecs, spec
from .evaluate import evaluate, report, summary
from .model import pdf_pages

PARSERS = [ecs, spec]


def extract(pdf, meta):
    if hashlib.sha256(Path(pdf).read_bytes()).hexdigest() != meta["source"]["sha256"]:
        raise ValueError("PDF SHA-256 does not match the supplied guide metadata")
    pages = pdf_pages(pdf)
    if len(pages) != meta["source"]["pages"]:
        raise ValueError("PDF page count does not match the supplied guide metadata")
    for parser in PARSERS:
        if parser.detect(pages):
            return {"guide": meta, "requirements": parser.parse(pages)}
    raise SystemExit(f"{pdf}: layout not recognised")


def main():
    ap = argparse.ArgumentParser(prog="python -m extractor")
    sub = ap.add_subparsers(dest="cmd", required=True)
    ex = sub.add_parser("extract", help="read a PDF guide into the requirement schema")
    ex.add_argument("pdf")
    ex.add_argument("--meta", required=True, help="JSON file whose 'guide' object identifies the document")
    ex.add_argument("-o", "--out", help="output file, default stdout")
    ev = sub.add_parser("evaluate", help="compare an extracted guide with a hand-normalized one")
    ev.add_argument("extracted")
    ev.add_argument("reference")
    ev.add_argument("--json", help="write the evaluation to a JSON file")
    args = ap.parse_args()

    if args.cmd == "extract":
        with open(args.meta) as f:
            meta = json.load(f)["guide"]
        try:
            data = json.dumps(extract(args.pdf, meta), indent=2, ensure_ascii=False) + "\n"
        except ValueError as error:
            ap.exit(1, f"extractor: {error}\n")
        if args.out:
            with open(args.out, "w") as f:
                f.write(data)
        else:
            sys.stdout.write(data)
        return

    with open(args.extracted) as f:
        extracted = json.load(f)
    with open(args.reference) as f:
        reference = json.load(f)
    e = evaluate(extracted, reference)
    sys.stdout.write(report(e))
    if args.json:
        with open(args.json, "w", encoding="utf-8") as f:
            f.write(json.dumps(summary(e), indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()

"""Verify source-PDF hashes and page counts against the guide metadata."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[3]


def audit(pdfs: Path) -> list[dict]:
    results = []
    for name in ("chr-214", "kbx-214", "domtar-214"):
        meta = json.loads(
            (ROOT / f"corpus/214-004010/guides/{name}.json").read_text(encoding="utf-8")
        )["guide"]
        file = pdfs / f"{name}.pdf"
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        pages = len(PdfReader(file).pages)
        if digest != meta["source"]["sha256"] or pages != meta["source"]["pages"]:
            raise ValueError(
                f"{name}: source hash or page count differs from the reference"
            )
        results.append(
            {
                "guide": name,
                "sha256": digest,
                "pages": pages,
                "expected_pages": meta["source"]["pages"],
                "hash_matches": True,
                "method": "SHA-256 and pypdf page-count verification",
            }
        )
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdfs", type=Path, required=True)
    results = audit(parser.parse_args().pdfs)
    output = ROOT / "docs/predefense/evidence/source-pdf-audit.json"
    output.write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()

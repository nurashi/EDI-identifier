"""Set document identity on an exported PDF and remove inherited metadata."""

from __future__ import annotations

import argparse
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject

TEAM = "Nurassyl Orazbek; Asylan Usen; Anuar Zhenissov"


def finalize(pdf: Path, title: str) -> None:
    writer = PdfWriter()
    writer.clone_document_from_reader(PdfReader(pdf))
    writer.metadata = None
    writer.root_object.pop(NameObject("/Metadata"), None)
    writer.add_metadata(
        {
            "/Title": title,
            "/Author": TEAM,
            "/Subject": "ANSI X12 implementation-guide comparison - first pre-defense",
            "/Creator": "EDI Identifier",
        }
    )
    temporary = pdf.with_suffix(".normalized.pdf")
    try:
        with temporary.open("wb") as stream:
            writer.write(stream)
        PdfReader(temporary)
        temporary.replace(pdf)
    finally:
        writer.close()
        if temporary.exists():
            temporary.unlink()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--title", required=True)
    args = parser.parse_args()
    finalize(args.pdf, args.title)
    print("PDF identity updated.")


if __name__ == "__main__":
    main()

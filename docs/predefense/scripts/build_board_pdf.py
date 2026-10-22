"""Assemble board and task screenshots from a local capture manifest."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

from finalize_pdf import finalize


def build(manifest_path: Path, output: Path) -> None:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
    pages = manifest["pages"]
    if not pages:
        raise ValueError("The capture manifest contains no pages")
    output.parent.mkdir(parents=True, exist_ok=True)
    document = canvas.Canvas(str(output))
    for number, entry in enumerate(pages, 1):
        size = landscape(A4) if entry["orientation"] == "landscape" else A4
        document.setPageSize(size)
        width, height = size
        margin = 8 * mm
        image_top = height - 27 * mm
        image_bottom = 12 * mm
        image_path = manifest_path.parent / entry["image"]
        with Image.open(image_path) as image:
            scale = min(
                (width - 2 * margin) / image.width,
                (image_top - image_bottom) / image.height,
            )
            drawn_width, drawn_height = image.width * scale, image.height * scale
            document.drawImage(
                ImageReader(image),
                (width - drawn_width) / 2,
                image_top - drawn_height,
                width=drawn_width,
                height=drawn_height,
            )
        document.setFont("Helvetica-Bold", 13)
        document.drawString(margin, height - 12 * mm, entry["title"])
        document.setFont("Helvetica", 8)
        document.setFillColorRGB(0.17, 0.3, 0.37)
        document.drawString(margin, height - 19 * mm, entry["url"])
        document.linkURL(
            entry["url"],
            (margin, height - 20 * mm, width - margin, height - 16 * mm),
            relative=0,
        )
        document.setFillColorRGB(0.38, 0.42, 0.45)
        document.setFont("Helvetica", 8)
        document.drawString(margin, 6 * mm, "EDI Identifier - Project tasks")
        document.drawRightString(width - margin, 6 * mm, f"{number} / {len(pages)}")
        document.showPage()
    document.save()
    finalize(output, "EDI Identifier - Project board and tasks")
    print(f"Created {output.name}: {len(pages)} pages")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    build(args.manifest, args.out)


if __name__ == "__main__":
    main()

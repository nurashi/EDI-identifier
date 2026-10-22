"""Render PDF pages and write page images, contact sheets and a text inventory."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image, ImageDraw, ImageOps
from pypdf import PdfReader


def thumbnail(image: Image.Image, page_number: int) -> Image.Image:
    thumb = ImageOps.contain(image, (300, 425))
    tile = Image.new("RGB", (330, 460), "#dce2e5")
    tile.paste(thumb, ((330 - thumb.width) // 2, 10))
    ImageDraw.Draw(tile).text((14, 442), f"Page {page_number}", fill="black")
    return tile


def render_pages(pdf: Path, output: Path) -> list[dict]:
    output.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(pdf)
    inventory = []
    thumbnails = []
    with pdfium.PdfDocument(pdf) as document:
        for index in range(len(document)):
            page_number = index + 1
            page = document[index]
            bitmap = page.render(scale=1.5)
            try:
                image = bitmap.to_pil().copy()
            finally:
                bitmap.close()
                page.close()
            image.save(output / f"page-{page_number:02}.png")
            inventory.append(
                {
                    "page": page_number,
                    "characters": len(reader.pages[index].extract_text() or ""),
                    "width": image.width,
                    "height": image.height,
                }
            )
            thumbnails.append(thumbnail(image, page_number))
    for offset in range(0, len(thumbnails), 9):
        batch = thumbnails[offset : offset + 9]
        canvas = Image.new("RGB", (990, 460 * ((len(batch) + 2) // 3)), "white")
        for index, tile in enumerate(batch):
            canvas.paste(tile, ((index % 3) * 330, (index // 3) * 460))
        canvas.save(output / f"contact-{offset // 9 + 1}.png")
    (output / "inventory.json").write_text(
        json.dumps(inventory, indent=2) + "\n", encoding="utf-8"
    )
    return inventory


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    inventory = render_pages(args.pdf, args.out)
    print(
        json.dumps(
            {
                "pages": len(inventory),
                "characters": sum(page["characters"] for page in inventory),
                "low_text_pages": [
                    page["page"] for page in inventory if page["characters"] <= 60
                ],
                "qa_directory": str(args.out),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

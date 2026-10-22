"""Validate report sources, bibliography references and local documentation links."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

DOCS = Path(__file__).resolve().parents[1]
ROOT = DOCS.parents[1]
REQUIRED = (
    "README.md",
    "REQUIREMENTS-MATRIX.md",
    "DEMO.md",
    "sources.json",
    "BIBLIOGRAPHY.md",
    "prototype/index.html",
    "evidence/verification.md",
    "research/interview-guide.md",
    "tracker/README.md",
)
PDF_SECTIONS = (
    "Project proposal",
    "Evidence of relevance",
    "Literature review",
    "Existing system comparison",
    "Technology comparison",
    "Requirements specification",
    "Architecture and diagrams",
    "UX and prototype",
    "Verification and evaluation plan",
    "Project management and risks",
    "Supervisor feedback",
    "Bibliography",
    "Requirements matrix",
)


def check_sources() -> dict:
    for name in REQUIRED:
        if not (DOCS / name).is_file():
            raise ValueError(f"Missing project material: {name}")

    sections = sorted((DOCS / "sections").glob("[0-9][0-9]-*.md"))
    if len(sections) != 11:
        raise ValueError(f"Expected 11 report sections, found {len(sections)}")

    for name in ("context", "use-cases", "components"):
        for extension in ("dot", "svg", "png"):
            if not (DOCS / "diagrams" / f"{name}.{extension}").is_file():
                raise ValueError(f"Missing diagram: {name}.{extension}")

    sources = json.loads((DOCS / "sources.json").read_text(encoding="utf-8-sig"))
    source_ids = {source["id"] for source in sources}
    scientific = [source for source in sources if source["type"] == "scientific"]
    if len(source_ids) != len(sources) or len(sources) < 12 or len(scientific) < 8:
        raise ValueError("The bibliography does not meet the source-count requirements")

    body = "\n".join(path.read_text(encoding="utf-8-sig") for path in sections)
    for source in sources:
        if not re.search(r"\b" + re.escape(source["id"]) + r"\b", body):
            raise ValueError(f"Unused source: {source['id']}")
        for section in source.get("used_in", []):
            if not (DOCS / "sections" / f"{section}.md").is_file():
                raise ValueError(f"Unknown source section: {section}")

    for source_id in re.findall(r"\b[SP]\d{2}\b", body):
        if source_id not in source_ids:
            raise ValueError(f"Unknown citation: {source_id}")

    return {
        "sections": len(sections),
        "sources": len(sources),
        "scientific": len(scientific),
    }


def check_links() -> None:
    files = [ROOT / "README.md"]
    files.extend(
        path
        for path in DOCS.rglob("*.md")
        if not {"private", "local"}.intersection(path.relative_to(DOCS).parts)
    )
    broken = []
    for path in files:
        text = path.read_text(encoding="utf-8-sig")
        for target in re.findall(r"!?\[[^\]]*\]\(([^)]+)\)", text):
            parsed = urlsplit(target)
            if parsed.scheme or not parsed.path:
                continue
            resolved = (path.parent / unquote(parsed.path)).resolve()
            if not resolved.exists():
                broken.append(
                    {"file": path.relative_to(ROOT).as_posix(), "target": target}
                )
    if broken:
        raise ValueError("Broken documentation links: " + json.dumps(broken))


def check_pdf(path: Path) -> int:
    from pypdf import PdfReader

    reader = PdfReader(path)
    text = "\n".join(page.extract_text() or "" for page in reader.pages).lower()
    for heading in PDF_SECTIONS:
        if heading.lower() not in text:
            raise ValueError(f"Missing PDF section: {heading}")
    return len(reader.pages)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", type=Path, help="Also check an assembled report PDF")
    parser.add_argument(
        "--out",
        type=Path,
        default=ROOT / ".predefense-local" / "checks" / "package-audit.json",
    )
    args = parser.parse_args()
    result = check_sources()
    check_links()
    result["local_markdown_links"] = "PASS"
    if args.pdf:
        result["report_pages"] = check_pdf(args.pdf)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()

"""Build an HTML report from the eleven Markdown sections and reference material."""

from __future__ import annotations

import html
import os
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit

DOCS = Path(__file__).resolve().parents[1]
TITLE = (
    "Development of a Toolkit for Automated Comparison of ANSI X12 EDI Implementation Guides "
    "with an Investigation into Partner-Specific Implementation Divergence in Freight Logistics"
)
BLOCK_START = re.compile(r"^(#|\||!\[|```|- |\d+\. )")
FENCE = "```"


def rebase_target(target: str, source: Path) -> str:
    parsed = urlsplit(target)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return target
    resolved = (source.parent / unquote(parsed.path)).resolve()
    if not parsed.fragment:
        if resolved.parent == DOCS / "sections" and re.match(r"\d{2}-", resolved.name):
            return "#section-" + resolved.name[:2]
        anchors = {
            "BIBLIOGRAPHY.md": "#bibliography",
            "REQUIREMENTS-MATRIX.md": "#matrix",
        }
        if resolved.parent == DOCS and resolved.name in anchors:
            return anchors[resolved.name]
    relative = Path(os.path.relpath(resolved, DOCS)).as_posix()
    return urlunsplit(("", "", relative, parsed.query, parsed.fragment))


def inline(text: str, source: Path) -> str:
    tokens = []

    def keep(markup: str) -> str:
        tokens.append(markup)
        return f"\x00{len(tokens) - 1}\x00"

    text = re.sub(
        r"`([^`]+)`",
        lambda match: keep("<code>" + html.escape(match[1]) + "</code>"),
        text,
    )
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda match: keep(
            '<a href="'
            + html.escape(rebase_target(match[2], source), quote=True)
            + '">'
            + html.escape(match[1])
            + "</a>"
        ),
        text,
    )
    text = html.escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    text = re.sub(
        r"\[([SP]\d{2})\]", r'<a class="citation" href="#ref-\1">[\1]</a>', text
    )
    for index, token in enumerate(tokens):
        text = text.replace(f"\x00{index}\x00", token)
    return text


def render_table(lines: list[str], source: Path) -> str:
    rows = []
    for line in lines:
        cells = [
            cell.strip().replace(r"\|", "|")
            for cell in re.split(r"(?<!\\)\|", line.strip().strip("|"))
        ]
        if not all(re.fullmatch(r":?-{2,}:?", cell) for cell in cells):
            rows.append(cells)
    if not rows:
        return ""
    header = "".join("<th>" + inline(cell, source) + "</th>" for cell in rows[0])
    body = [
        "<tr>"
        + "".join("<td>" + inline(cell, source) + "</td>" for cell in row)
        + "</tr>"
        for row in rows[1:]
    ]
    return (
        "<table><thead><tr>"
        + header
        + "</tr></thead><tbody>"
        + "".join(body)
        + "</tbody></table>"
    )


def render_text(text: str, source: Path) -> str:
    lines = text.splitlines()
    parts = []
    index = 0
    while index < len(lines):
        line = lines[index].strip()
        if not line:
            index += 1
            continue
        if line.startswith(FENCE):
            index += 1
            block = []
            while index < len(lines) and not lines[index].strip().startswith(FENCE):
                block.append(lines[index])
                index += 1
            parts.append("<pre>" + html.escape("\n".join(block)) + "</pre>")
            index += 1
            continue
        image = re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", line)
        if image:
            target = rebase_target(image[2], source)
            kind = (
                "landscape-figure"
                if target.startswith("diagrams/") or target.endswith("overview.png")
                else "portrait-figure"
            )
            lead = ""
            if (
                len(parts) >= 2
                and parts[-1].startswith("<p>")
                and parts[-2].startswith("<h3>")
            ):
                paragraph = parts.pop()
                lead = parts.pop() + paragraph
            parts.append(
                f'<div class="figure-page {kind}">{lead}<figure><img src="{html.escape(target, quote=True)}" '
                f'alt="{html.escape(image[1], quote=True)}">'
                f"<figcaption>{html.escape(image[1])}</figcaption></figure></div>"
            )
            index += 1
            continue
        heading = re.match(r"^(#{1,4}) (.+)$", line)
        if heading:
            level = min(len(heading[1]) + 1, 5)
            parts.append(f"<h{level}>" + inline(heading[2], source) + f"</h{level}>")
            index += 1
            continue
        if line.startswith("|"):
            table = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table.append(lines[index])
                index += 1
            parts.append(render_table(table, source))
            continue
        list_match = re.match(r"^(- |\d+\. )(.+)", line)
        if list_match:
            tag = "ul" if list_match[1] == "- " else "ol"
            parts.append(f"<{tag}>")
            while index < len(lines):
                match = re.match(r"^(- |\d+\. )(.+)", lines[index].strip())
                if not match or (match[1] == "- ") != (tag == "ul"):
                    break
                reference = re.match(r"\*\*\[([SP]\d{2})\]\*\*", match[2])
                anchor = f' id="ref-{reference[1]}"' if reference else ""
                parts.append(f"<li{anchor}>" + inline(match[2], source) + "</li>")
                index += 1
            parts.append(f"</{tag}>")
            continue

        paragraph = [line]
        index += 1
        while (
            index < len(lines)
            and lines[index].strip()
            and not BLOCK_START.match(lines[index].strip())
        ):
            paragraph.append(lines[index].strip())
            index += 1
        parts.append("<p>" + inline(" ".join(paragraph), source) + "</p>")
    return "\n".join(parts)


def render(source: Path) -> str:
    return render_text(source.read_text(encoding="utf-8-sig"), source)


def cover() -> str:
    return f"""
    <div class="title-page">
      <p class="kicker">ASTANA IT UNIVERSITY · SE-2405</p>
      <h1>{html.escape(TITLE)}</h1>
      <p class="stage">First pre-defense report</p>
      <div class="meta">
        Team: Nurassyl Orazbek, Asylan Usen, Anuar Zhenissov<br>
        Supervisor: Айтмұханбетова Эльвира Айтмұханбетқызы<br>
        Supervisor position: ____________________<br>
        Submission deadline: 24 October 2026, 18:00 UTC+05:00
      </div>
      <p class="state">Project proposal, requirements, architecture, prototype and evaluation plan.</p>
    </div>
    """


def contents(sections: list[Path]) -> str:
    links = []
    for source in sections:
        heading = (
            source.read_text(encoding="utf-8-sig").splitlines()[0].removeprefix("# ")
        )
        name = re.sub(r"^\d+\s+", "", heading)
        links.append(
            f'<li><a href="#section-{source.name[:2]}">{html.escape(name)}</a></li>'
        )
    links.extend(
        [
            '<li><a href="#bibliography">Bibliography</a></li>',
            '<li><a href="#matrix">Requirements traceability</a></li>',
        ]
    )
    return (
        '<div class="contents"><h2>Contents</h2><ol>'
        + "".join(links)
        + '</ol><p class="toc-note">Source references and editable diagrams accompany the report.</p></div>'
    )


def main() -> None:
    sections = sorted((DOCS / "sections").glob("[0-9][0-9]-*.md"))
    if len(sections) != 11:
        raise ValueError(f"Expected eleven report sections, found {len(sections)}")
    body = [cover(), contents(sections)]
    for source in sections:
        body.append(
            f'<section class="chapter" id="section-{source.name[:2]}">{render(source)}</section>'
        )
    body.append(
        f'<section class="chapter bib" id="bibliography">{render(DOCS / "BIBLIOGRAPHY.md")}</section>'
    )
    body.append(
        f'<section class="chapter appendix" id="matrix">{render(DOCS / "REQUIREMENTS-MATRIX.md")}</section>'
    )
    document = (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        "<title>EDI Identifier first pre-defense report</title>"
        '<link rel="stylesheet" href="report.css"></head><body>'
        + "\n".join(body)
        + "</body></html>"
    )
    (DOCS / "report.html").write_text(document, encoding="utf-8")
    print(f"Built report.html from {len(sections)} sections")


if __name__ == "__main__":
    main()

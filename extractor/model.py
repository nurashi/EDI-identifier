import subprocess

QUALIFIER_ELEMENT = {"L11": "02", "N1": "01", "N9": "01"}
BASE = {"Mandatory": "M", "Optional": "O", "Conditional": "X"}


def pdf_pages(path):
    out = subprocess.run(
        ["pdftotext", "-layout", path, "-"],
        check=True,
        capture_output=True,
        encoding="utf-8",
    ).stdout
    pages = out.split("\f")
    if pages and not pages[-1].strip():
        pages.pop()
    return pages


def squash(s):
    return " ".join(s.split())


def lines(pages):
    for number, page in enumerate(pages, 1):
        for line in page.split("\n"):
            yield number, line


def loop_chain(loop, parents):
    chain = []
    while loop:
        chain.append(loop)
        loop = parents.get(loop)
    return chain[::-1]


class Element:
    def __init__(self, element, usage, page, excerpt):
        self.element = element
        self.usage = usage
        self.type = None
        self.codes = None
        self.evidence = [(page, "usage", excerpt)]
        self.notes = 0


class Segment:
    def __init__(self, segment, position, page):
        self.segment = segment
        self.position = position
        self.page = page
        self.base = None
        self.loop = None
        self.usage = None
        self.max_use = 0
        self.loop_repeat = 0
        self.conditions = []
        self.elements = []
        self.evidence = []
        self.notes = 0

    def qualifier(self):
        suffix = QUALIFIER_ELEMENT.get(self.segment)
        for e in self.elements:
            if (
                suffix
                and e.element == self.segment + suffix
                and e.codes
                and e.codes["mode"] == "enumerated"
            ):
                return e.codes["values"]
        return None


def evidence(entries):
    by_page = {}
    for page, field, excerpt in entries:
        fields, excerpts = by_page.setdefault(page, ([], []))
        if field not in fields:
            fields.append(field)
        if excerpt not in excerpts:
            excerpts.append(excerpt)
    return [
        {"page": p, "excerpt": " / ".join(x), "supports": f}
        for p, (f, x) in sorted(by_page.items())
    ]


def requirements(segments, parents):
    counts = {}
    for s in segments:
        k = (s.segment, s.position, s.loop)
        counts[k] = counts.get(k, 0) + 1
    out = []
    for s in segments:
        key = {"segment": s.segment, "position": s.position}
        chain = loop_chain(s.loop, parents)
        if chain:
            key["loop"] = chain
        if counts[(s.segment, s.position, s.loop)] > 1 and s.qualifier():
            key["qualifier"] = sorted(s.qualifier())
        out.append(record(key, s.usage or {"declared": "unknown"}, s))
        for e in s.elements:
            out.append(record(dict(key, element=e.element), e.usage, e))
    return out


def record(key, usage, item):
    r = {"key": key, "usage": usage}
    if getattr(item, "max_use", 0):
        r["max_use"] = item.max_use
    if getattr(item, "loop_repeat", 0):
        r["loop_repeat"] = item.loop_repeat
    if getattr(item, "codes", None):
        r["codes"] = item.codes
    if getattr(item, "conditions", None):
        r["conditions"] = item.conditions
    r["evidence"] = evidence(item.evidence)
    if item.notes:
        r["review"] = {"reason": f"{item.notes} free-text note(s) not classified"}
    return r

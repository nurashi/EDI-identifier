import re
from collections import Counter, deque

from .model import Element, Segment, requirements, squash

POSITION = re.compile(r"^\s*Position:\s*(\d*)\s*$")
SEGMENT = re.compile(r"^(?:\s*Segment:\s*|\s{0,12})([A-Z][A-Z0-9]{1,2})\s+[A-Z(]")
LABEL = re.compile(r"^\s*(Loop|Level|Usage|Max Use|Purpose|Syntax Notes|Semantic Notes|Comments|Notes):\s*(.*?)\s*$")
ITEM = re.compile(r"^\s*(\d+)\s+(\S.*?)\s*$")
ELEMENT = re.compile(
    r"^\s*(?:M\s+)?([A-Z][A-Z0-9]{1,2}\d{2})\s+\d+\s+(.+?)\s+(?:([MOX])\s+)?(AN|ID|DT|TM|N\d?|R\d?|B)\s+\d+/\d+\s*$"
)
CODE = re.compile(r"^(\s*)([A-Z0-9]{1,4})\s{2,}\S")
REFERENCE = re.compile(r"(?:codes? (?:as found in|from) the|[Ss]ame (?:\d+ )?codes as) ([A-Z][A-Z0-9]{1,2})[_-]?(\d{2})\b")
LOOP_ROW = re.compile(r"LOOP ID\s*[–-]\s*(\d{4})\s+(\d+)\s*$")
OVERVIEW_ROW = re.compile(r"^\s+(?:\d+\s+)?(\d{3})\s+([A-Z][A-Z0-9]{1,2})\s{2,}\S")

SEGMENT_USAGE = {"mandatory": "required", "optional": "optional", "conditional": "conditional", "not used": "not_used"}
DESIGNATOR = {"M": "required", "O": "optional", "X": "conditional"}


def detect(pages):
    return any("Data Element Summary" in p for p in pages)


def segment_usage(label):
    low = label.lower()
    if "except" in low:
        return {"declared": "conditional", "declared_label": label}
    for word, declared in SEGMENT_USAGE.items():
        if low.startswith(word):
            return {"declared": declared, "declared_label": label}
    return {"declared": "unknown", "declared_label": label}


def chrome(pages):
    norm = lambda s: re.sub(r"\d+", "#", squash(s))
    edges = []
    for p in pages:
        ls = [l for l in p.split("\n") if l.strip()]
        edges.append({norm(l) for l in ls[:3] + ls[-2:]})
    counts = Counter(n for e in edges for n in e)
    frequent = {n for n, c in counts.items() if c >= len(pages) / 2}
    return lambda line: norm(line) in frequent


def parent(loop):
    return None if loop.endswith("00") else loop[:2] + "00"


class Parser:
    def __init__(self):
        self.segments, self.loops = [], {}
        self.seg = self.elem = None
        self.section = None
        self.recent = deque(maxlen=3)
        self.overview = True
        self.pending_loop = None
        self.first_of_loop = {}

    def line(self, page, line):
        text = line.strip()
        if not text:
            return
        if m := POSITION.match(line):
            self.start(page, line, m)
            self.recent.append((page, line))
            return
        self.recent.append((page, line))
        if self.overview:
            self.overview_line(line)
            return
        seg = self.seg
        if seg is None:
            return
        if "Data Element Summary" in line:
            self.section = "elements"
            return
        if m := LABEL.match(line):
            self.label(page, line, m)
            return
        if self.section in ("syntax", "semantic"):
            self.item(page, line, text)
            return
        if self.section in ("notes", "prose"):
            return
        if self.section == "elements":
            self.element_line(page, line, text)

    def overview_line(self, line):
        if m := LOOP_ROW.search(line):
            self.pending_loop = (m.group(1), int(m.group(2)))
            self.loops[m.group(1)] = parent(m.group(1))
        elif (m := OVERVIEW_ROW.match(line)) and self.pending_loop:
            self.first_of_loop[(m.group(2), m.group(1))] = self.pending_loop
            self.pending_loop = None

    def start(self, page, line, m):
        self.overview = False
        self.seg = self.elem = None
        self.section = None
        header = next(((p, l) for p, l in reversed(self.recent) if SEGMENT.match(l)), None)
        if not m.group(1) or header is None:
            return
        name = SEGMENT.match(header[1])
        self.seg = Segment(name.group(1), m.group(1), page)
        self.seg.evidence.append((header[0], "key", squash(header[1])))
        self.seg.evidence.append((page, "key", squash(line)))
        if (name.group(1), m.group(1)) in self.first_of_loop:
            self.seg.loop_repeat = self.first_of_loop[(name.group(1), m.group(1))][1]
        self.segments.append(self.seg)

    def label(self, page, line, m):
        seg, name, rest = self.seg, m.group(1), m.group(2)
        self.section = None
        if name == "Loop":
            loop = rest.split()[0] if rest else ""
            seg.loop = loop if re.fullmatch(r"\d{4}", loop) else None
        elif name == "Usage" and rest:
            seg.usage = segment_usage(rest)
            seg.evidence.append((page, "usage", squash(line)))
        elif name == "Max Use" and rest.isdigit():
            seg.max_use = int(rest)
            seg.evidence.append((page, "max_use", squash(line)))
        elif name in ("Syntax Notes", "Semantic Notes"):
            self.section = "syntax" if name == "Syntax Notes" else "semantic"
            if rest:
                self.item(page, rest, rest)
        elif name in ("Comments", "Notes"):
            self.section = "notes"
            if rest:
                seg.notes += 1
        else:
            self.section = "prose"

    def item(self, page, line, text):
        seg = self.seg
        if m := ITEM.match(line):
            seg.conditions.append({"kind": self.section, "text": m.group(2)})
            seg.evidence.append((page, "conditions", m.group(2)))
        elif seg.conditions and seg.conditions[-1]["kind"] == self.section:
            last = seg.conditions[-1]
            last["text"] = squash(last["text"] + " " + text)
            seg.evidence[-1] = (seg.evidence[-1][0], "conditions", last["text"])

    def element_line(self, page, line, text):
        if m := ELEMENT.match(line):
            usage = {"declared": "unknown"}
            if m.group(3):
                usage = {"declared": DESIGNATOR[m.group(3)], "declared_label": m.group(3)}
            self.elem = Element(m.group(1), usage, page, squash(line))
            self.elem.type = m.group(4)
            self.elem.name_col = len(line) - len(line.lstrip()) + line.lstrip().find(m.group(2), len(m.group(1)))
            self.elem.code_col = None
            self.elem.code_page = page
            self.elem.lines = 0
            self.seg.elements.append(self.elem)
            return
        e = self.elem
        if e is None or e.type != "ID":
            return
        if m := REFERENCE.search(line):
            e.codes = {"mode": "reference", "ref": m.group(1) + m.group(2)}
            e.evidence.append((page, "codes", squash(line)))
            return
        m = CODE.match(line)
        if m and page != e.code_page and e.codes and e.codes["mode"] == "enumerated":
            e.code_col, e.code_page = len(m.group(1)), page
        if m and len(m.group(1)) >= min(e.name_col, e.code_col or e.name_col) and (e.code_col is None or abs(len(m.group(1)) - e.code_col) <= 2):
            if e.codes is None or e.codes["mode"] != "enumerated":
                if e.codes and e.codes["mode"] == "reference":
                    return
                e.codes = {"mode": "enumerated", "values": []}
            e.code_col = len(m.group(1)) if e.code_col is None else e.code_col
            if m.group(2) not in e.codes["values"]:
                e.codes["values"].append(m.group(2))
            e.evidence.append((page, "codes", squash(line)))
            return
        if e.codes is None:
            e.lines += 1
            if e.lines == 2:
                e.notes += 1

    def finish(self):
        for s in self.segments:
            for e in s.elements:
                if e.codes is None and e.type == "ID":
                    e.codes = {"mode": "unspecified"}
        return requirements(self.segments, self.loops)


def parse(pages):
    p = Parser()
    skip = chrome(pages)
    for number, page in enumerate(pages, 1):
        for line in page.split("\n"):
            if not skip(line):
                p.line(number, line)
    return p.finish()

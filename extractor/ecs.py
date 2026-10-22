import re

from .model import BASE, Element, Segment, lines, requirements, squash

POS = re.compile(r"Pos:\s*(\d*)\s+(Max|Repeat):\s*(\d+)")
HEADER = re.compile(r"^([A-Z][A-Z0-9]{1,2})\s+\S.*?-\s*(Mandatory|Optional|Conditional)\s*$")
LOOP = re.compile(r"Loop:\s*(\S+)\s+Elements:")
USAGE = re.compile(r"^User Option \(Usage\):\s*(.+?)\s*$")
ELEMENT = re.compile(
    r"^\s+([A-Z][A-Z0-9]{1,2}\d{2})\s+\d+\s+.+?\s+([MOX])\s+([A-Z][A-Z0-9]?)\s+\d+/\d+\s+"
    r"(Must use|Used|Recommended|Not recommended|Not used)\s*$"
)
ALL_CODES = re.compile(r"All valid standard codes are used\. \(Total Codes: (\d+)\)")
CODE_LIST = re.compile(r"Code List Summary \(Total Codes: \d+, Included: (\d+)\)")
CODE = re.compile(r"^(\s*)([A-Z0-9]{1,3})\s{2,}\S")
RULE = re.compile(r"^\s*\d+\.\s+(.+?)\s*$")
NESTED = re.compile(r"^\s+\d{3}\s+Loop (\d{4})\b")
MEMBER = re.compile(r"^\s+(\d{3})\s+([A-Z][A-Z0-9]{1,2})\s{2,}")
CHROME = re.compile(r"^\d{2}/\d{2}/\d{4}\s|\.ecs\s+\d+\s+For internal use only")
NOTE = ("User Note", "Special Notes")
PROSE = ("Description:", "Purpose:", "Comments:", "Example")

LABELS = {"must use": "required", "recommended": "recommended", "not recommended": "not_recommended", "not used": "not_used"}
BY_BASE = {"M": "required", "O": "optional", "X": "conditional"}


def usage(label, base):
    declared = LABELS.get(label.lower()) or (BY_BASE[base] if label.lower() == "used" else "unknown")
    return {"base": base, "declared": declared, "declared_label": label}


def detect(pages):
    return any("Element Summary:" in p and "User Option (Usage)" in p for p in pages)


class Parser:
    def __init__(self):
        self.segments, self.parents, self.loop_pages = [], {}, []
        self.seg = self.elem = self.loop_page = None
        self.mode = None
        self.remaining = 0
        self.code_col = None
        self.note_target = None

    def line(self, page, line):
        if not line.strip() or CHROME.search(line):
            return
        text = line.strip()

        if m := POS.search(line):
            self.start(page, line, m)
            return
        if self.loop_page is not None:
            self.loop_line(line)
            return
        seg = self.seg
        if seg is None:
            return
        if seg.segment is None:
            if m := HEADER.match(line):
                seg.segment, seg.base = m.group(1), BASE[m.group(2)]
                seg.evidence.append((page, "key", squash(line)))
                self.segments.append(seg)
            return
        if (m := LOOP.search(line)) and not seg.elements and seg.usage is None:
            seg.loop = None if m.group(1) == "N/A" else m.group(1)
            return
        if m := USAGE.match(text):
            seg.usage = usage(m.group(1), seg.base)
            seg.evidence.append((page, "usage", squash(line)))
            return
        if m := ELEMENT.match(line):
            self.elem = Element(m.group(1), usage(m.group(4), m.group(2)), page, squash(line))
            self.elem.type = m.group(3)
            seg.elements.append(self.elem)
            self.mode = "element"
            return
        if text in ("Syntax Rules:", "Semantics:"):
            self.mode, self.elem = ("syntax" if text == "Syntax Rules:" else "semantic"), None
            return
        if self.mode == "codes":
            self.code_line(page, line, text)
            return
        if text.startswith(NOTE):
            self.note_target = self.elem or seg
            self.mode = "note"
            if text.split(":", 1)[-1].strip():
                self.count_note()
            return
        if text.startswith(PROSE) or text == "Element Summary:":
            self.mode = "prose"
            return
        if self.elem is not None and (m := ALL_CODES.search(line)):
            self.elem.codes = {"mode": "all_standard", "standard_total": int(m.group(1))}
            self.elem.evidence.append((page, "codes", squash(line)))
            self.mode = "element"
            return
        if self.elem is not None and (m := CODE_LIST.search(line)):
            self.elem.codes = {"mode": "enumerated", "values": []}
            self.elem.evidence.append((page, "codes", squash(line)))
            self.remaining, self.code_col, self.mode = int(m.group(1)), None, "codes"
            return
        if self.mode in ("syntax", "semantic") and (m := RULE.match(line)):
            seg.conditions.append({"kind": self.mode, "text": m.group(1)})
            seg.evidence.append((page, "conditions", m.group(1)))
            return
        if self.mode == "note":
            self.count_note()

    def start(self, page, line, m):
        self.seg = self.elem = self.loop_page = None
        self.mode = None
        if m.group(2) == "Repeat":
            self.loop_page = {"repeat": int(m.group(3)), "loop": None, "first": None}
            self.loop_pages.append(self.loop_page)
            return
        if not m.group(1):
            return
        self.seg = Segment(None, m.group(1), page)
        self.seg.max_use = int(m.group(3))
        self.seg.evidence.append((page, "max_use", squash(line)))

    def loop_line(self, line):
        lp = self.loop_page
        if (m := LOOP.search(line)) and lp["loop"] is None:
            lp["loop"] = m.group(1)
        elif m := NESTED.match(line):
            self.parents[m.group(1)] = lp["loop"]
        elif (m := MEMBER.match(line)) and lp["first"] is None:
            lp["first"] = (m.group(2), m.group(1))

    def code_line(self, page, line, text):
        if text == "Code Name":
            return
        m = CODE.match(line)
        if not m or (self.code_col is not None and len(m.group(1)) != self.code_col):
            return
        self.code_col = len(m.group(1))
        self.elem.codes["values"].append(m.group(2))
        self.elem.evidence.append((page, "codes", squash(line)))
        self.remaining -= 1
        if self.remaining == 0:
            self.mode = "element"

    def count_note(self):
        if self.note_target is not None:
            self.note_target.notes += 1
            self.note_target = None

    def finish(self):
        for s in self.segments:
            for e in s.elements:
                if e.codes is None and e.type == "ID":
                    e.codes = {"mode": "unspecified"}
        for lp in self.loop_pages:
            for s in self.segments:
                if lp["first"] and (s.segment, s.position) == lp["first"] and s.loop == lp["loop"]:
                    s.loop_repeat = lp["repeat"]
                    break
        return requirements(self.segments, self.parents)


def parse(pages):
    p = Parser()
    for page, line in lines(pages):
        p.line(page, line)
    return p.finish()

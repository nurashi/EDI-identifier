import io
import json
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest.mock import patch

from . import ecs, spec
from .__main__ import main
from .evaluate import evaluate, report

ECS_LOOP = """
                                                                Pos: 130             Repeat: 1
Loop Assigned Number                                                          Mandatory
                                                                Loop: 0200 Elements: N/A
Loop Summary:
  Pos        Id     Segment Name                              Req     Max Use       Repeat           Usage
  130        LX     Assigned Number                           O           1                         Must use
  140               Loop 0205                                 M                        1            Must use
"""

ECS_SEGMENT = """
                                                                Pos: 140                Max: 1
AT7 Shipment Status Details                                                     Not Defined - Optional
                                                                Loop: 0205        Elements: 7
User Option (Usage): Must use
Element Summary:
   Ref         Id       Element Name                                  Req     Type     Min/Max            Usage
   AT701       1650     Shipment Status Code                           X       ID         2/2              Used
                        User Note 1:
                        - Send within 15 minutes of the event.
                        All valid standard codes are used. (Total Codes: 42)
   AT703       1652     Shipment Appointment Status Code               X       ID         2/2              Used
                        Code List Summary (Total Codes: 9, Included: 2)
                        Code Name
                        AA      Pick-up Appointment Date and/or Time
                               User Note 1:
                                Not an estimate.
                        AB      Delivery Appointment Date and/or Time
   AT705       373      Status Date                                    X       DT         8/8            Must use
Syntax Rules:
  1. C0605 - If AT706 is present, then AT705 is required.
"""

SPEC_OVERVIEW = """
                            130    LX     Assigned Number                        1
                                          LOOP ID - 0205                                  10
                            140    AT7    Shipment Status Details                1
"""

SPEC_SEGMENT = """
        AT7 Shipment Status Details for a Very Long
        Segment Name
           Position: 140
             Loop: 0205       Optional
             Usage: Optional
           Max Use: 1
      Syntax Notes:     1 Only one of AT701 or AT703 may be present.
                        2 If AT701 is present, AT705 is the date the status
     occurred.
                                                   Data Element Summary
                            AT702     1651   Shipment Status or Appointment Reason Code   X ID 2/2
                                             Code indicating the reason
                                             A1            Missed Delivery
                                             A2            Incorrect Address
"""

SPEC_NEXT_PAGE = """
                                     B1          Consignee Closed
                            AT704     1651   Shipment Status or Appointment Reason Code   X ID 2/2
                                             Same 70 codes as AT702
                            AT707     623    Time Code                                     ID 2/2
                                             CT             Central Time
"""


def by_key(reqs):
    out = {}
    for r in reqs:
        k = r["key"]
        out["/".join(k.get("loop", [])) + ":" + k["segment"] + "/" + k.get("element", "")] = r
    return out


class ECSTest(unittest.TestCase):
    def test_parse(self):
        reqs = by_key(ecs.parse([ECS_LOOP, ECS_SEGMENT]))
        seg = reqs["0200/0205:AT7/"]
        self.assertEqual(seg["usage"], {"base": "O", "declared": "required", "declared_label": "Must use"})
        self.assertEqual((seg["max_use"], seg.get("loop_repeat")), (1, None))
        self.assertEqual(seg["conditions"], [{"kind": "syntax", "text": "C0605 - If AT706 is present, then AT705 is required."}])
        self.assertEqual(reqs["0200/0205:AT7/AT701"]["usage"]["declared"], "conditional")
        self.assertEqual(reqs["0200/0205:AT7/AT701"]["codes"], {"mode": "all_standard", "standard_total": 42})
        self.assertIn("review", reqs["0200/0205:AT7/AT701"])
        self.assertEqual(reqs["0200/0205:AT7/AT703"]["codes"], {"mode": "enumerated", "values": ["AA", "AB"]})
        self.assertEqual(reqs["0200/0205:AT7/AT705"]["usage"]["declared"], "required")
        self.assertNotIn("codes", reqs["0200/0205:AT7/AT705"])

    def test_detect(self):
        self.assertTrue(ecs.detect([ECS_SEGMENT]))
        self.assertFalse(ecs.detect([SPEC_SEGMENT]))


class SpecTest(unittest.TestCase):
    def test_parse(self):
        reqs = by_key(spec.parse([SPEC_OVERVIEW, SPEC_SEGMENT, SPEC_NEXT_PAGE]))
        seg = reqs["0200/0205:AT7/"]
        self.assertEqual(seg["usage"], {"declared": "optional", "declared_label": "Optional"})
        self.assertEqual((seg["max_use"], seg["loop_repeat"]), (1, 10))
        self.assertEqual([c["text"] for c in seg["conditions"]], [
            "Only one of AT701 or AT703 may be present.",
            "If AT701 is present, AT705 is the date the status occurred.",
        ])
        self.assertEqual(reqs["0200/0205:AT7/AT702"]["codes"]["values"], ["A1", "A2", "B1"])
        self.assertEqual(reqs["0200/0205:AT7/AT704"]["codes"], {"mode": "reference", "ref": "AT702"})
        self.assertEqual(reqs["0200/0205:AT7/AT707"]["usage"], {"declared": "unknown"})
        self.assertEqual(reqs["0200/0205:AT7/AT707"]["codes"]["values"], ["CT"])

    def test_segment_usage(self):
        self.assertEqual(spec.segment_usage("Mandatory except for reporting AT703")["declared"], "conditional")
        self.assertEqual(spec.segment_usage("Mandatory")["declared"], "required")


class EvaluateTest(unittest.TestCase):
    def test_json(self):
        key = {"segment": "AT7", "position": "140"}
        ref = {"guide": {"id": "g"}, "requirements": [
            {"key": key, "usage": {"declared": "required"}, "max_use": 1},
            {"key": dict(key, element="AT701"), "usage": {"declared": "conditional"},
             "conditions": [{"kind": "timing", "text": "Within 15 minutes."}]},
        ]}
        got = {"guide": {"id": "g"}, "requirements": [
            {"key": key, "usage": {"declared": "required"}, "max_use": 2, "review": ["Check max use."]},
            {"key": dict(key, element="AT702"), "usage": {"declared": "conditional"}},
            {"key": dict(key, element="AT703"), "usage": {"declared": "conditional"}},
            {"key": {"segment": "N1", "position": "050"}, "usage": {"declared": "optional"}},
        ]}
        e = evaluate(got, ref)
        self.assertEqual((e["reference"], e["extracted"], e["matched"]), (2, 3, 1))
        self.assertEqual(e["missing"], ["AT7@140/AT701"])
        self.assertEqual(e["fields"]["max_use"], [0, 1])
        self.assertEqual(e["free_conditions"], 1)
        with tempfile.TemporaryDirectory() as d:
            extracted, reference, out = [str(Path(d) / name) for name in ("got.json", "ref.json", "out.json")]
            Path(extracted).write_text(json.dumps(got), encoding="utf-8")
            Path(reference).write_text(json.dumps(ref), encoding="utf-8")
            for options in ([], ["--json", out]):
                with patch("sys.argv", ["extractor", "evaluate", extracted, reference] + options):
                    with redirect_stdout(io.StringIO()) as text:
                        main()
                self.assertEqual(text.getvalue(), report(e))
            data = json.loads(Path(out).read_text(encoding="utf-8"))
        self.assertEqual(set(data), {"guide", "reference", "extracted", "matched", "recall", "precision",
                                     "fields", "missing", "extra", "mismatches", "free_conditions", "flagged"})
        self.assertEqual(data["guide"], "g")
        self.assertEqual((data["reference"], data["extracted"], data["matched"]), (2, 3, 1))
        self.assertEqual(data["recall"], 0.5)
        self.assertAlmostEqual(data["precision"], 1 / 3)
        self.assertEqual(data["fields"], {
            "usage": {"correct": 1, "total": 1, "accuracy": 1.0},
            "base": {"correct": 1, "total": 1, "accuracy": 1.0},
            "max_use": {"correct": 0, "total": 1, "accuracy": 0.0},
            "loop_repeat": {"correct": 1, "total": 1, "accuracy": 1.0},
            "codes": {"correct": 1, "total": 1, "accuracy": 1.0},
            "syntax": {"correct": 1, "total": 1, "accuracy": 1.0},
        })
        self.assertEqual(data["missing"], ["AT7@140/AT701"])
        self.assertEqual(data["extra"], ["AT7@140/AT702", "AT7@140/AT703"])
        self.assertEqual(data["mismatches"], [{"key": "AT7@140", "field": "max_use", "extracted": 2, "reference": 1}])
        self.assertEqual((data["free_conditions"], data["flagged"]), (1, 1))


if __name__ == "__main__":
    unittest.main()

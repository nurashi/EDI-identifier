"""Build the review dataset from the reference guides and the comparison CLI."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
import tempfile
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / "docs/predefense"
GUIDE_IDS = ("chr-214", "kbx-214", "domtar-214")
GUIDE_FILES = tuple(
    ROOT / "corpus/214-004010/guides" / f"{name}.json" for name in GUIDE_IDS
)
HEADERS = (
    "unit",
    "left_guide",
    "right_guide",
    "left_key",
    "right_key",
    "alignment",
    "category",
    "verdict",
    "left",
    "right",
    "detail",
    "left_pages",
    "right_pages",
    "label",
    "note",
)


def key_id(key: dict) -> str:
    prefix = "/".join(key.get("loop", []))
    result = (prefix + ":" if prefix else "") + key["segment"] + "@" + key["position"]
    if key.get("qualifier"):
        result += "[" + ",".join(sorted(key["qualifier"])) + "]"
    if key.get("element"):
        result += "/" + key["element"]
    return result


def load_guides() -> tuple[dict, dict]:
    guides, hashes = {}, {}
    for file in GUIDE_FILES:
        content = file.read_bytes()
        guide = json.loads(content)
        meta = guide["guide"]
        if (meta["transaction_set"], meta["version"]) != ("214", "004010"):
            raise ValueError(f"{file.name}: unsupported transaction or release")
        records = {key_id(record["key"]): record for record in guide["requirements"]}
        if len(records) != len(guide["requirements"]):
            raise ValueError(f"{file.name}: duplicate requirement key")
        for key, record in records.items():
            if not record["evidence"] or any(
                not 1 <= item["page"] <= meta["source"]["pages"]
                for item in record["evidence"]
            ):
                raise ValueError(f"{file.name}: invalid source evidence for {key}")
        guide["by_key"] = records
        guides[meta["id"]] = guide
        canonical = json.dumps(
            json.loads(content), sort_keys=True, separators=(",", ":")
        )
        hashes[meta["id"]] = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    return guides, hashes


def compare(edi: Path, output: Path) -> list[dict]:
    subprocess.run(
        [
            str(edi.resolve()),
            "diff",
            "-rule",
            "qualifier",
            "-json",
            str(output),
            *(str(file) for file in GUIDE_FILES),
        ],
        check=True,
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
    )
    return json.loads(output.read_text(encoding="utf-8"))


def make_dataset(guides: dict, hashes: dict, reports: list[dict]) -> dict:
    rows = []
    for report in reports:
        for finding in report["findings"]:
            row = {
                "unit": f"F{len(rows) + 1:03}",
                "left_guide": report["left"],
                "right_guide": report["right"],
                **finding,
                "left_pages": ",".join(map(str, finding["left_pages"])),
                "right_pages": ",".join(map(str, finding["right_pages"])),
                "detail": finding.get("detail", ""),
                "label": "",
                "note": "",
            }
            for side in ("left", "right"):
                if row[f"{side}_key"] not in guides[row[f"{side}_guide"]]["by_key"]:
                    raise ValueError(f"Unknown {side} requirement in {row['unit']}")
            rows.append(row)

    identity = json.dumps(
        {"guides": hashes, "reports": reports}, sort_keys=True, separators=(",", ":")
    )
    stats = {
        "dataset_sha256": hashlib.sha256(identity.encode("utf-8")).hexdigest(),
        "guide_content_sha256": hashes,
        "alignment_rule": "qualifier",
        "guides": [
            {
                "id": name,
                "partner": guide["guide"]["partner"],
                "requirements": len(guide["requirements"]),
                "pages": guide["guide"]["source"]["pages"],
            }
            for name, guide in guides.items()
        ],
        "requirements": sum(len(guide["requirements"]) for guide in guides.values()),
        "units": len(rows),
        "labelled": 0,
        "by_pair": dict(
            Counter(row["left_guide"] + " ~ " + row["right_guide"] for row in rows)
        ),
        "by_category": dict(Counter(row["category"] for row in rows)),
        "by_verdict": dict(Counter(row["verdict"] for row in rows)),
        "unmatched_by_pair": [
            {
                "left": report["left"],
                "right": report["right"],
                "left_only": len(report["left_only"]),
                "right_only": len(report["right_only"]),
            }
            for report in reports
        ],
    }
    return {
        "guides": {
            name: {"guide": guide["guide"], "by_key": guide["by_key"]}
            for name, guide in guides.items()
        },
        "headers": HEADERS,
        "rows": rows,
        "reports": [
            {key: value for key, value in report.items() if key != "findings"}
            for report in reports
        ],
        "stats": stats,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--edi", type=Path, help="Use an existing edi executable instead of building it"
    )
    args = parser.parse_args()
    guides, hashes = load_guides()
    work = ROOT / ".predefense-local/tmp"
    work.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="edi-comparison-", dir=work) as directory:
        temp = Path(directory)
        edi = args.edi
        if edi is None:
            edi = temp / ("edi.exe" if os.name == "nt" else "edi")
            subprocess.run(
                [
                    "go",
                    "-C",
                    str(ROOT / "backend"),
                    "build",
                    "-o",
                    str(edi),
                    "./cmd/edi",
                ],
                check=True,
            )
        data = make_dataset(guides, hashes, compare(edi, temp / "comparison.json"))

    encoded = json.dumps(data, ensure_ascii=False, indent=2).replace("<", "\\u003c")
    (DOCS / "prototype/data.js").write_text(
        "window.EDI_DATA = " + encoded + ";\n", encoding="utf-8"
    )
    (DOCS / "evidence/corpus-audit.json").write_text(
        json.dumps(data["stats"], ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(data["stats"], indent=2))


if __name__ == "__main__":
    main()

"""Check that review CSV preserves every finding and separates reviews from verdicts."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1]


def read_dataset() -> dict:
    script = (DOCS / "prototype/data.js").read_text(encoding="utf-8")
    return json.loads(
        script.removeprefix("window.EDI_DATA = ").strip().removesuffix(";")
    )


def check_export(directory: Path) -> int:
    data = read_dataset()
    original = data["rows"]
    with (directory / "annotation-export.csv").open(
        encoding="utf-8", newline=""
    ) as stream:
        reader = csv.DictReader(stream)
        if reader.fieldnames != data["headers"]:
            raise ValueError("CSV column names or order changed")
        exported = list(reader)
    expected = json.loads(
        (directory / "expected-annotation.json").read_text(encoding="utf-8")
    )
    if len(original) != len(exported) or len(original) != data["stats"]["units"]:
        raise ValueError("CSV finding count changed")
    found = False
    for before, after in zip(original, exported):
        for key in data["headers"]:
            if key not in ("label", "note") and str(before[key]) != after[key]:
                raise ValueError(f"{before['unit']}: immutable value changed: {key}")
        if before["unit"] == expected["unit"]:
            found = True
            if after["label"] != expected["label"] or after["note"] != expected["note"]:
                raise ValueError("Quoted multiline review did not round-trip")
        elif after["label"] or after["note"]:
            raise ValueError(f"{before['unit']}: unexpected review")
    if not found:
        raise ValueError("The expected review is absent from the CSV")
    return len(exported)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dir", type=Path, required=True)
    count = check_export(parser.parse_args().dir)
    print(
        f"PASS: {count} findings and all immutable values preserved; quoted multiline note round-trips."
    )


if __name__ == "__main__":
    main()

"""Download exact public pilot revisions for local verification; PDFs are not committed."""

from __future__ import annotations
import argparse
import hashlib
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    for name in ("chr-214", "kbx-214", "domtar-214"):
        meta = json.loads(
            (ROOT / f"corpus/214-004010/guides/{name}.json").read_text(encoding="utf-8")
        )["guide"]
        target = args.out / f"{name}.pdf"
        if not target.exists():
            request = urllib.request.Request(
                meta["source"]["url"],
                headers={"User-Agent": "EDI-Identifier-Academic-Reproduction/1.0"},
            )
            with urllib.request.urlopen(request, timeout=60) as response:
                content = response.read()
            if not content.startswith(b"%PDF"):
                raise ValueError(f"{name}: URL did not return a PDF")
            if hashlib.sha256(content).hexdigest() != meta["source"]["sha256"]:
                raise ValueError(
                    f"{name}: source revision changed; do not silently replace the reference"
                )
            target.write_bytes(content)
        actual = hashlib.sha256(target.read_bytes()).hexdigest()
        if actual != meta["source"]["sha256"]:
            raise ValueError(f"{name}: local PDF hash mismatch")
        print(f"{name}: sha256 OK; {len(target.read_bytes())} bytes; {target}")


if __name__ == "__main__":
    main()

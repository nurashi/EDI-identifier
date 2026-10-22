import json
import sys


def key_id(k):
    s = ""
    if k.get("loop"):
        s += "/".join(k["loop"]) + ":"
    s += k["segment"] + "@" + k["position"]
    if k.get("qualifier"):
        s += "[" + ",".join(sorted(k["qualifier"])) + "]"
    if k.get("element"):
        s += "/" + k["element"]
    return s


def main(report_path, out_path, guide_paths):
    guides = {}
    for p in guide_paths:
        g = json.load(open(p, encoding="utf-8"))
        meta = g["guide"]
        guides[meta["id"]] = {
            "partner": meta["partner"],
            "revision": meta.get("revision", ""),
            "url": meta["source"]["url"],
            "evidence": {key_id(r["key"]): r["evidence"] for r in g["requirements"]},
        }
    data = {"guides": guides, "reports": json.load(open(report_path, encoding="utf-8"))}
    html = open(__file__.replace("build.py", "viewer.template.html"), encoding="utf-8").read()
    open(out_path, "w", encoding="utf-8").write(html.replace("/*DATA*/null", json.dumps(data, ensure_ascii=False)))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3:])

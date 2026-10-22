FIELDS = ["usage", "base", "max_use", "loop_repeat", "codes", "syntax"]


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


def codes(r):
    c = r.get("codes")
    if not c:
        return None
    if c["mode"] == "enumerated":
        return ("enumerated", tuple(sorted(c["values"])))
    if c["mode"] == "all_standard":
        return ("all_standard", c.get("standard_total"))
    if c["mode"] == "reference":
        return ("reference", c["ref"])
    return (c["mode"],)


def syntax(r):
    return sorted(" ".join(c["text"].split()) for c in r.get("conditions", []) if c["kind"] == "syntax")


def value(r, field):
    if field == "usage":
        return r["usage"]["declared"]
    if field == "base":
        return r["usage"].get("base")
    if field in ("max_use", "loop_repeat"):
        return r.get(field, 0)
    if field == "codes":
        return codes(r)
    return syntax(r)


def evaluate(extracted, reference):
    ref = {key_id(r["key"]): r for r in reference["requirements"]}
    scope = {(r["key"]["segment"], r["key"]["position"]) for r in reference["requirements"]}
    got = {key_id(r["key"]): r for r in extracted["requirements"] if (r["key"]["segment"], r["key"]["position"]) in scope}
    matched = sorted(set(ref) & set(got))
    fields = {f: [0, 0] for f in FIELDS}
    misses = []
    for k in matched:
        for f in FIELDS:
            a, b = value(got[k], f), value(ref[k], f)
            fields[f][1] += 1
            if a == b:
                fields[f][0] += 1
            else:
                misses.append((k, f, a, b))
    free = sum(1 for r in reference["requirements"] for c in r.get("conditions", []) if c["kind"] != "syntax")
    return {
        "guide": reference["guide"]["id"],
        "reference": len(ref),
        "extracted": len(got),
        "matched": len(matched),
        "missing": sorted(set(ref) - set(got)),
        "extra": sorted(set(got) - set(ref)),
        "fields": fields,
        "misses": misses,
        "free_conditions": free,
        "flagged": sum(1 for r in extracted["requirements"] if "review" in r),
    }


def summary(e):
    return {
        "guide": e["guide"],
        "reference": e["reference"],
        "extracted": e["extracted"],
        "matched": e["matched"],
        "recall": e["matched"] / max(e["reference"], 1),
        "precision": e["matched"] / max(e["extracted"], 1),
        "fields": {f: {"correct": ok, "total": n, "accuracy": ok / max(n, 1)}
                   for f, (ok, n) in e["fields"].items()},
        "missing": e["missing"],
        "extra": e["extra"],
        "mismatches": [{"key": k, "field": f, "extracted": a, "reference": b}
                       for k, f, a, b in e["misses"]],
        "free_conditions": e["free_conditions"],
        "flagged": e["flagged"],
    }


def report(e):
    out = [f"{e['guide']}: {e['matched']} of {e['reference']} reference requirements found, "
           f"{e['extracted']} extracted in the same segments"]
    out.append(f"  recall {e['matched'] / e['reference']:.3f}, precision {e['matched'] / max(e['extracted'], 1):.3f}")
    for f, (ok, n) in e["fields"].items():
        out.append(f"  {f:<12} {ok:>3}/{n:<3} {ok / max(n, 1):.3f}")
    out.append(f"  free-text conditions in the reference, not extracted: {e['free_conditions']}; "
               f"extracted records flagged for review: {e['flagged']}")
    for k in e["missing"]:
        out.append(f"  missing {k}")
    for k in e["extra"]:
        out.append(f"  extra   {k}")
    for k, f, a, b in e["misses"]:
        out.append(f"  wrong   {k} {f}: got {a!r}, reference {b!r}")
    return "\n".join(out) + "\n"

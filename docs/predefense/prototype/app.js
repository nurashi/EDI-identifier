(() => {
  "use strict";

  const data = window.EDI_DATA;
  const element = (id) => document.getElementById(id);
  const storageKey = "edi-review-" + data.stats.dataset_sha256;
  const validLabels = new Set(["", "same", "different", "unknown"]);
  const verdictNames = {
    same: "Same",
    different: "Different",
    one_side: "Stated on one side",
    review: "Needs review",
  };
  let annotations = {};
  let selected = data.rows[0]?.unit;

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (stored && typeof stored === "object" && !Array.isArray(stored)) {
      annotations = stored;
    }
  } catch {
    annotations = {};
  }

  function createNode(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function annotation(id) {
    const value = annotations[id];
    if (
      value &&
      validLabels.has(value.label) &&
      typeof value.note === "string"
    ) {
      return value;
    }
    return { label: "", note: "" };
  }

  function sourceLink(guide, page) {
    const link = createNode("a", "PDF page " + page + " ↗");
    const url = new URL(guide.guide.source.url);
    if (url.protocol === "https:") {
      url.hash = "page=" + page;
      link.href = url.href;
    }
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function visibleRows() {
    const [left, right] = element("pair").value.split("|");
    const query = element("search").value.toLowerCase().trim();
    return data.rows.filter((row) => {
      const text = [
        row.unit,
        row.left_key,
        row.right_key,
        row.left,
        row.right,
        row.detail,
      ]
        .join(" ")
        .toLowerCase();
      return (
        row.left_guide === left &&
        row.right_guide === right &&
        (element("category").value === "all" ||
          row.category === element("category").value) &&
        (element("verdict").value === "all" ||
          row.verdict === element("verdict").value) &&
        (!query || text.includes(query))
      );
    });
  }

  function showEvidence(side, guide, record) {
    const target = element(side + "-evidence");
    target.replaceChildren();
    for (const evidence of record.evidence) {
      const item = createNode("div", undefined, "evidence-item");
      item.append(
        sourceLink(guide, evidence.page),
        createNode("p", evidence.excerpt),
      );
      target.append(item);
    }
  }

  function showUnit(row) {
    element("unit-id").textContent = row.unit;
    element("category-tag").textContent = row.category;
    element("verdict-tag").textContent = verdictNames[row.verdict];
    element("unit-key").textContent = row.left_key;
    element("alignment").textContent =
      "Alignment: " +
      row.alignment +
      (row.left_key !== row.right_key
        ? " · right key: " + row.right_key
        : " · same structural key");
    element("finding-detail").textContent = row.detail;
    element("finding-detail").hidden = !row.detail;

    for (const side of ["left", "right"]) {
      const guide = data.guides[row[side + "_guide"]];
      const record = guide.by_key[row[side + "_key"]];
      element(side + "-partner").textContent = guide.guide.partner;
      element(side + "-summary").textContent = row[side];
      element(side + "-pages").textContent =
        "Source pages " + row[side + "_pages"];
      element(side + "-record").textContent = JSON.stringify(record, null, 2);
      showEvidence(side, guide, record);
    }

    const saved = annotation(row.unit);
    element("label-choice").value = saved.label;
    element("note").value = saved.note;
    element("save-status").textContent =
      saved.label || saved.note
        ? "Existing local review loaded."
        : "Choose a label and save your review.";
  }

  function showUnmatched() {
    const [left, right] = element("pair").value.split("|");
    const report = data.reports.find(
      (item) => item.left === left && item.right === right,
    );
    const target = element("unmatched-list");
    target.replaceChildren();
    element("unmatched-count").textContent =
      report.left_only.length + report.right_only.length;

    for (const [guideId, records] of [
      [left, report.left_only],
      [right, report.right_only],
    ]) {
      const guide = data.guides[guideId];
      const column = createNode("div");
      column.append(
        createNode("h3", guide.guide.partner + " · " + records.length),
      );
      const list = createNode("ul");
      for (const record of records) {
        const item = createNode("li");
        item.append(createNode("span", record.key + " "));
        for (const page of record.pages)
          item.append(sourceLink(guide, page), document.createTextNode(" "));
        list.append(item);
      }
      column.append(list);
      target.append(column);
    }
  }

  function refresh() {
    const rows = visibleRows();
    const list = element("units");
    list.replaceChildren();
    element("empty").hidden = rows.length > 0;
    element("detail-empty").hidden = rows.length > 0;
    element("detail-pane").hidden = !rows.length;
    const count = rows.length + (rows.length === 1 ? " finding" : " findings");
    element("visible-count").textContent = count;
    element("local-count").textContent = data.rows.filter(
      (row) => annotation(row.unit).label,
    ).length;
    element("pair-description").textContent =
      "Automated comparison · " + count + " shown";

    if (rows.length && !rows.some((row) => row.unit === selected))
      selected = rows[0].unit;
    for (const row of rows) {
      const button = createNode(
        "button",
        undefined,
        "unit-row" + (row.unit === selected ? " selected" : ""),
      );
      button.type = "button";
      button.dataset.unit = row.unit;
      button.setAttribute("aria-pressed", String(row.unit === selected));
      const meta = createNode("div", undefined, "row-meta");
      meta.append(
        createNode("strong", row.unit),
        createNode("span", verdictNames[row.verdict]),
        createNode(
          "span",
          annotation(row.unit).label || "Not reviewed",
          "row-status",
        ),
      );
      button.append(
        meta,
        createNode("div", row.left_key, "row-key"),
        createNode("div", row.category + " · " + row.alignment, "row-category"),
      );
      button.addEventListener("click", () => {
        selected = row.unit;
        refresh();
      });
      list.append(button);
    }

    for (const id of ["save", "label-choice", "note"])
      element(id).disabled = !rows.length;
    if (rows.length) showUnit(rows.find((row) => row.unit === selected));
    showUnmatched();
  }

  function saveReview() {
    if (!visibleRows().length) return;
    annotations[selected] = {
      label: element("label-choice").value,
      note: element("note").value,
    };
    refresh();
    try {
      localStorage.setItem(storageKey, JSON.stringify(annotations));
      element("save-status").textContent =
        "Saved on this device. Export CSV to keep a separate copy.";
    } catch {
      element("save-status").textContent =
        "Browser storage unavailable. Export CSV to save this session.";
    }
  }

  function csvCell(value) {
    return '"' + String(value ?? "").replace(/"/g, '""') + '"';
  }

  function exportReviews() {
    const lines = [data.headers.map(csvCell).join(",")];
    for (const row of data.rows) {
      const review = annotation(row.unit);
      lines.push(
        data.headers
          .map((key) =>
            csvCell(
              key === "label"
                ? review.label
                : key === "note"
                  ? review.note
                  : row[key],
            ),
          )
          .join(","),
      );
    }
    const blob = new Blob([lines.join("\r\n") + "\r\n"], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = createNode("a");
    link.href = url;
    link.download = "guide-reviews.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  for (const report of data.reports) {
    const option = createNode(
      "option",
      data.guides[report.left].guide.partner +
        " / " +
        data.guides[report.right].guide.partner,
    );
    option.value = report.left + "|" + report.right;
    element("pair").append(option);
  }
  element("guide-count").textContent = data.stats.guides.length;
  element("requirement-count").textContent = data.stats.requirements;
  element("finding-count").textContent = data.stats.units;

  for (const id of ["pair", "category", "verdict", "search"]) {
    element(id).addEventListener(id === "search" ? "input" : "change", refresh);
  }
  element("save").addEventListener("click", saveReview);
  element("export").addEventListener("click", exportReviews);
  refresh();
})();

package compare

import (
	"path/filepath"
	"slices"
	"testing"
)

func summary(fs []Finding) []string {
	out := make([]string, len(fs))
	for i, f := range fs {
		out[i] = f.LeftKey + " " + f.Category + " " + string(f.Verdict)
	}
	return out
}

func TestDiff(t *testing.T) {
	loop := []string{"0200"}
	at7 := func(declared string, maxUse, loopRepeat int) Requirement {
		r := req("AT7", "140", "", loop, nil)
		r.Usage.Declared, r.MaxUse, r.LoopRepeat = declared, maxUse, loopRepeat
		return r
	}
	all := func(r Requirement, total int) Requirement {
		r.Codes = &Codes{Mode: "all_standard", StandardTotal: total}
		return r
	}
	ref := func(r Requirement, element string) Requirement {
		r.Codes = &Codes{Mode: "reference", Ref: element}
		return r
	}
	unstated := func(r Requirement) Requirement {
		r.Usage = Usage{Declared: "unknown"}
		return r
	}
	ms1 := req("MS1", "143", "", loop, nil)
	ms1.Conditions = []Condition{{Kind: "syntax", Text: "If MS101 is present, then MS102 is required"}}

	l := Guide{Meta: Meta{ID: "l"}, Requirements: []Requirement{
		at7("required", 1, 1),
		all(req("AT7", "140", "AT701", loop, nil), 2),
		withCodes(req("AT7", "140", "AT702", loop, nil), "X", "Y"),
		ref(req("AT7", "140", "AT704", loop, nil), "AT702"),
		withCodes(req("AT7", "140", "AT707", loop, nil), "LT"),
		ms1,
		req("K1", "170", "", loop, nil),
	}}
	r := Guide{Meta: Meta{ID: "r"}, Requirements: []Requirement{
		at7("optional", 1, 10),
		withCodes(req("AT7", "140", "AT701", loop, nil), "B", "A"),
		withCodes(req("AT7", "140", "AT702", loop, nil), "X", "Y"),
		withCodes(req("AT7", "140", "AT704", loop, nil), "Y", "X"),
		withCodes(req("AT7", "140", "AT707", loop, nil), "ET", "CT"),
		unstated(req("MS1", "143", "", loop, nil)),
		unstated(req("MS1", "143", "MS101", loop, nil)),
	}}

	rep := Diff(l, r, Qualifier)
	want := []string{
		"0200:AT7@140 usage different",
		"0200:AT7@140 repetition different",
		"0200:AT7@140/AT701 usage same",
		"0200:AT7@140/AT701 codes same",
		"0200:AT7@140/AT702 usage same",
		"0200:AT7@140/AT702 codes same",
		"0200:AT7@140/AT704 usage same",
		"0200:AT7@140/AT704 codes same",
		"0200:AT7@140/AT707 usage same",
		"0200:AT7@140/AT707 codes different",
		"0200:MS1@143 usage one_side",
		"0200:MS1@143 condition one_side",
	}
	if got := summary(rep.Findings); !slices.Equal(got, want) {
		t.Fatalf("findings = %q, want %q", got, want)
	}
	byKey := map[string]Finding{}
	for _, f := range rep.Findings {
		byKey[f.LeftKey+" "+f.Category] = f
	}
	if d := byKey["0200:AT7@140 repetition"].Detail; d != "loop repeat 1 vs 10" {
		t.Fatalf("repetition detail = %q", d)
	}
	if d := byKey["0200:AT7@140/AT707 codes"].Detail; d != "only in l: LT; only in r: CT, ET" {
		t.Fatalf("codes detail = %q", d)
	}
	if s := byKey["0200:AT7@140/AT704 codes"].Left; s != "as AT702: X, Y" {
		t.Fatalf("reference text = %q", s)
	}
	if d := byKey["0200:MS1@143 usage"].Detail; d != "not stated in r" {
		t.Fatalf("usage detail = %q", d)
	}
	if got := rep.LeftOnly; len(got) != 1 || got[0].Key != "0200:K1@170" || !slices.Equal(got[0].Pages, []int{1}) {
		t.Fatalf("left only = %+v", got)
	}
	if got := rep.RightOnly; len(got) != 1 || got[0].Key != "0200:MS1@143/MS101" {
		t.Fatalf("right only = %+v", got)
	}
}

func TestDiffQualifierScope(t *testing.T) {
	split, single := stopGuides()
	split.Requirements[1].MaxUse, single.Requirements[1].MaxUse = 1, 300
	for _, f := range Diff(split, single, Qualifier).Findings {
		if f.LeftKey == "0200:L11@150[QN]" && f.Category == "repetition" {
			if f.Verdict != NeedsReview {
				t.Fatalf("qualifier-aligned repetition = %s, want review", f.Verdict)
			}
			return
		}
	}
	t.Fatal("no repetition finding for the qualifier-aligned pair")
}

func TestDiffAllStandardAgainstShortList(t *testing.T) {
	loop := []string{"0200"}
	l := Guide{Meta: Meta{ID: "l"}, Requirements: []Requirement{req("AT7", "140", "AT707", loop, nil)}}
	r := Guide{Meta: Meta{ID: "r"}, Requirements: []Requirement{withCodes(req("AT7", "140", "AT707", loop, nil), "LT")}}
	l.Requirements[0].Codes = &Codes{Mode: "all_standard", StandardTotal: 51}
	f := Diff(l, r, Exact).Findings[1]
	if f.Verdict != Different || f.Detail != "r lists 1 code, l allows all standard codes" {
		t.Fatalf("finding = %+v", f)
	}
}

func TestDiffCorpus(t *testing.T) {
	paths, err := filepath.Glob("../../../corpus/214-004010/guides/*.json")
	if err != nil {
		t.Fatal(err)
	}
	guides, err := LoadAll(paths)
	if err != nil {
		t.Fatal(err)
	}
	verdict := map[string]Verdict{}
	for _, rep := range DiffAll(guides, Qualifier) {
		for _, f := range rep.Findings {
			verdict[rep.Left+" "+rep.Right+" "+f.LeftKey+" "+f.Category] = f.Verdict
		}
	}
	for k, want := range map[string]Verdict{
		"chr-214 kbx-214 0200/0205:AT7@140/AT707 codes":    Same,
		"chr-214 domtar-214 0200/0205:AT7@140/AT707 codes": Different,
		"domtar-214 kbx-214 0200/0205:AT7@140/AT704 codes": Different,
		"chr-214 kbx-214 0200/0205:AT7@140 repetition":     Different,
		"chr-214 kbx-214 0200:L11@150[QN] repetition":      NeedsReview,
		"chr-214 domtar-214 0200/0205:AT7@140/AT707 usage": OneSide,
		"chr-214 kbx-214 0200/0205:AT7@140/AT706 usage":    Different,
	} {
		if got, ok := verdict[k]; !ok || got != want {
			t.Errorf("%s = %q, want %q", k, got, want)
		}
	}
}

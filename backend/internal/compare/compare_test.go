package compare

import (
	"path/filepath"
	"slices"
	"testing"
)

func req(segment, position, element string, loop []string, qualifier []string) Requirement {
	return Requirement{
		Key:      Key{Segment: segment, Position: position, Loop: loop, Element: element, Qualifier: qualifier},
		Usage:    Usage{Declared: "required", DeclaredLabel: "M"},
		Evidence: []Evidence{{Page: 1, Excerpt: segment}},
	}
}

func withCodes(r Requirement, values ...string) Requirement {
	r.Codes = &Codes{Mode: "enumerated", Values: values}
	return r
}

func ids(rs []Requirement) []string {
	out := make([]string, len(rs))
	for i, r := range rs {
		out[i] = r.Key.ID()
	}
	return out
}

func stopGuides() (Guide, Guide) {
	loop := []string{"0200"}
	split := Guide{Meta: Meta{ID: "split"}, Requirements: []Requirement{
		req("LX", "130", "", loop, nil),
		req("L11", "150", "", loop, []string{"QN"}),
		withCodes(req("L11", "150", "L1102", loop, []string{"QN"}), "QN"),
		req("L11", "150", "", loop, []string{"LK", "LQ"}),
	}}
	single := Guide{Meta: Meta{ID: "single"}, Requirements: []Requirement{
		req("LX", "130", "", loop, nil),
		req("L11", "150", "", loop, nil),
		withCodes(req("L11", "150", "L1102", loop, nil), "PO", "QN", "VN"),
		req("K1", "170", "", loop, nil),
	}}
	return split, single
}

func TestKeyID(t *testing.T) {
	k := Key{Segment: "L11", Position: "150", Loop: []string{"0200"}, Element: "L1102", Qualifier: []string{"LQ", "LK"}}
	if got, want := k.ID(), "0200:L11@150[LK,LQ]/L1102"; got != want {
		t.Fatalf("ID = %s, want %s", got, want)
	}
}

func TestAlign(t *testing.T) {
	l, r := stopGuides()

	exact := Align(l, r, Exact)
	if len(exact.Pairs) != 1 {
		t.Fatalf("exact pairs = %d, want 1 (LX only)", len(exact.Pairs))
	}
	if got := len(exact.LeftOnly); got != 3 {
		t.Fatalf("exact left only = %d, want 3", got)
	}

	q := Align(l, r, Qualifier)
	var pairs []string
	for _, p := range q.Pairs {
		pairs = append(pairs, p.Left.Key.ID()+" = "+p.Right.Key.ID()+" ("+string(p.Rule)+")")
	}
	want := []string{
		"0200:LX@130 = 0200:LX@130 (exact)",
		"0200:L11@150[QN] = 0200:L11@150 (qualifier)",
		"0200:L11@150[QN]/L1102 = 0200:L11@150/L1102 (qualifier)",
	}
	if !slices.Equal(pairs, want) {
		t.Fatalf("pairs = %q, want %q", pairs, want)
	}
	if got := ids(q.LeftOnly); !slices.Equal(got, []string{"0200:L11@150[LK,LQ]"}) {
		t.Fatalf("left only = %q", got)
	}
	if got := ids(q.RightOnly); !slices.Equal(got, []string{"0200:K1@170"}) {
		t.Fatalf("right only = %q", got)
	}
}

func TestCheckEvidence(t *testing.T) {
	g := Guide{Requirements: []Requirement{{
		Key:      Key{Segment: "AT7", Position: "140"},
		Evidence: []Evidence{{Page: 2, Excerpt: "AT707   623 Time Code / LT Local Time"}},
	}}}
	pages := []string{"LT Local Time", "AT707 623\tTime Code\n  ID 2/2"}
	misses := CheckEvidence(g, pages)
	if len(misses) != 1 || misses[0].Fragment != "LT Local Time" || !slices.Equal(misses[0].FoundOn, []int{1}) {
		t.Fatalf("misses = %+v", misses)
	}
}

func TestCorpus(t *testing.T) {
	paths, err := filepath.Glob("../../../corpus/214-004010/guides/*.json")
	if err != nil || len(paths) == 0 {
		t.Fatalf("corpus not found: %v", err)
	}
	if _, err := LoadAll(paths); err != nil {
		t.Fatal(err)
	}
}

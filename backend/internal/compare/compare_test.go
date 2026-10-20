package compare

import (
	"bytes"
	"fmt"
	"math"
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

func TestUnits(t *testing.T) {
	l, r := stopGuides()
	l.Requirements[0].MaxUse, r.Requirements[0].MaxUse, r.Requirements[0].LoopRepeat = 1, 1, 999999
	r.Requirements[0].Conditions = []Condition{{Kind: "context", Text: "Truckload only"}}

	units := Units([]Alignment{Align(l, r, Qualifier)})
	var got []string
	for _, u := range units {
		got = append(got, u.ID+" "+u.LeftKey+" "+u.Category)
	}
	want := []string{
		"U001 0200:LX@130 usage",
		"U002 0200:LX@130 repetition",
		"U003 0200:LX@130 condition",
		"U004 0200:L11@150[QN] usage",
		"U005 0200:L11@150[QN] repetition",
		"U006 0200:L11@150[QN]/L1102 usage",
		"U007 0200:L11@150[QN]/L1102 codes",
	}
	if !slices.Equal(got, want) {
		t.Fatalf("units = %q, want %q", got, want)
	}
	if units[1].Right != "max use 1; loop 0200 repeat 999999" {
		t.Fatalf("repetition text = %q", units[1].Right)
	}
	if units[2].Left != "no conditions stated" || units[2].Right != "[context] Truckload only" {
		t.Fatalf("condition texts = %q / %q", units[2].Left, units[2].Right)
	}
	if units[6].Right != "only PO, QN, VN (3 codes)" {
		t.Fatalf("codes text = %q", units[6].Right)
	}

	var buf bytes.Buffer
	if err := WriteSheet(&buf, units); err != nil {
		t.Fatal(err)
	}
	back, err := ReadSheet(&buf)
	if err != nil {
		t.Fatal(err)
	}
	if !slices.Equal(back, units) {
		t.Fatal("sheet does not round-trip")
	}
}

func labelled(labels ...string) []Unit {
	units := make([]Unit, len(labels))
	for i, l := range labels {
		units[i] = Unit{ID: string(rune('A' + i)), Category: "usage", Label: l}
	}
	return units
}

func TestKappa(t *testing.T) {
	var a, b []string
	add := func(n int, x, y string) {
		for range n {
			a, b = append(a, x), append(b, y)
		}
	}
	add(20, "same", "same")
	add(5, "same", "different")
	add(10, "different", "same")
	add(15, "different", "different")

	stats, dis, err := Compare(labelled(a...), labelled(b...), 200, 1)
	if err != nil {
		t.Fatal(err)
	}
	s := stats[0]
	if s.N != 50 || s.Agreed != 35 || math.Abs(s.Po-0.7) > 1e-9 || math.Abs(s.Pe-0.5) > 1e-9 || math.Abs(s.Kappa-0.4) > 1e-9 {
		t.Fatalf("stats = %+v, want n 50, po 0.7, pe 0.5, kappa 0.4", s)
	}
	if !(s.Low < s.Kappa && s.Kappa < s.High) {
		t.Fatalf("interval [%f, %f] does not contain %f", s.Low, s.High, s.Kappa)
	}
	if len(dis) != 15 {
		t.Fatalf("disagreements = %d, want 15", len(dis))
	}
}

func TestKappaUndefined(t *testing.T) {
	stats, _, err := Compare(labelled("same", "same"), labelled("same", "same"), 10, 1)
	if err != nil {
		t.Fatal(err)
	}
	if s := stats[0]; s.Po != 1 || !math.IsNaN(s.Kappa) {
		t.Fatalf("stats = %+v, want po 1 and undefined kappa", s)
	}
}

func TestStatedSubset(t *testing.T) {
	a, b := labelled("unknown", "same"), labelled("unknown", "different")
	a[0].Left, b[0].Left = "usage not stated", "usage not stated"
	stats, _, err := Compare(a, b, 10, 1)
	if err != nil {
		t.Fatal(err)
	}
	var got []string
	for _, s := range stats {
		got = append(got, fmt.Sprintf("%s %v n=%d agreed=%d", s.Category, s.Stated, s.N, s.Agreed))
	}
	want := []string{"usage false n=2 agreed=1", "usage true n=1 agreed=0", "all false n=2 agreed=1", "all true n=1 agreed=0"}
	if !slices.Equal(got, want) {
		t.Fatalf("stats = %q, want %q", got, want)
	}
}

func TestCompareRejectsChangedSheet(t *testing.T) {
	a, b := labelled("same"), labelled("same")
	b[0].Right = "edited"
	if _, _, err := Compare(a, b, 10, 1); err == nil {
		t.Fatal("want error for differing unit content")
	}
	if _, _, err := Compare(labelled(""), labelled("same"), 10, 1); err == nil {
		t.Fatal("want error for missing label")
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

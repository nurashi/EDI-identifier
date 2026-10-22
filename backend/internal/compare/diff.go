package compare

import (
	"fmt"
	"slices"
	"strings"
)

type Verdict string

const (
	Same        Verdict = "same"
	Different   Verdict = "different"
	OneSide     Verdict = "one_side"
	NeedsReview Verdict = "review"
)

var (
	Verdicts       = []Verdict{Same, Different, OneSide, NeedsReview}
	DiffCategories = []string{"usage", "codes", "repetition", "condition"}
)

type Finding struct {
	LeftKey    string  `json:"left_key"`
	RightKey   string  `json:"right_key"`
	Alignment  Rule    `json:"alignment"`
	Category   string  `json:"category"`
	Verdict    Verdict `json:"verdict"`
	Left       string  `json:"left"`
	Right      string  `json:"right"`
	Detail     string  `json:"detail,omitempty"`
	LeftPages  []int   `json:"left_pages"`
	RightPages []int   `json:"right_pages"`
}

type Absent struct {
	Key   string `json:"key"`
	Pages []int  `json:"pages"`
}

type Report struct {
	Left      string    `json:"left"`
	Right     string    `json:"right"`
	Findings  []Finding `json:"findings"`
	LeftOnly  []Absent  `json:"left_only"`
	RightOnly []Absent  `json:"right_only"`
}

func Diff(l, r Guide, rule Rule) Report {
	a := Align(l, r, rule)
	rep := Report{Left: a.Left, Right: a.Right, Findings: []Finding{}}
	for _, p := range a.Pairs {
		base := Finding{
			LeftKey:    p.Left.Key.ID(),
			RightKey:   p.Right.Key.ID(),
			Alignment:  p.Rule,
			LeftPages:  p.Left.pages(),
			RightPages: p.Right.pages(),
		}
		checks := []func() (Finding, bool){
			func() (Finding, bool) { return diffUsage(base, l.Meta.ID, r.Meta.ID, p) },
			func() (Finding, bool) { return diffCodes(base, l, r, p) },
			func() (Finding, bool) { return diffRepetition(base, l.Meta.ID, r.Meta.ID, p) },
			func() (Finding, bool) { return diffConditions(base, l.Meta.ID, r.Meta.ID, p) },
		}
		for _, check := range checks {
			if f, ok := check(); ok {
				rep.Findings = append(rep.Findings, f)
			}
		}
	}
	rep.LeftOnly = absent(a.LeftOnly)
	rep.RightOnly = absent(a.RightOnly)
	return rep
}

func DiffAll(guides []Guide, rule Rule) []Report {
	var out []Report
	for i := range guides {
		for j := i + 1; j < len(guides); j++ {
			out = append(out, Diff(guides[i], guides[j], rule))
		}
	}
	return out
}

func absent(rs []Requirement) []Absent {
	out := make([]Absent, len(rs))
	for i, r := range rs {
		out[i] = Absent{Key: r.Key.ID(), Pages: r.pages()}
	}
	return out
}

func notStatedIn(id string) string {
	return "not stated in " + id
}

func diffUsage(f Finding, lid, rid string, p Pair) (Finding, bool) {
	f.Category = "usage"
	lu, ru := p.Left.Usage, p.Right.Usage
	ls, rs := lu.Declared != "unknown", ru.Declared != "unknown"
	f.Left, f.Right = usageText(lu), usageText(ru)
	switch {
	case !ls && !rs:
		return f, false
	case !ls:
		f.Verdict, f.Detail = OneSide, notStatedIn(lid)
	case !rs:
		f.Verdict, f.Detail = OneSide, notStatedIn(rid)
	case lu.Declared == ru.Declared:
		f.Verdict = Same
	default:
		f.Verdict = Different
	}
	return f, true
}

func usageText(u Usage) string {
	if u.Declared == "unknown" {
		return "not stated"
	}
	s := strings.ReplaceAll(u.Declared, "_", " ")
	if u.DeclaredLabel != "" {
		s += fmt.Sprintf(" (%q)", u.DeclaredLabel)
	}
	return s
}

type codeSet struct {
	stated bool
	all    bool
	total  int
	values []string
	text   string
}

func resolveCodes(g Guide, r Requirement) codeSet {
	c := r.Codes
	if c == nil || c.Mode == "unspecified" {
		return codeSet{text: "not stated"}
	}
	switch c.Mode {
	case "all_standard":
		s := codeSet{stated: true, all: true, total: c.StandardTotal, text: "all standard codes"}
		if c.StandardTotal > 0 {
			s.text += fmt.Sprintf(" (%d)", c.StandardTotal)
		}
		return s
	case "reference":
		want := r.Key
		want.Element = c.Ref
		for _, o := range g.Requirements {
			if o.Key.ID() == want.ID() && o.Codes != nil && o.Codes.Mode != "reference" {
				s := resolveCodes(g, o)
				s.text = "as " + c.Ref + ": " + s.text
				return s
			}
		}
		return codeSet{text: "as " + c.Ref + ", which the guide does not list"}
	}
	vs := slices.Clone(c.Values)
	slices.Sort(vs)
	return codeSet{stated: true, values: vs, text: codeList(vs)}
}

func codeList(vs []string) string {
	const shown = 8
	if len(vs) <= shown {
		return strings.Join(vs, ", ")
	}
	return fmt.Sprintf("%s and %d more (%d codes)", strings.Join(vs[:shown], ", "), len(vs)-shown, len(vs))
}

func diffCodes(f Finding, l, r Guide, p Pair) (Finding, bool) {
	f.Category = "codes"
	if p.Left.Codes == nil && p.Right.Codes == nil {
		return f, false
	}
	lc, rc := resolveCodes(l, p.Left), resolveCodes(r, p.Right)
	f.Left, f.Right = lc.text, rc.text
	lid, rid := l.Meta.ID, r.Meta.ID
	switch {
	case !lc.stated && !rc.stated:
		return f, false
	case !lc.stated:
		f.Verdict, f.Detail = OneSide, notStatedIn(lid)
	case !rc.stated:
		f.Verdict, f.Detail = OneSide, notStatedIn(rid)
	case lc.all && rc.all:
		f.Verdict = Same
	case lc.all || rc.all:
		all, list, allID, listID := lc, rc, lid, rid
		if rc.all {
			all, list, allID, listID = rc, lc, rid, lid
		}
		if all.total > 0 && len(list.values) == all.total {
			f.Verdict = Same
		} else {
			f.Verdict = Different
			f.Detail = fmt.Sprintf("%s lists %s, %s allows all standard codes", listID, codeCount(len(list.values)), allID)
		}
	case slices.Equal(lc.values, rc.values):
		f.Verdict = Same
	default:
		f.Verdict = Different
		f.Detail = setDetail(lid, rid, lc.values, rc.values)
	}
	return f, true
}

func codeCount(n int) string {
	if n == 1 {
		return "1 code"
	}
	return fmt.Sprintf("%d codes", n)
}

func setDetail(lid, rid string, l, r []string) string {
	var onlyL, onlyR []string
	for _, v := range l {
		if !slices.Contains(r, v) {
			onlyL = append(onlyL, v)
		}
	}
	for _, v := range r {
		if !slices.Contains(l, v) {
			onlyR = append(onlyR, v)
		}
	}
	var parts []string
	if len(onlyL) > 0 {
		parts = append(parts, "only in "+lid+": "+codeList(onlyL))
	}
	if len(onlyR) > 0 {
		parts = append(parts, "only in "+rid+": "+codeList(onlyR))
	}
	return strings.Join(parts, "; ")
}

func diffRepetition(f Finding, lid, rid string, p Pair) (Finding, bool) {
	f.Category = "repetition"
	if p.Left.Key.Element != "" {
		return f, false
	}
	l, r := p.Left, p.Right
	f.Left, f.Right = repetitionText(l), repetitionText(r)
	if l.MaxUse == 0 && r.MaxUse == 0 && l.LoopRepeat == 0 && r.LoopRepeat == 0 {
		return f, false
	}
	if p.Rule == Qualifier {
		f.Verdict, f.Detail = NeedsReview, "the definitions cover different qualifiers"
		return f, true
	}
	var diffs, missing []string
	for _, n := range []struct {
		name string
		l, r int
	}{{"max use", l.MaxUse, r.MaxUse}, {"loop repeat", l.LoopRepeat, r.LoopRepeat}} {
		switch {
		case n.l == 0 && n.r == 0:
		case n.l == 0:
			missing = append(missing, n.name+" "+notStatedIn(lid))
		case n.r == 0:
			missing = append(missing, n.name+" "+notStatedIn(rid))
		case n.l != n.r:
			diffs = append(diffs, fmt.Sprintf("%s %d vs %d", n.name, n.l, n.r))
		}
	}
	switch {
	case len(diffs) > 0:
		f.Verdict, f.Detail = Different, strings.Join(append(diffs, missing...), "; ")
	case len(missing) > 0:
		f.Verdict, f.Detail = OneSide, strings.Join(missing, "; ")
	default:
		f.Verdict = Same
	}
	return f, true
}

func repetitionText(r Requirement) string {
	var parts []string
	if r.MaxUse > 0 {
		parts = append(parts, fmt.Sprintf("max use %d", r.MaxUse))
	}
	if r.LoopRepeat > 0 {
		parts = append(parts, fmt.Sprintf("loop repeat %d", r.LoopRepeat))
	}
	if len(parts) == 0 {
		return "not stated"
	}
	return strings.Join(parts, "; ")
}

func diffConditions(f Finding, lid, rid string, p Pair) (Finding, bool) {
	f.Category = "condition"
	l, r := conditionSet(p.Left), conditionSet(p.Right)
	f.Left, f.Right = conditionText(p.Left), conditionText(p.Right)
	switch {
	case len(l) == 0 && len(r) == 0:
		return f, false
	case len(l) == 0:
		f.Verdict, f.Detail = OneSide, notStatedIn(lid)
	case len(r) == 0:
		f.Verdict, f.Detail = OneSide, notStatedIn(rid)
	case slices.Equal(l, r):
		f.Verdict = Same
	default:
		f.Verdict, f.Detail = NeedsReview, fmt.Sprintf("%d vs %d conditions in free text", len(l), len(r))
	}
	return f, true
}

func conditionSet(r Requirement) []string {
	out := make([]string, 0, len(r.Conditions))
	for _, c := range r.Conditions {
		out = append(out, c.Kind+": "+strings.ToLower(squash(c.Text)))
	}
	slices.Sort(out)
	return slices.Compact(out)
}

func conditionText(r Requirement) string {
	if len(r.Conditions) == 0 {
		return "not stated"
	}
	parts := make([]string, len(r.Conditions))
	for i, c := range r.Conditions {
		parts[i] = "[" + c.Kind + "] " + c.Text
	}
	return strings.Join(parts, " | ")
}

package compare

import "slices"

type Rule string

const (
	Exact     Rule = "exact"
	Qualifier Rule = "qualifier"
)

var qualifierElement = map[string]string{"L11": "02", "N1": "01", "N9": "01"}

type Pair struct {
	Left, Right Requirement
	Rule        Rule
}

type Alignment struct {
	Left, Right string
	Pairs       []Pair
	LeftOnly    []Requirement
	RightOnly   []Requirement
}

func Align(l, r Guide, rule Rule) Alignment {
	a := Alignment{Left: l.Meta.ID, Right: r.Meta.ID}
	byID := make(map[string]int, len(r.Requirements))
	for i, req := range r.Requirements {
		byID[req.Key.ID()] = i
	}
	exact := make([]bool, len(r.Requirements))
	var pending []Requirement
	for _, req := range l.Requirements {
		if j, ok := byID[req.Key.ID()]; ok {
			a.Pairs = append(a.Pairs, Pair{Left: req, Right: r.Requirements[j], Rule: Exact})
			exact[j] = true
		} else {
			pending = append(pending, req)
		}
	}

	matched := slices.Clone(exact)
	for _, req := range pending {
		found := false
		if rule == Qualifier {
			for j, cand := range r.Requirements {
				if exact[j] || cand.Key.base().ID() != req.Key.base().ID() {
					continue
				}
				if intersects(qualifiers(l, req), qualifiers(r, cand)) {
					a.Pairs = append(a.Pairs, Pair{Left: req, Right: cand, Rule: Qualifier})
					matched[j] = true
					found = true
				}
			}
		}
		if !found {
			a.LeftOnly = append(a.LeftOnly, req)
		}
	}
	for j, req := range r.Requirements {
		if !matched[j] {
			a.RightOnly = append(a.RightOnly, req)
		}
	}

	slices.SortStableFunc(a.Pairs, func(x, y Pair) int {
		return cmpChain(x.Left.Key.less(y.Left.Key), x.Right.Key.less(y.Right.Key))
	})
	byKey := func(x, y Requirement) int { return x.Key.less(y.Key) }
	slices.SortStableFunc(a.LeftOnly, byKey)
	slices.SortStableFunc(a.RightOnly, byKey)
	return a
}

func AlignAll(guides []Guide, rule Rule) []Alignment {
	var out []Alignment
	for i := range guides {
		for j := i + 1; j < len(guides); j++ {
			out = append(out, Align(guides[i], guides[j], rule))
		}
	}
	return out
}

func qualifiers(g Guide, req Requirement) []string {
	if len(req.Key.Qualifier) > 0 {
		return req.Key.Qualifier
	}
	suffix, ok := qualifierElement[req.Key.Segment]
	if !ok {
		return nil
	}
	want := Key{Segment: req.Key.Segment, Position: req.Key.Position, Loop: req.Key.Loop, Element: req.Key.Segment + suffix}.ID()
	for _, r := range g.Requirements {
		if r.Key.ID() == want && r.Codes != nil && r.Codes.Mode == "enumerated" {
			return r.Codes.Values
		}
	}
	return nil
}

func intersects(a, b []string) bool {
	for _, v := range a {
		if slices.Contains(b, v) {
			return true
		}
	}
	return false
}

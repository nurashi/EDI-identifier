package compare

import (
	"fmt"
	"math"
	"math/rand/v2"
	"slices"
)

type Stats struct {
	Category string
	Stated   bool
	N        int
	Agreed   int
	Po       float64
	Pe       float64
	Kappa    float64
	Low      float64
	High     float64
	Matrix   [3][3]int
}

type Disagreement struct {
	Unit   Unit
	LabelB string
	NoteB  string
}

func Compare(a, b []Unit, iterations int, seed uint64) ([]Stats, []Disagreement, error) {
	if len(a) != len(b) {
		return nil, nil, fmt.Errorf("sheets have %d and %d units", len(a), len(b))
	}
	type group struct {
		category string
		stated   bool
	}
	byGroup := map[group][2][]int{}
	var disagreements []Disagreement
	for i := range a {
		x, y := a[i], b[i]
		if !sameContent(x, y) {
			return nil, nil, fmt.Errorf("unit %s differs between sheets", x.ID)
		}
		lx, ly := slices.Index(Labels, x.Label), slices.Index(Labels, y.Label)
		if lx < 0 || ly < 0 {
			return nil, nil, fmt.Errorf("unit %s: labels %q and %q, want one of %v", x.ID, x.Label, y.Label, Labels)
		}
		for _, c := range []string{x.Category, "all"} {
			gs := []group{{c, false}}
			if x.Stated() {
				gs = append(gs, group{c, true})
			}
			for _, g := range gs {
				pair := byGroup[g]
				pair[0], pair[1] = append(pair[0], lx), append(pair[1], ly)
				byGroup[g] = pair
			}
		}
		if lx != ly {
			disagreements = append(disagreements, Disagreement{Unit: x, LabelB: y.Label, NoteB: y.Note})
		}
	}

	var stats []Stats
	for _, c := range append(slices.Clone(Categories), "all") {
		for _, st := range []bool{false, true} {
			pair, ok := byGroup[group{c, st}]
			if !ok {
				continue
			}
			s := agreement(pair[0], pair[1])
			s.Category, s.Stated = c, st
			s.Low, s.High = bootstrap(pair[0], pair[1], iterations, seed)
			stats = append(stats, s)
		}
	}
	return stats, disagreements, nil
}

func sameContent(x, y Unit) bool {
	x.Label, x.Note, y.Label, y.Note = "", "", "", ""
	return x == y
}

func agreement(a, b []int) Stats {
	s := Stats{N: len(a)}
	for i := range a {
		s.Matrix[a[i]][b[i]]++
		if a[i] == b[i] {
			s.Agreed++
		}
	}
	s.Po, s.Pe, s.Kappa = kappa(s.Matrix, s.N)
	return s
}

func kappa(m [3][3]int, n int) (po, pe, k float64) {
	if n == 0 {
		return math.NaN(), math.NaN(), math.NaN()
	}
	total := float64(n)
	for i := range 3 {
		var row, col int
		for j := range 3 {
			row += m[i][j]
			col += m[j][i]
		}
		po += float64(m[i][i]) / total
		pe += float64(row) / total * float64(col) / total
	}
	if pe >= 1 {
		return po, pe, math.NaN()
	}
	return po, pe, (po - pe) / (1 - pe)
}

func bootstrap(a, b []int, iterations int, seed uint64) (low, high float64) {
	rng := rand.New(rand.NewPCG(seed, seed))
	ks := make([]float64, 0, iterations)
	for range iterations {
		var m [3][3]int
		for range a {
			i := rng.IntN(len(a))
			m[a[i]][b[i]]++
		}
		if _, _, k := kappa(m, len(a)); !math.IsNaN(k) {
			ks = append(ks, k)
		}
	}
	if len(ks) == 0 {
		return math.NaN(), math.NaN()
	}
	slices.Sort(ks)
	return ks[int(0.025*float64(len(ks)-1))], ks[int(math.Ceil(0.975*float64(len(ks)-1)))]
}

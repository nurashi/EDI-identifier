package compare

import (
	"encoding/csv"
	"errors"
	"fmt"
	"io"
	"slices"
	"strconv"
	"strings"
)

var Categories = []string{"usage", "codes", "repetition", "condition"}

var Labels = []string{"same", "different", "unknown"}

var sheetHeader = []string{
	"unit", "left_guide", "right_guide", "alignment", "left_key", "right_key", "category",
	"left", "left_pages", "right", "right_pages", "label", "note",
}

type Unit struct {
	ID         string
	LeftGuide  string
	RightGuide string
	Alignment  string
	LeftKey    string
	RightKey   string
	Category   string
	Left       string
	LeftPages  string
	Right      string
	RightPages string
	Label      string
	Note       string
}

func Units(alignments []Alignment) []Unit {
	var units []Unit
	for _, a := range alignments {
		for _, p := range a.Pairs {
			for _, c := range Categories {
				if !applies(c, p) {
					continue
				}
				units = append(units, Unit{
					LeftGuide:  a.Left,
					RightGuide: a.Right,
					Alignment:  string(p.Rule),
					LeftKey:    p.Left.Key.ID(),
					RightKey:   p.Right.Key.ID(),
					Category:   c,
					Left:       describe(c, p.Left),
					LeftPages:  pageList(p.Left.pages()),
					Right:      describe(c, p.Right),
					RightPages: pageList(p.Right.pages()),
				})
			}
		}
	}
	for i := range units {
		units[i].ID = fmt.Sprintf("U%03d", i+1)
	}
	return units
}

func applies(category string, p Pair) bool {
	switch category {
	case "usage":
		return true
	case "codes":
		return listed(p.Left.Codes) || listed(p.Right.Codes)
	case "repetition":
		return p.Left.Key.Element == "" && p.Right.Key.Element == ""
	case "condition":
		return len(p.Left.Conditions) > 0 || len(p.Right.Conditions) > 0
	}
	return false
}

func listed(c *Codes) bool {
	return c != nil && c.Mode != "unspecified"
}

func describe(category string, r Requirement) string {
	switch category {
	case "usage":
		var parts []string
		if r.Usage.Base != "" {
			parts = append(parts, "base "+r.Usage.Base)
		}
		if r.Usage.DeclaredLabel != "" {
			parts = append(parts, strconv.Quote(r.Usage.DeclaredLabel))
		}
		if len(parts) == 0 {
			return "usage not stated"
		}
		return strings.Join(parts, "; ")
	case "codes":
		return describeCodes(r.Codes)
	case "repetition":
		s := "max use not stated"
		if r.MaxUse > 0 {
			s = fmt.Sprintf("max use %d", r.MaxUse)
		}
		if r.LoopRepeat > 0 {
			s += fmt.Sprintf("; loop %s repeat %d", r.Key.Loop[len(r.Key.Loop)-1], r.LoopRepeat)
		}
		return s
	case "condition":
		if len(r.Conditions) == 0 {
			return "no conditions stated"
		}
		parts := make([]string, len(r.Conditions))
		for i, c := range r.Conditions {
			parts[i] = "[" + c.Kind + "] " + c.Text
		}
		return strings.Join(parts, " | ")
	}
	return ""
}

func describeCodes(c *Codes) string {
	if c == nil {
		return "no code list"
	}
	switch c.Mode {
	case "enumerated":
		v := slices.Clone(c.Values)
		slices.Sort(v)
		s := "only " + strings.Join(v, ", ")
		if c.StandardTotal > 0 {
			return s + fmt.Sprintf(" (%d of %d standard codes)", len(v), c.StandardTotal)
		}
		if len(v) == 1 {
			return s + " (1 code)"
		}
		return s + fmt.Sprintf(" (%d codes)", len(v))
	case "all_standard":
		if c.StandardTotal > 0 {
			return fmt.Sprintf("all standard codes (%d)", c.StandardTotal)
		}
		return "all standard codes"
	case "reference":
		return "same codes as " + c.Ref
	}
	return "no code list"
}

func pageList(ps []int) string {
	s := make([]string, len(ps))
	for i, p := range ps {
		s[i] = strconv.Itoa(p)
	}
	return strings.Join(s, ", ")
}

func WriteSheet(w io.Writer, units []Unit) error {
	cw := csv.NewWriter(w)
	if err := cw.Write(sheetHeader); err != nil {
		return err
	}
	for _, u := range units {
		row := []string{u.ID, u.LeftGuide, u.RightGuide, u.Alignment, u.LeftKey, u.RightKey, u.Category,
			u.Left, u.LeftPages, u.Right, u.RightPages, u.Label, u.Note}
		if err := cw.Write(row); err != nil {
			return err
		}
	}
	cw.Flush()
	return cw.Error()
}

func ReadSheet(r io.Reader) ([]Unit, error) {
	rows, err := csv.NewReader(r).ReadAll()
	if err != nil {
		return nil, err
	}
	if len(rows) == 0 || !slices.Equal(rows[0], sheetHeader) {
		return nil, errors.New("unexpected sheet header")
	}
	units := make([]Unit, 0, len(rows)-1)
	for _, row := range rows[1:] {
		units = append(units, Unit{
			ID: row[0], LeftGuide: row[1], RightGuide: row[2], Alignment: row[3], LeftKey: row[4], RightKey: row[5],
			Category: row[6], Left: row[7], LeftPages: row[8], Right: row[9], RightPages: row[10],
			Label: strings.ToLower(strings.TrimSpace(row[11])), Note: row[12],
		})
	}
	return units, nil
}

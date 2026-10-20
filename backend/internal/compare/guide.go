package compare

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"slices"
	"strings"
)

type Guide struct {
	Meta         Meta          `json:"guide"`
	Requirements []Requirement `json:"requirements"`
}

type Meta struct {
	ID             string   `json:"id"`
	Partner        string   `json:"partner"`
	PartnerRole    string   `json:"partner_role"`
	TransactionSet string   `json:"transaction_set"`
	Version        string   `json:"version"`
	Modes          []string `json:"modes,omitempty"`
	Revision       string   `json:"revision,omitempty"`
	RevisionDate   string   `json:"revision_date,omitempty"`
	Source         Source   `json:"source"`
}

type Source struct {
	URL       string `json:"url"`
	SHA256    string `json:"sha256"`
	Retrieved string `json:"retrieved"`
	Pages     int    `json:"pages"`
}

type Requirement struct {
	Key        Key         `json:"key"`
	Usage      Usage       `json:"usage"`
	MaxUse     int         `json:"max_use,omitempty"`
	LoopRepeat int         `json:"loop_repeat,omitempty"`
	Codes      *Codes      `json:"codes,omitempty"`
	Conditions []Condition `json:"conditions,omitempty"`
	Evidence   []Evidence  `json:"evidence"`
	Review     *Review     `json:"review,omitempty"`
}

type Key struct {
	Segment   string   `json:"segment"`
	Position  string   `json:"position"`
	Loop      []string `json:"loop,omitempty"`
	Element   string   `json:"element,omitempty"`
	Qualifier []string `json:"qualifier,omitempty"`
}

type Usage struct {
	Base          string `json:"base,omitempty"`
	Declared      string `json:"declared"`
	DeclaredLabel string `json:"declared_label,omitempty"`
}

type Codes struct {
	Mode          string   `json:"mode"`
	Values        []string `json:"values,omitempty"`
	Ref           string   `json:"ref,omitempty"`
	StandardTotal int      `json:"standard_total,omitempty"`
}

type Condition struct {
	Kind string `json:"kind"`
	Text string `json:"text"`
}

type Evidence struct {
	Page     int      `json:"page"`
	Excerpt  string   `json:"excerpt"`
	Supports []string `json:"supports,omitempty"`
}

type Review struct {
	Reason string `json:"reason"`
}

func (k Key) ID() string {
	var b strings.Builder
	if len(k.Loop) > 0 {
		b.WriteString(strings.Join(k.Loop, "/"))
		b.WriteByte(':')
	}
	b.WriteString(k.Segment + "@" + k.Position)
	if len(k.Qualifier) > 0 {
		q := slices.Clone(k.Qualifier)
		slices.Sort(q)
		b.WriteString("[" + strings.Join(q, ",") + "]")
	}
	if k.Element != "" {
		b.WriteString("/" + k.Element)
	}
	return b.String()
}

func (k Key) base() Key {
	return Key{Segment: k.Segment, Position: k.Position, Loop: k.Loop, Element: k.Element}
}

func (k Key) less(o Key) int {
	return cmpChain(
		strings.Compare(k.Position, o.Position),
		strings.Compare(k.Segment, o.Segment),
		strings.Compare(strings.Join(k.Qualifier, ","), strings.Join(o.Qualifier, ",")),
		strings.Compare(k.Element, o.Element),
	)
}

func cmpChain(cs ...int) int {
	for _, c := range cs {
		if c != 0 {
			return c
		}
	}
	return 0
}

func Load(path string) (Guide, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Guide{}, err
	}
	dec := json.NewDecoder(bytes.NewReader(data))
	dec.DisallowUnknownFields()
	var g Guide
	if err := dec.Decode(&g); err != nil {
		return Guide{}, fmt.Errorf("%s: %w", path, err)
	}
	if err := g.check(); err != nil {
		return Guide{}, fmt.Errorf("%s: %w", path, err)
	}
	return g, nil
}

func LoadAll(paths []string) ([]Guide, error) {
	guides := make([]Guide, 0, len(paths))
	for _, p := range paths {
		g, err := Load(p)
		if err != nil {
			return nil, err
		}
		guides = append(guides, g)
	}
	return guides, nil
}

func (g Guide) check() error {
	seen := make(map[string]bool, len(g.Requirements))
	for _, r := range g.Requirements {
		id := r.Key.ID()
		if seen[id] {
			return fmt.Errorf("duplicate key %s", id)
		}
		seen[id] = true
		if r.Key.Element != "" && !strings.HasPrefix(r.Key.Element, r.Key.Segment) {
			return fmt.Errorf("element %s does not belong to segment %s", r.Key.Element, r.Key.Segment)
		}
		for _, e := range r.Evidence {
			if e.Page > g.Meta.Source.Pages {
				return fmt.Errorf("%s cites page %d of %d", id, e.Page, g.Meta.Source.Pages)
			}
		}
	}
	return nil
}

func (r Requirement) pages() []int {
	var ps []int
	for _, e := range r.Evidence {
		if !slices.Contains(ps, e.Page) {
			ps = append(ps, e.Page)
		}
	}
	slices.Sort(ps)
	return ps
}

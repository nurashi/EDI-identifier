package main

import (
	"encoding/csv"
	"errors"
	"flag"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"strings"
	"text/tabwriter"

	"github.com/nurashi/EDI-identifier/backend/internal/compare"
)

const usage = `usage:
  study align [-rule exact|qualifier] GUIDE.json...
  study sheet -out SHEET.csv GUIDE.json...
  study agree [-disagreements OUT.csv] [-iterations N] [-seed N] A.csv B.csv
  study evidence -pdfs DIR GUIDE.json...`

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, usage)
		os.Exit(2)
	}
	cmds := map[string]func([]string) error{
		"align":    runAlign,
		"sheet":    runSheet,
		"agree":    runAgree,
		"evidence": runEvidence,
	}
	run, ok := cmds[os.Args[1]]
	if !ok {
		fmt.Fprintln(os.Stderr, usage)
		os.Exit(2)
	}
	if err := run(os.Args[2:]); err != nil {
		fmt.Fprintln(os.Stderr, "study:", err)
		os.Exit(1)
	}
}

func runAlign(args []string) error {
	fs := flag.NewFlagSet("align", flag.ExitOnError)
	rule := fs.String("rule", string(compare.Qualifier), "rule for the detailed listing: exact or qualifier")
	fs.Parse(args)
	guides, err := compare.LoadAll(fs.Args())
	if err != nil {
		return err
	}

	tw := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)
	fmt.Fprintln(tw, "guide pair\trule\tpairs\tby qualifier\tleft only\tright only\t")
	for _, r := range []compare.Rule{compare.Exact, compare.Qualifier} {
		for _, a := range compare.AlignAll(guides, r) {
			var byQualifier int
			for _, p := range a.Pairs {
				if p.Rule == compare.Qualifier {
					byQualifier++
				}
			}
			fmt.Fprintf(tw, "%s ~ %s\t%s\t%d\t%d\t%d\t%d\t\n", a.Left, a.Right, r, len(a.Pairs), byQualifier, len(a.LeftOnly), len(a.RightOnly))
		}
	}
	if err := tw.Flush(); err != nil {
		return err
	}

	for _, a := range compare.AlignAll(guides, compare.Rule(*rule)) {
		fmt.Printf("\n%s ~ %s, %s rule\n", a.Left, a.Right, *rule)
		for _, p := range a.Pairs {
			if p.Rule == compare.Qualifier {
				fmt.Printf("  aligned by qualifier: %s = %s\n", p.Left.Key.ID(), p.Right.Key.ID())
			}
		}
		for _, r := range a.LeftOnly {
			fmt.Printf("  only in %s: %s\n", a.Left, r.Key.ID())
		}
		for _, r := range a.RightOnly {
			fmt.Printf("  only in %s: %s\n", a.Right, r.Key.ID())
		}
	}
	return nil
}

func runSheet(args []string) error {
	fs := flag.NewFlagSet("sheet", flag.ExitOnError)
	out := fs.String("out", "", "output CSV")
	fs.Parse(args)
	if *out == "" {
		return errors.New("sheet: -out is required")
	}
	guides, err := compare.LoadAll(fs.Args())
	if err != nil {
		return err
	}
	units := compare.Units(compare.AlignAll(guides, compare.Qualifier))

	f, err := os.Create(*out)
	if err != nil {
		return err
	}
	if err := compare.WriteSheet(f, units); err != nil {
		f.Close()
		return err
	}
	if err := f.Close(); err != nil {
		return err
	}

	counts := map[[2]string]int{}
	var pairs [][2]string
	for _, u := range units {
		k := [2]string{u.LeftGuide + " ~ " + u.RightGuide, u.Category}
		if counts[k] == 0 && u.Category == "usage" {
			pairs = append(pairs, k)
		}
		counts[k]++
	}
	tw := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)
	fmt.Fprint(tw, "guide pair\t")
	for _, c := range compare.Categories {
		fmt.Fprintf(tw, "%s\t", c)
	}
	fmt.Fprintln(tw, "total\t")
	for _, p := range pairs {
		fmt.Fprintf(tw, "%s\t", p[0])
		var total int
		for _, c := range compare.Categories {
			n := counts[[2]string{p[0], c}]
			total += n
			fmt.Fprintf(tw, "%d\t", n)
		}
		fmt.Fprintf(tw, "%d\t\n", total)
	}
	fmt.Fprintf(tw, "all\t\t\t\t\t%d\t\n", len(units))
	if err := tw.Flush(); err != nil {
		return err
	}
	fmt.Printf("wrote %s\n", *out)
	return nil
}

func runAgree(args []string) error {
	fs := flag.NewFlagSet("agree", flag.ExitOnError)
	out := fs.String("disagreements", "", "write disagreeing units to this CSV")
	iterations := fs.Int("iterations", 2000, "bootstrap resamples")
	seed := fs.Uint64("seed", 214, "bootstrap seed")
	fs.Parse(args)
	if fs.NArg() != 2 {
		return errors.New("agree: want two sheets")
	}
	a, err := readSheet(fs.Arg(0))
	if err != nil {
		return err
	}
	b, err := readSheet(fs.Arg(1))
	if err != nil {
		return err
	}
	stats, disagreements, err := compare.Compare(a, b, *iterations, *seed)
	if err != nil {
		return err
	}

	tw := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)
	fmt.Fprintln(tw, "category\tn\tagreed\tpo\tpe\tkappa\t95% CI\t")
	for _, s := range stats {
		fmt.Fprintf(tw, "%s\t%d\t%d\t%.3f\t%.3f\t%s\t[%s, %s]\t\n", group(s), s.N, s.Agreed, s.Po, s.Pe, num(s.Kappa), num(s.Low), num(s.High))
	}
	if err := tw.Flush(); err != nil {
		return err
	}
	for _, s := range stats {
		fmt.Printf("\n%s: rows %s, columns %s\n", group(s), filepath.Base(fs.Arg(0)), filepath.Base(fs.Arg(1)))
		tw := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)
		fmt.Fprintln(tw, "\tsame\tdifferent\tunknown\t")
		for i, l := range compare.Labels {
			fmt.Fprintf(tw, "%s\t%d\t%d\t%d\t\n", l, s.Matrix[i][0], s.Matrix[i][1], s.Matrix[i][2])
		}
		if err := tw.Flush(); err != nil {
			return err
		}
	}

	if *out == "" {
		return nil
	}
	f, err := os.Create(*out)
	if err != nil {
		return err
	}
	w := csv.NewWriter(f)
	w.Write([]string{"unit", "category", "left_key", "right_key", "left_guide", "right_guide", "label_a", "note_a", "label_b", "note_b", "cause", "agreed_label"})
	for _, d := range disagreements {
		u := d.Unit
		w.Write([]string{u.ID, u.Category, u.LeftKey, u.RightKey, u.LeftGuide, u.RightGuide, u.Label, u.Note, d.LabelB, d.NoteB, "", ""})
	}
	w.Flush()
	if err := w.Error(); err != nil {
		f.Close()
		return err
	}
	return f.Close()
}

func runEvidence(args []string) error {
	fs := flag.NewFlagSet("evidence", flag.ExitOnError)
	dir := fs.String("pdfs", "", "directory with <guide id>.pdf files")
	fs.Parse(args)
	guides, err := compare.LoadAll(fs.Args())
	if err != nil {
		return err
	}
	var failed bool
	for _, g := range guides {
		path := filepath.Join(*dir, g.Meta.ID+".pdf")
		sum, err := compare.FileSHA256(path)
		if err != nil {
			return err
		}
		if sum != g.Meta.Source.SHA256 {
			return fmt.Errorf("%s: sha256 %s, guide records %s", path, sum, g.Meta.Source.SHA256)
		}
		pages, err := compare.PDFPages(path)
		if err != nil {
			return err
		}
		if len(pages) != g.Meta.Source.Pages {
			return fmt.Errorf("%s: %d pages, guide records %d", path, len(pages), g.Meta.Source.Pages)
		}
		var fragments int
		for _, r := range g.Requirements {
			for _, e := range r.Evidence {
				fragments += len(strings.Split(e.Excerpt, " / "))
			}
		}
		misses := compare.CheckEvidence(g, pages)
		fmt.Printf("%s: sha256 ok, %d pages, %d requirements, %d excerpt fragments, %d not found on the cited page\n",
			g.Meta.ID, len(pages), len(g.Requirements), fragments, len(misses))
		for _, m := range misses {
			fmt.Printf("  %s p.%d %q found on %v\n", m.Key, m.Page, m.Fragment, m.FoundOn)
			failed = true
		}
	}
	if failed {
		return errors.New("evidence check failed")
	}
	return nil
}

func readSheet(path string) ([]compare.Unit, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	units, err := compare.ReadSheet(f)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", path, err)
	}
	return units, nil
}

func group(s compare.Stats) string {
	if s.Stated {
		return s.Category + ", both stated"
	}
	return s.Category
}

func num(v float64) string {
	if math.IsNaN(v) {
		return "undefined"
	}
	return fmt.Sprintf("%.3f", v)
}

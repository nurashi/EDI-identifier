package main

import (
	"errors"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"text/tabwriter"

	"github.com/nurashi/EDI-identifier/backend/internal/compare"
)

const usage = `usage:
  edi align [-rule exact|qualifier] GUIDE.json...
  edi evidence -pdfs DIR GUIDE.json...`

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, usage)
		os.Exit(2)
	}
	cmds := map[string]func([]string) error{
		"align":    runAlign,
		"evidence": runEvidence,
	}
	run, ok := cmds[os.Args[1]]
	if !ok {
		fmt.Fprintln(os.Stderr, usage)
		os.Exit(2)
	}
	if err := run(os.Args[2:]); err != nil {
		fmt.Fprintln(os.Stderr, "edi:", err)
		os.Exit(1)
	}
}

func runAlign(args []string) error {
	fs := flag.NewFlagSet("align", flag.ExitOnError)
	rule := fs.String("rule", string(compare.Qualifier), "rule for the detailed listing: exact or qualifier")
	guides, err := compare.LoadAll(parse(fs, args))
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

func runEvidence(args []string) error {
	fs := flag.NewFlagSet("evidence", flag.ExitOnError)
	dir := fs.String("pdfs", "", "directory with <guide id>.pdf files")
	guides, err := compare.LoadAll(parse(fs, args))
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

func parse(fs *flag.FlagSet, args []string) []string {
	var positional []string
	for {
		fs.Parse(args)
		args = fs.Args()
		if len(args) == 0 {
			return positional
		}
		positional = append(positional, args[0])
		args = args[1:]
	}
}

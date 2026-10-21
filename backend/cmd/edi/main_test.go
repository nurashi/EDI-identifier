package main

import (
	"flag"
	"slices"
	"testing"
)

func TestParseAcceptsFlagsAfterFiles(t *testing.T) {
	for _, args := range [][]string{
		{"-pdfs", "pdfs", "a.json", "b.json"},
		{"a.json", "b.json", "-pdfs", "pdfs"},
		{"a.json", "-pdfs", "pdfs", "b.json"},
	} {
		fs := flag.NewFlagSet("evidence", flag.ContinueOnError)
		dir := fs.String("pdfs", "", "")
		files := parse(fs, args)
		if !slices.Equal(files, []string{"a.json", "b.json"}) || *dir != "pdfs" {
			t.Fatalf("%q: files %q, pdfs %q", args, files, *dir)
		}
	}
}

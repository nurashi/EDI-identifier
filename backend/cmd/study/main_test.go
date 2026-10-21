package main

import (
	"flag"
	"slices"
	"testing"
)

func TestParseAcceptsFlagsAfterFiles(t *testing.T) {
	for _, args := range [][]string{
		{"-disagreements", "d.csv", "a.csv", "b.csv"},
		{"a.csv", "b.csv", "-disagreements", "d.csv"},
		{"a.csv", "-disagreements", "d.csv", "b.csv"},
	} {
		fs := flag.NewFlagSet("agree", flag.ContinueOnError)
		out := fs.String("disagreements", "", "")
		files := parse(fs, args)
		if !slices.Equal(files, []string{"a.csv", "b.csv"}) || *out != "d.csv" {
			t.Fatalf("%q: files %q, disagreements %q", args, files, *out)
		}
	}
}

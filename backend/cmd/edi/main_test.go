package main

import (
	"encoding/csv"
	"flag"
	"os"
	"path/filepath"
	"slices"
	"testing"

	"github.com/nurashi/EDI-identifier/backend/internal/compare"
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

func TestWriteCSV(t *testing.T) {
	path := filepath.Join(t.TempDir(), "diff.csv")
	reports := []compare.Report{{
		Left: "a", Right: "b",
		Findings: []compare.Finding{{Category: "codes", Verdict: compare.Different, LeftKey: "AT7@140/AT707", RightKey: "AT7@140/AT707",
			Left: "LT", Right: "CT, ET", Detail: "only in a: LT", LeftPages: []int{21}, RightPages: []int{14, 15}}},
		LeftOnly: []compare.Absent{{Key: "K1@170", Pages: []int{5}}},
	}}
	if err := writeCSV(path, reports); err != nil {
		t.Fatal(err)
	}
	f, err := os.Open(path)
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	rows, err := csv.NewReader(f).ReadAll()
	if err != nil {
		t.Fatal(err)
	}
	if len(rows) != 3 || rows[1][3] != "different" || rows[1][10] != "p.14,15" || rows[2][3] != "only_left" || rows[2][4] != "K1@170" {
		t.Fatalf("rows = %q", rows)
	}
}

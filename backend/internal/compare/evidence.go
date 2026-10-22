package compare

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
)

type Miss struct {
	Key      string
	Page     int
	Fragment string
	FoundOn  []int
}

func CheckEvidence(g Guide, pages []string) []Miss {
	text := make([]string, len(pages))
	for i, p := range pages {
		text[i] = squash(p)
	}
	var misses []Miss
	for _, r := range g.Requirements {
		for _, e := range r.Evidence {
			for _, f := range strings.Split(e.Excerpt, " / ") {
				f = squash(f)
				if e.Page >= 1 && e.Page <= len(text) && strings.Contains(text[e.Page-1], f) {
					continue
				}
				m := Miss{Key: r.Key.ID(), Page: e.Page, Fragment: f}
				for i, t := range text {
					if strings.Contains(t, f) {
						m.FoundOn = append(m.FoundOn, i+1)
					}
				}
				misses = append(misses, m)
			}
		}
	}
	return misses
}

func squash(s string) string {
	return strings.Join(strings.Fields(s), " ")
}

func PDFPages(path string) ([]string, error) {
	out, err := exec.Command("pdftotext", "-layout", path, "-").Output()
	if err != nil {
		return nil, fmt.Errorf("pdftotext %s: %w", path, err)
	}
	pages := strings.Split(string(out), "\f")
	if strings.TrimSpace(pages[len(pages)-1]) == "" {
		pages = pages[:len(pages)-1]
	}
	return pages, nil
}

func FileSHA256(path string) (string, error) {
	f, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer f.Close()
	h := sha256.New()
	if _, err := io.Copy(h, f); err != nil {
		return "", err
	}
	return hex.EncodeToString(h.Sum(nil)), nil
}

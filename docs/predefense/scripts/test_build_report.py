import unittest

from build_report import DOCS, inline, rebase_target, render_text


class ReportRendererTest(unittest.TestCase):
    source = DOCS / "sections/08-prototype.md"

    def test_links_are_rebased_from_section_to_report(self):
        self.assertEqual(
            rebase_target("../prototype/index.html", self.source),
            "prototype/index.html",
        )
        self.assertEqual(rebase_target("09-evaluation.md", self.source), "#section-09")
        self.assertEqual(
            rebase_target("../BIBLIOGRAPHY.md", self.source), "#bibliography"
        )
        self.assertEqual(
            rebase_target("https://example.org/paper", self.source),
            "https://example.org/paper",
        )

    def test_code_is_escaped_and_does_not_become_a_citation(self):
        rendered = inline("`<script>[S01]</script>` and [S02]", self.source)
        self.assertIn("<code>&lt;script&gt;[S01]&lt;/script&gt;</code>", rendered)
        self.assertNotIn("ref-S01", rendered)
        self.assertIn('href="#ref-S02"', rendered)

    def test_escaped_pipe_does_not_split_a_table_cell(self):
        rendered = render_text(
            "| Value | Meaning |\n|---|---|\n| a \\| b | alternatives |", self.source
        )
        self.assertEqual(rendered.count("<td>"), 2)
        self.assertIn("a | b", rendered)

    def test_diagram_path_is_relative_and_alt_text_is_escaped(self):
        rendered = render_text('![Diagram "A"](../diagrams/context.svg)', self.source)
        self.assertIn('src="diagrams/context.svg"', rendered)
        self.assertIn('alt="Diagram &quot;A&quot;"', rendered)


if __name__ == "__main__":
    unittest.main()

import hashlib
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

from .__main__ import extract
from .model import pdf_pages


class SourceIdentityTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.pdf = Path(self.directory.name) / "guide.pdf"
        self.pdf.write_bytes(b"%PDF-test-source")
        self.meta = {
            "source": {
                "sha256": hashlib.sha256(self.pdf.read_bytes()).hexdigest(),
                "pages": 1,
            }
        }

    def test_wrong_document_is_rejected_before_parsing(self):
        self.pdf.write_bytes(b"%PDF-different-document")
        with patch("extractor.__main__.pdf_pages") as read_pages:
            with self.assertRaisesRegex(ValueError, "SHA-256"):
                extract(self.pdf, self.meta)
            read_pages.assert_not_called()

    def test_wrong_page_count_is_rejected(self):
        with patch("extractor.__main__.pdf_pages", return_value=["page 1", "page 2"]):
            with self.assertRaisesRegex(ValueError, "page count"):
                extract(self.pdf, self.meta)

    def test_poppler_output_uses_utf8_on_windows(self):
        def run(command, **options):
            text = "Café – status\f".encode("utf-8").decode(options["encoding"])
            return SimpleNamespace(stdout=text)

        with patch("extractor.model.subprocess.run", side_effect=run):
            self.assertEqual(pdf_pages(self.pdf), ["Café – status"])


if __name__ == "__main__":
    unittest.main()

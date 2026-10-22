import hashlib
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from .__main__ import extract


class SourceIdentityTest(unittest.TestCase):
    def setUp(self):
        directory = tempfile.TemporaryDirectory()
        self.addCleanup(directory.cleanup)
        self.pdf = Path(directory.name) / "guide.pdf"
        self.pdf.write_bytes(b"%PDF-test")
        self.meta = {"source": {"sha256": hashlib.sha256(self.pdf.read_bytes()).hexdigest(), "pages": 1}}
        self.parser = Mock()
        self.parser.detect.return_value = True
        self.parser.parse.return_value = []
        parsers = patch("extractor.__main__.PARSERS", [self.parser])
        parsers.start()
        self.addCleanup(parsers.stop)

    def test_wrong_hash_stops_before_reading_pages(self):
        self.pdf.write_bytes(b"%PDF-other")
        with patch("extractor.__main__.pdf_pages") as pages:
            with self.assertRaisesRegex(ValueError, "SHA-256"):
                extract(self.pdf, self.meta)
            pages.assert_not_called()
        self.parser.detect.assert_not_called()
        self.parser.parse.assert_not_called()

    def test_wrong_page_count_stops_before_parsing(self):
        with patch("extractor.__main__.pdf_pages", return_value=["one", "two"]):
            with self.assertRaisesRegex(ValueError, "page count"):
                extract(self.pdf, self.meta)
        self.parser.detect.assert_not_called()
        self.parser.parse.assert_not_called()

    def test_matching_document_is_parsed(self):
        with patch("extractor.__main__.pdf_pages", return_value=["one"]):
            self.assertEqual(extract(self.pdf, self.meta), {"guide": self.meta, "requirements": []})
        self.parser.detect.assert_called_once_with(["one"])
        self.parser.parse.assert_called_once_with(["one"])


if __name__ == "__main__":
    unittest.main()

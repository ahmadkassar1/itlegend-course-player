"""Generate course PDFs and rendered previews from the app's JSON source of truth.

Authoring only: Python/reportlab/Poppler are not application dependencies.
Pass the path to pdftoppm as the first argument.
"""
import json
import subprocess
import sys
from html import escape
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

root = Path(__file__).resolve().parent.parent
content = json.loads((root / "src/data/course-content.json").read_text(encoding="utf-8"))
for slug, course in content.items():
    data = course["worksheet"]
    output = root / "public" / data["src"].lstrip("/")
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = canvas.Canvas(str(output), pagesize=A4, invariant=1, pageCompression=1)
    width, height = A4
    doc.setTitle(data["title"])
    doc.setAuthor("Course Library")
    doc.setFillColorRGB(.95, .98, .97)
    doc.rect(0, height - 184, width, 184, fill=1, stroke=0)

    def paragraph(text, y, size, leading, color, bold=False):
        style = ParagraphStyle("text", fontName="Helvetica-Bold" if bold else "Helvetica",
                               fontSize=size, leading=leading, textColor=color)
        block = Paragraph(escape(text), style)
        _, block_height = block.wrap(width - 84, height)
        block.drawOn(doc, 42, y - block_height)
        return y - block_height

    paragraph("COURSE PRACTICE WORKSHEET", height - 34, 10, 14, "#267b66", True)
    y = paragraph(data["title"], height - 65, 27, 33, "#20382f", True)
    paragraph(data["introduction"], y - 16, 14, 21, "#50665d")
    y = height - 211
    for section in data["sections"]:
        y = paragraph(section["title"], y, 18, 24, "#267b66", True)
        y = paragraph(section["body"], y - 9, 14, 21, "#20382f")
        y -= 28
    assert y > 72, f"{slug} overlaps footer"
    doc.setStrokeColorRGB(.8, .86, .83)
    doc.line(42, 56, width - 42, 56)
    paragraph("Original demo resource - Course Library", 43, 10, 14, "#50665d")
    doc.setFont("Helvetica", 10)
    doc.setFillColorRGB(.31, .4, .36)
    doc.drawRightString(width - 42, 29, "1 / 1")
    doc.save()
    preview = root / "public" / data["preview"].lstrip("/")
    subprocess.run([sys.argv[1], "-singlefile", "-r", "110", "-png", str(output), str(preview.with_suffix(""))], check=True)
    print(f"Generated and rendered {slug}")

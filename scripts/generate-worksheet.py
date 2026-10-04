"""Generate the original sample PDF from the same content as its accessible view.

Run with Python + reportlab. Render learning-plan.pdf to learning-plan.png with
Poppler pdftoppm -singlefile -r 110 -png. These are authoring tools, not app deps.
"""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

root = Path(__file__).resolve().parent.parent
data = json.loads((root / "src/data/worksheet.json").read_text())
output = root / "public/resources/learning-plan.pdf"
output.parent.mkdir(parents=True, exist_ok=True)
doc = canvas.Canvas(str(output), pagesize=A4, invariant=1, pageCompression=1)
width, height = A4
doc.setTitle(data["title"])
doc.setAuthor("Course Library")
doc.setFillColorRGB(0.96, 0.98, 0.98)
doc.rect(0, height - 190, width, 190, fill=1, stroke=0)

def paragraph(text, y, size, leading, color, bold=False):
    style = ParagraphStyle("text", fontName="Helvetica-Bold" if bold else "Helvetica",
                           fontSize=size, leading=leading, textColor=color)
    block = Paragraph(text, style)
    _, block_height = block.wrap(width - 84, height)
    block.drawOn(doc, 42, y - block_height)
    return y - block_height

paragraph("COURSE WORKSHEET", height - 35, 10, 14, "#23816f", True)
y = paragraph(data["title"], height - 66, 30, 36, "#202b29", True)
paragraph(data["introduction"], y - 15, 18, 25, "#46544e")
y = height - 222
for section in data["sections"]:
    y = paragraph(section["title"], y, 21, 27, "#23816f", True)
    y = paragraph(section["body"], y - 10, 18, 25, "#202b29")
    y -= 29
assert y > 70, "Content would overlap footer"
doc.setStrokeColorRGB(0.88, 0.91, 0.90)
doc.line(42, 55, width - 42, 55)
paragraph("Original sample worksheet - Course Library", 43, 10, 14, "#626d69")
doc.setFont("Helvetica", 10)
doc.setFillColorRGB(0.38, 0.43, 0.41)
doc.drawRightString(width - 42, 29, "1 / 1")
doc.save()
print(output)

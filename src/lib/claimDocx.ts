import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import type { ClaimDocument } from "./claimFormatter";

const FONT = "Times New Roman";

function center(lines: string[]): Paragraph[] {
  return lines.map(
    (line) =>
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: line, bold: true, font: FONT })],
      })
  );
}

/** Renders a ClaimDocument as a .docx blob for download. */
export async function claimDocumentToDocx(doc: ClaimDocument): Promise<Blob> {
  const children: Paragraph[] = [
    ...center(doc.courtName.split("\n")),
    new Paragraph({}),
    ...center([doc.formName]),
    new Paragraph({}),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "BETWEEN:", font: FONT })],
    }),
    new Paragraph({}),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: doc.parties[0].name.toUpperCase(), bold: true, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `(${doc.parties[0].role})`, italics: true, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "- and -", font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: doc.parties[1].name.toUpperCase(), bold: true, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `(${doc.parties[1].role})`, italics: true, font: FONT })],
    }),
    new Paragraph({}),
  ];

  for (const section of doc.sections) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: section.title, bold: true, font: FONT })],
      })
    );
    section.paragraphs.forEach((text, i) => {
      children.push(
        new Paragraph({
          spacing: { after: 160 },
          children: [
            new TextRun({
              text: section.numbered ? `${i + 1}.\t${text}` : text,
              font: FONT,
            }),
          ],
        })
      );
    });
  }

  children.push(new Paragraph({}));
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "IMPORTANT NOTICES", bold: true, font: FONT })],
    })
  );
  doc.notices.forEach((notice, i) => {
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: `${i + 1}. ${notice}`, italics: true, size: 18, font: FONT })],
      })
    );
  });
  children.push(
    new Paragraph({
      spacing: { before: 200 },
      children: [
        new TextRun({
          text: `Formatting structure follows the ${doc.rulesCitation}. Generated automatically by the LegalXpress Claim Drafter on ${new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}.`,
          size: 18,
          font: FONT,
        }),
      ],
    })
  );

  const document = new Document({
    sections: [{ properties: {}, children }],
  });
  return Packer.toBlob(document);
}

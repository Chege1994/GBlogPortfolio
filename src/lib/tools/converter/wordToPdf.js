import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

export async function convertWordToPdf(wordFilePath, outputPdfPath) {
	try {
		// Read the Word file
		const wordBuffer = fs.readFileSync(wordFilePath);
		const { value: text } = await mammoth.extractRawText({ buffer: wordBuffer });

		// Create a new PDF document
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage();
		const fontSize = 12;

		// Draw text on the PDF
		page.drawText(text, {
			x: 50,
			y: page.getHeight() - 50,
			size: fontSize,
			maxWidth: page.getWidth() - 100,
			lineHeight: fontSize * 1.5
		});

		// Save the PDF to a file
		const pdfBytes = await pdfDoc.save();
		fs.writeFileSync(outputPdfPath, pdfBytes);

		return outputPdfPath;
	} catch (error) {
		console.error('Error during Word-to-PDF conversion:', error.message);
		throw new Error('Failed to convert Word file to PDF.');
	}
}

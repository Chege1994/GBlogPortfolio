import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';
import { convertWordToPdf } from '$lib/tools/converter/wordToPdf';

export async function POST({ request }) {
	try {
		const data = await request.formData();
		const wordFile = data.get('file');

		if (
			!wordFile ||
			wordFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		) {
			return json({ error: 'Invalid file type. Only .docx files are allowed.' }, { status: 400 });
		}

		// Create uploads directory if it doesn't exist
		const uploadDir = path.resolve('uploads');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}

		// Save uploaded Word file
		const tempWordPath = path.join(uploadDir, wordFile.name);
		const tempPdfPath = path.join(uploadDir, `${path.parse(wordFile.name).name}.pdf`);
		const buffer = Buffer.from(await wordFile.arrayBuffer());
		fs.writeFileSync(tempWordPath, buffer);

		// Convert to PDF
		const pdfPath = await convertWordToPdf(tempWordPath, tempPdfPath);

		return json({ pdfUrl: `/uploads/${path.basename(pdfPath)}` });
	} catch (error) {
		console.error('Error in file upload or conversion:', error.message);
		return json(
			{ error: 'An error occurred during conversion. Please try again.' },
			{ status: 500 }
		);
	}
}

import { db } from '$lib/server/db/index.js'; // Ensure this path is correct
import { comment } from '$lib/server/db/schema.js';

export async function GET() {
	const comments = await db.select().from(comment).orderBy({ timestamp: 'desc' });
	return new Response(JSON.stringify(comments), { status: 200 });
}

export async function POST({ request }) {
	try {
		const data = await request.text(); // Use text() to get request body
		const { username, email, comment: userComment } = JSON.parse(data);

		const newComment = await db.insert(comment).values({
			username,
			email,
			comment: userComment
		});
		return new Response(JSON.stringify(newComment), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to store comment' }), { status: 500 });
	}
}

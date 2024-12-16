import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const comment = pgTable('comment', {
	id: serial('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email'),
	comment: text('comment').notNull(),
	timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow()
});

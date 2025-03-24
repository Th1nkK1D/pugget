import { type ExtractDocumentTypeFromTypedRxJsonSchema, type RxCollection } from 'rxdb';

export const userSchema = {
	title: 'User',
	description: 'User accounts',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 36
		},
		name: {
			type: 'string',
			maxLength: 12
		}
	},
	required: ['id', 'name']
} as const;

export type User = ExtractDocumentTypeFromTypedRxJsonSchema<typeof userSchema>;
export type UserCollection = RxCollection<User>;

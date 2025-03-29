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
		hash: {
			type: 'string',
			maxLength: 40
		},
		name: {
			type: 'string',
			maxLength: 16
		},
		isActive: {
			type: 'boolean'
		},
		createdAt: {
			type: 'number'
		}
	},
	required: ['id', 'hash', 'isActive', 'name']
} as const;

export type User = ExtractDocumentTypeFromTypedRxJsonSchema<typeof userSchema>;
export type UserCollection = RxCollection<User>;

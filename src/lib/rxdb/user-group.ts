import { type ExtractDocumentTypeFromTypedRxJsonSchema, type RxCollection } from 'rxdb';

export const userGroupSchema = {
	title: 'User Group',
	description: 'Groups that a user belong to',
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
			maxLength: 48
		},
		joinedAt: {
			type: 'number'
		},
		archivedAt: {
			type: 'number'
		}
	},
	required: ['id', 'name', 'joinedAt']
} as const;

export type UserGroup = ExtractDocumentTypeFromTypedRxJsonSchema<typeof userGroupSchema>;
export type UserGroupCollection = RxCollection<UserGroup>;

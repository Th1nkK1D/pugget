import { type ExtractDocumentTypeFromTypedRxJsonSchema, type RxCollection } from 'rxdb';

export const groupMemberSchema = {
	title: 'User Group',
	description: 'Groups that a user belong to',
	version: 0,
	primaryKey: 'userHash',
	type: 'object',
	properties: {
		userHash: {
			type: 'string',
			maxLength: 40
		},
		name: {
			type: 'string',
			maxLength: 16
		},
		joinedAt: {
			type: 'number'
		},
		archivedAt: {
			type: 'number'
		}
	},
	required: ['userHash', 'name', 'joinedAt']
} as const;

export type GroupMember = ExtractDocumentTypeFromTypedRxJsonSchema<typeof groupMemberSchema>;
export type GroupMemberCollection = RxCollection<GroupMember>;

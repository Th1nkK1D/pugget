import { type ExtractDocumentTypeFromTypedRxJsonSchema, type RxCollection } from 'rxdb';
import { userSchema } from './user';

export const groupMemberSchema = {
	title: 'Group Member',
	description: 'Users that belong to a group',
	version: 0,
	primaryKey: 'userHash',
	type: 'object',
	properties: {
		userHash: {
			type: 'string',
			maxLength: userSchema.properties.hash.maxLength
		},
		name: {
			type: 'string',
			maxLength: userSchema.properties.name.maxLength
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

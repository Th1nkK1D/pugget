import {
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxCollection,
	type RxCollectionCreator,
} from 'rxdb';
import { hashString } from '../utils/hash';

const schema = {
	title: 'Team member schema',
	description: 'Team members information shared between members',
	version: 0,
	primaryKey: 'userHashId',
	type: 'object',
	properties: {
		userHashId: {
			type: 'string',
			maxLength: 64,
		},
		name: {
			type: 'string',
		},
		joinAt: {
			type: 'number',
		},
	},
	required: ['userHashId', 'name', 'joinAt'],
} as const;

const statics = {
	async join(this: RxCollection<TeamMember>, userId: string, name: string) {
		return this.insert({
			userHashId: await hashString(userId),
			name,
			joinAt: new Date().getTime(),
		});
	},
};

export const teamMembers: RxCollectionCreator = {
	schema,
	statics,
};

export type TeamMember = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof schema
>;
export type TeamMemberCollection = RxCollection<TeamMember, {}, typeof statics>;

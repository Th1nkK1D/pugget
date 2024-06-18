import {
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxCollection,
	type RxCollectionCreator,
} from 'rxdb';
import { ulid } from 'ulid';

const schema = {
	title: 'Team schema',
	description: 'Team that current user belong to.',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 26,
		},
		name: {
			type: 'string',
		},
	},
	required: ['id', 'name'],
} as const;

const statics = {
	create(this: RxCollection, name: string) {
		this.insert({
			id: ulid(),
			name,
		});
	},
};

export const teams: RxCollectionCreator = {
	schema,
	statics,
};

export type Team = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schema>;
export type TeamCollection = RxCollection<Team, {}, typeof statics>;

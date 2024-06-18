import {
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxCollection,
} from 'rxdb';

export const teamSchema = {
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

export type Team = ExtractDocumentTypeFromTypedRxJsonSchema<typeof teamSchema>;
export type TeamCollection = RxCollection<Team, {}, {}>;

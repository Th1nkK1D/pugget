import {
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxCollection,
	type RxCollectionCreator,
} from 'rxdb';
import { ulid } from 'ulid';
import { hashString } from '../utils/hash';

const schema = {
	title: 'Team member schema',
	description: 'Team transactions information shared between members',
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
		date: {
			type: 'number',
		},
		paidBy: {
			type: 'string',
		},
		splits: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					userHashedId: {
						type: 'string',
					},
					amount: {
						type: 'number',
					},
				},
				required: ['userHashedId', 'amount'],
			},
		},
		createdBy: {
			type: 'string',
		},
	},
	required: ['id', 'name', 'date', 'paidBy', 'splits', 'createdBy'],
} as const;

const statics = {
	async create(
		this: RxCollection<TeamTransaction>,
		userId: string,
		data: Omit<TeamTransaction, 'id' | 'createdBy'>,
	) {
		return this.insert({
			id: ulid(),
			...data,
			createdBy: await hashString(userId),
		});
	},
};

export const teamTransactions: RxCollectionCreator = {
	schema,
	statics,
};

export type TeamTransaction = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof schema
>;
export type TeamTransactionCollection = RxCollection<
	TeamTransaction,
	{},
	typeof statics
>;

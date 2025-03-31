import { type ExtractDocumentTypeFromTypedRxJsonSchema, type RxCollection } from 'rxdb';
import { userSchema } from './user';

export const groupTransactionSchema = {
	title: 'Group Transaction',
	description: 'Transactions that belong to a group',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 36
		},
		label: {
			type: 'string',
			maxLength: 48
		},
		total: {
			type: 'number'
		},
		currency: {
			type: 'string',
			maxLength: 3
		},
		tag: {
			type: 'string',
			maxLength: 24
		},
		paidOn: {
			type: 'string'
		},
		paidByUserHash: {
			type: 'string',
			maxLength: userSchema.properties.hash.maxLength
		},
		splits: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					userHash: {
						type: 'string',
						maxLength: userSchema.properties.hash.maxLength
					},
					amount: {
						type: 'number'
					},
					label: {
						type: 'string'
					},
					isSettled: {
						type: 'boolean',
						default: false
					}
				},
				required: ['userHash', 'amount']
			}
		},
		createdByUserHash: {
			type: 'string',
			maxLength: userSchema.properties.hash.maxLength
		},
		createdAt: {
			type: 'number'
		}
	},
	required: [
		'id',
		'label',
		'total',
		'currency',
		'paidOn',
		'paidByUserHash',
		'splits',
		'createdByUserHash',
		'createdAt'
	]
} as const;

export type GroupTransaction = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof groupTransactionSchema
>;
export type GroupTransactionCollection = RxCollection<GroupTransaction>;

import { addRxPlugin, createRxDatabase, type RxDatabase } from 'rxdb/plugins/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { userSchema, type UserCollection } from './user';
import { onMount } from 'svelte';

interface Collection {
	users: UserCollection;
}

export function useRxdb() {
	let db: RxDatabase<Collection>;
	let collections = $state<Collection>();

	onMount(async () => {
		if (import.meta.env.DEV) {
			addRxPlugin((await import('rxdb/plugins/dev-mode')).RxDBDevModePlugin);
		}

		db = await createRxDatabase<Collection>({
			name: 'pugget',
			storage: wrappedValidateAjvStorage({
				storage: getRxStorageDexie()
			}),
			ignoreDuplicate: import.meta.env.DEV
		});

		collections = await db.addCollections({
			users: { schema: userSchema }
		});
	});

	return {
		get collections() {
			return collections;
		}
	};
}

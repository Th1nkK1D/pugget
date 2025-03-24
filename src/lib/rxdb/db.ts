import { createRxDatabase } from 'rxdb/plugins/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

export const db = await createRxDatabase({
	name: 'pugget',
	storage: getRxStorageDexie()
});

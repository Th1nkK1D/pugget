import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { teams, type TeamCollection } from './team';

interface DatabaseCollections {
	teams: TeamCollection;
}

export const db = await createRxDatabase<DatabaseCollections>({
	name: 'pugget',
	storage: getRxStorageDexie(),
});

await db.addCollections({
	teams,
});

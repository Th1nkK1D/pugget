import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { teams, type TeamCollection } from './team';
import type { TeamMemberCollection } from './team-member';
import type { TeamTransactionCollection } from './team-transaction';

type DatabaseCollections = {
	teams: TeamCollection;
} & Record<`team_${string}_members`, TeamMemberCollection> &
	Record<`team_${string}_transactions`, TeamTransactionCollection>;

export const db = await createRxDatabase<DatabaseCollections>({
	name: 'pugget',
	storage: getRxStorageDexie(),
});

await db.addCollections({
	teams,
});

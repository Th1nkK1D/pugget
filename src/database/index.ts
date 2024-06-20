import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { teams, type TeamCollection } from './team';
import { teamMembers, type TeamMemberCollection } from './team-member';
import {
	teamTransactions,
	type TeamTransactionCollection,
} from './team-transaction';

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

const availableTeams = await db.teams.find().exec();

await db.addCollections(
	availableTeams.reduce(
		(cols, { id }) => ({
			...cols,
			[`team_${id}_members`]: teamMembers,
			[`team_${id}_transactions`]: teamTransactions,
		}),
		{},
	),
);

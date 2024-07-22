import { createRxDatabase } from 'rxdb';
import {
	replicateWebRTC,
	getConnectionHandlerSimplePeer,
} from 'rxdb/plugins/replication-webrtc';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import type { User } from '../hooks/user-data';
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

await syncTeamsCollections((await db.teams.find().exec()).map(({ id }) => id));

export async function addTeam(id: string, name: string, user: User) {
	const team = await db.teams.insert({
		id,
		name,
	});

	await syncTeamsCollections([id]);

	await db[`team_${team.id}_members`].join(user.id, user.name);
}

async function syncTeamsCollections(teamIds: string[]) {
	const collections = await db.addCollections(
		teamIds.reduce(
			(cols, id) => ({
				...cols,
				[`team_${id}_members`]: teamMembers,
				[`team_${id}_transactions`]: teamTransactions,
			}),
			{},
		),
	);

	Object.entries(collections).map(([name, collection]) => {
		replicateWebRTC({
			collection,
			topic: `pugget_${name}`,
			connectionHandlerCreator: getConnectionHandlerSimplePeer({
				signalingServerUrl: 'wss://signaling.rxdb.info/',
			}),
			pull: {},
			push: {},
		}).then(({ error$ }) => error$.subscribe(console.error));
	});
}

import { useObservable } from '@solidjs-use/rxjs';
import { For, createSignal } from 'solid-js';
import { db } from '../../database';
import { teamMembers } from '../../database/team-member';
import { teamTransactions } from '../../database/team-transaction';
import { useUserData } from '../../hooks/user-data';

export default function () {
	const { user } = useUserData();
	const [teams] = useObservable(db.teams.find({ sort: [{ id: 'desc' }] }).$);
	const [teamName, setTeamName] = createSignal('');

	async function createTeam() {
		const { id } = await db.teams.create(teamName());

		await db.addCollections({
			[`team_${id}_members`]: teamMembers,
			[`team_${id}_transactions`]: teamTransactions,
		});

		await db[`team_${id}_members`].join(user().id, user().name);
	}

	return (
		<div class="flex h-dvh flex-col gap-6 p-3">
			<p>Hi, {user().name}</p>
			<h1 class="text-xl font-bold">My Teams</h1>
			<div class="flex flex-col gap-2">
				<For
					each={teams()}
					fallback={<p class="text-sm">You don't have a team yet</p>}
				>
					{(team) => (
						<a
							href={`/teams/${team.id}`}
							class="card bg-accent text-base-100 shadow-lg"
						>
							<div class="card-body">
								<h2 class="font-bold">{team.name}</h2>
							</div>
						</a>
					)}
				</For>
			</div>
			<div class="flex flex-row gap-2">
				<input
					type="text"
					placeholder="Team name"
					class="input input-bordered w-full"
					onInput={(e) => setTeamName(e.target.value)}
				/>
				<button class="btn btn-primary" onClick={createTeam}>
					Create team
				</button>
			</div>
		</div>
	);
}

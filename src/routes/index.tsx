import { useObservable } from '@solidjs-use/rxjs';
import { For, createSignal } from 'solid-js';
import { db } from '../database';
import { useUserData } from '../hooks/user-data';

function IndexPage() {
	const { user } = useUserData();
	const [teams] = useObservable(db.teams.find().$);
	const [teamName, setTeamName] = createSignal('');

	function createTeam() {
		db.teams.create(teamName());
	}

	return (
		<div class="flex h-dvh flex-col gap-6 p-3">
			<p>Hi, {user().name}</p>
			<h1 class="text-xl font-bold">My Teams</h1>
			<div class="flex flex-col gap-2">
				<For
					each={teams()?.reverse()}
					fallback={<p class="text-sm">You don't have a team yet</p>}
				>
					{({ name }) => (
						<div class="card bg-accent text-base-100 shadow-lg">
							<div class="card-body">
								<h2 class="font-bold">{name}</h2>
							</div>
						</div>
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

export default IndexPage;

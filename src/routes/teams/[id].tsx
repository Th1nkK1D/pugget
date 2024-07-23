import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import { For, createEffect } from 'solid-js';
import { addTeam, db } from '../../database';
import { useSafeObservable } from '../../hooks/observable';
import { useUserData } from '../../hooks/user-data';

export default function () {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const { user } = useUserData();
	const navigate = useNavigate();

	const team = useSafeObservable(db.teams.findOne({ selector: { id } }).$);
	const members = useSafeObservable(db[`team_${id}_members`]?.find().$);
	const transactions = useSafeObservable(
		db[`team_${id}_transactions`]?.find().$,
	);

	createEffect(() => {
		if (team() === null) {
			if (!searchParams.invite) {
				navigate('/teams');
			} else {
				addTeam(id, decodeURI(searchParams.invite), user());
			}
		}
	});

	function copyInvitationLink() {
		const inviteUrl = `${location.origin}${location.pathname}?invite=${encodeURI(team()?.name || '')}`;
		navigator.clipboard.writeText(inviteUrl);
	}

	return (
		<div class="flex flex-col gap-3 p-3">
			<h1 class="text-2xl font-bold">{team()?.name}</h1>

			<div>
				<h2 class="text-lg font-bold">Members</h2>
				<ul class="list-inside list-disc">
					<For each={members()}>{({ name }) => <li>{name}</li>}</For>
				</ul>
				<button class="btn btn-outline" onClick={copyInvitationLink}>
					Copy invitation link
				</button>
			</div>

			<div>
				<h2 class="text-lg font-bold">Transactions</h2>
				<ul class="list-inside list-disc">
					<For each={transactions()}>{({ name }) => <li>{name}</li>}</For>
				</ul>
			</div>
		</div>
	);
}

import { useObservable } from '@solidjs-use/rxjs';
import { useParams } from '@solidjs/router';
import { db } from '../../database';

export default function () {
	const { id } = useParams();
	const [team] = useObservable(db.teams.findOne({ selector: { id } }).$);
	const [members] = useObservable(db[`team_${id}_members`].find().$);
	const [transactions] = useObservable(db[`team_${id}_transactions`].find().$);

	return (
		<div class="flex flex-col gap-3 p-3">
			<h1 class="text-bold text-xl">{team()?.name}</h1>
			<p>{JSON.stringify(members())}</p>
			<p>{JSON.stringify(transactions())}</p>
		</div>
	);
}

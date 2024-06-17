import { useUserData } from '../hooks/user-data';

function IndexPage() {
	const { user } = useUserData();

	return (
		<div class="flex h-dvh flex-col items-center justify-center gap-12">
			<p>Hi, {user().name}</p>
		</div>
	);
}

export default IndexPage;

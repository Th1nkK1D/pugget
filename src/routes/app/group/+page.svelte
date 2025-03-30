<script lang="ts">
	import { goto } from '$app/navigation';
	import { groupMemberSchema, type GroupMember } from '$lib/rxdb/group-member';
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';

	const rxdb = useRxdb();
	const user = $derived(rxdb.currentUser);
	const group = $derived(
		$user
			? rxdb.collections?.[`user-${$user?.hash}-groups`]?.findOne({
					selector: { id: new URLSearchParams(window.location.search).get('id') ?? '' }
				}).$
			: undefined
	);
	const members = $derived(rxdb.collections?.[`group-${$group?.id}-members`]?.find().$);

	$effect(() => {
		if (!rxdb.collections || !$user) {
			return;
		}

		if ($group === null) {
			goto('/app', { replaceState: true });
		}

		rxdb
			.addCollection<GroupMember>(
				`group-${$group?.id}-members`,
				{ schema: groupMemberSchema },
				true
			)
			.then((membersCollection) => {
				membersCollection?.insertIfNotExists({
					userHash: $user.hash,
					name: $user.name,
					joinedAt: new Date().getTime()
				});
			});
	});
</script>

<h1 class="text-2xl font-bold">{$group?.name}</h1>
<p>{$members?.length} members</p>

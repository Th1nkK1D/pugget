<script lang="ts">
	import { goto } from '$app/navigation';
	import { groupMemberSchema, type GroupMember } from '$lib/rxdb/group-member';
	import { groupTransactionSchema } from '$lib/rxdb/group-transaction';
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';
	import { ReceiptTextIcon, UserIcon } from '@lucide/svelte';

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
	const transactions = $derived(rxdb.collections?.[`group-${$group?.id}-transactions`]?.find().$);

	$effect(() => {
		if ($group === null) {
			goto('/app', { replaceState: true });
		}

		if (!rxdb.collections || !$user || !$group) {
			return;
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

		rxdb.addCollection(
			`group-${$group?.id}-transactions`,
			{ schema: groupTransactionSchema },
			true
		);
	});
</script>

<h1 class="text-3xl font-bold">{$group?.name}</h1>

<div class="stats">
	<div class="stat">
		<div class="stat-figure">
			<UserIcon />
		</div>
		<div class="stat-value">{$members?.length}</div>
		<div class="stat-desc">members</div>
	</div>

	<div class="stat">
		<div class="stat-figure">
			<ReceiptTextIcon />
		</div>
		<div class="stat-value">{$transactions?.length}</div>
		<div class="stat-desc">transactions</div>
	</div>
</div>

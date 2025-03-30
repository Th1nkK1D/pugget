<script lang="ts">
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';
	import { userGroupSchema } from '$lib/rxdb/user-group';
	import { ChevronRightIcon, CirclePlusIcon } from '@lucide/svelte';

	const rxdb = useRxdb();
	const user = $derived(rxdb.currentUser);
	const groups = $derived(
		$user ? rxdb.collections?.[`user-${$user.hash}-groups`]?.find().$ : undefined
	);

	let groupName = $state('');
	let createDialog = $state<HTMLDialogElement>();

	async function createGroup() {
		const user = await rxdb.collections?.users.findOne().exec();

		rxdb.collections?.[`user-${user!.hash}-groups`].insert({
			id: crypto.randomUUID(),
			name: groupName.trim(),
			joinedAt: new Date().getTime()
		});

		createDialog?.close();
		groupName = '';
	}
</script>

{#if $groups?.length}
	<ul class="list bg-base-100 flex-1">
		{#each $groups as { id, name, joinedAt }}
			<li class="list-row items-center">
				<a href="/app/group?id={id}" class="list-col-grow">
					<div class="text-2xl font-bold">{name}</div>
					<div class="text-xs opacity-70">
						Joined at {new Date(joinedAt).toLocaleDateString()}
					</div>
				</a>
				<ChevronRightIcon />
			</li>
		{/each}
	</ul>
{:else}
	<p class="m-auto">You don't have any groups (just yet)</p>
{/if}

<div class="sticky inset-x-0 bottom-3 mx-auto">
	<ul class="menu bg-base-200 menu-horizontal rounded-box">
		<li>
			<button onclick={() => createDialog?.showModal()}><CirclePlusIcon />Create</button>
		</li>
	</ul>
</div>

<dialog bind:this={createDialog} class="modal">
	<form class="modal-box" onsubmit={createGroup}>
		<h2 class="mb-5 text-lg font-bold">Create a new group</h2>

		<label class="input">
			<span class="label">Name</span>
			<input
				type="text"
				maxlength={userGroupSchema.properties.name.maxLength}
				bind:value={groupName}
			/>
		</label>

		<div class="modal-action">
			<button type="reset" class="btn btn-ghost" onclick={() => createDialog?.close()}
				>Cancel</button
			>
			<button type="submit" class="btn btn-primary" disabled={!groupName.length}>Create</button>
		</div>
	</form>
</dialog>

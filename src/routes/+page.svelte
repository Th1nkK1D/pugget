<script lang="ts">
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';

	let name = $state('');
	let isLoading = $state(false);

	let rxdb = useRxdb();
	let user = $derived(rxdb.collections?.users.findOne().$);

	async function createAccount(e: SubmitEvent) {
		isLoading = true;
		e.preventDefault();

		await rxdb.collections?.users.insert({
			id: crypto.randomUUID(),
			name
		});

		isLoading = false;
	}
</script>

<div class="container flex h-full min-h-screen flex-col items-center justify-center gap-8">
	<h1 class="text-4xl font-bold">🐶 Pugket</h1>
	<form class="flex flex-col justify-center gap-2" onsubmit={createAccount}>
		<label class="input">
			<span class="label">Name</span>
			<input type="text" maxlength="12" bind:value={name} />
		</label>

		<button type="submit" class="btn btn-primary {isLoading ? 'loading loading-spinner' : ''}"
			>Get start</button
		>

		{#if $user}
			<p>Logged in as "{$user.name}"</p>
		{/if}
	</form>
</div>

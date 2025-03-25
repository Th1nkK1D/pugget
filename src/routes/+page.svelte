<script lang="ts">
	import { goto } from '$app/navigation';
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';

	let name = $state('');

	let rxdb = useRxdb();

	$effect(() => {
		rxdb.collections?.users.findOne().$.subscribe((user) => {
			if (user) {
				goto('/app', { replaceState: true });
			}
		});
	});

	async function createAccount(e: SubmitEvent) {
		e.preventDefault();

		await rxdb.collections?.users.insert({
			id: crypto.randomUUID(),
			name
		});
	}
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-8">
	<h1 class="max-w-64 text-center text-6xl font-light">
		Welcome to a <span class="font-bold">P2P Expense Tracker</span>
	</h1>
	<form class="flex flex-col justify-center gap-3" onsubmit={createAccount}>
		<label class="input">
			<span class="label">Name</span>
			<input type="text" maxlength="12" bind:value={name} />
		</label>

		<button type="submit" class="btn btn-primary">Get Start</button>
	</form>
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { hashString } from '$lib/hash';
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';
	import { userSchema } from '$lib/rxdb/user';

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

		const id = crypto.randomUUID();

		await rxdb.collections?.users.insert({
			id,
			hash: await hashString(id),
			name,
			createdAt: new Date().getTime()
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
			<input type="text" maxlength={userSchema.properties.name.maxLength} bind:value={name} />
		</label>

		<button type="submit" class="btn btn-primary">Get Start</button>
	</form>
</div>

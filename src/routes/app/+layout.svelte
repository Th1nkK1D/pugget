<script lang="ts">
	import { goto } from '$app/navigation';
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';

	let { children } = $props();

	let rxdb = useRxdb();

	$effect(() => {
		rxdb.currentUser?.subscribe((user) => {
			if (!user) {
				goto('/', { replaceState: true });
			}
		});
	});
</script>

{@render children()}

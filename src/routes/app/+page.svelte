<script lang="ts">
	import { useRxdb } from '$lib/rxdb/rxdb.svelte';

	let rxdb = useRxdb();
	let user = $derived(rxdb.collections?.users.findOne().$);
</script>

<h1>Hello {$user?.name}</h1>

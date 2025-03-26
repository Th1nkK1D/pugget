<script lang="ts">
	import { CirclePlusIcon } from '@lucide/svelte';

	let newGroupInput = $state('');

	let createDialog = $state<HTMLDialogElement>();

	function createGroup() {
		console.log(newGroupInput);
		createDialog?.close();
		newGroupInput = '';
	}
</script>

<p class="m-auto">You don't have any groups (just yet)</p>

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
			<input type="text" maxlength="24" bind:value={newGroupInput} />
		</label>

		<div class="modal-action">
			<button type="reset" class="btn btn-ghost" onclick={() => createDialog?.close()}
				>Cancel</button
			>
			<button type="submit" class="btn btn-primary" disabled={!newGroupInput.length}>Create</button>
		</div>
	</form>
</dialog>

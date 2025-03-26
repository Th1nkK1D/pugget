<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { MoonIcon, SunIcon } from '@lucide/svelte';

	const STORAGE_THEME_KEY = 'theme';

	let { children } = $props();
	let isDarkMode = $state(false);

	onMount(() => {
		const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);

		isDarkMode = savedTheme
			? savedTheme === 'coffee'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	$effect(() => {
		const theme = isDarkMode ? 'coffee' : 'retro';

		window.document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem(STORAGE_THEME_KEY, theme);
	});
</script>

<div class="flex min-h-dvh flex-col">
	<div class="navbar bg-base-200 shadow-sm">
		<div class="navbar-start"></div>
		<div class="navbar-center">
			<span class="font-bold">🐶 Pugget</span>
		</div>
		<div class="navbar-end">
			<label class="swap swap-rotate">
				<input type="checkbox" bind:checked={isDarkMode} />
				<SunIcon class="swap-on" />
				<MoonIcon class="swap-off" />
			</label>
		</div>
	</div>
	<div class="flex flex-1 flex-col p-3">{@render children()}</div>
</div>

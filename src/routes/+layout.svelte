<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { currentPageTitle } from '$lib/stores/stores';
	import { fade, slide } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();

	export let data: LayoutData;

	$currentPageTitle = 'Home';
</script>

<ModeWatcher />

<div class=" h-screen w-screen">
	<div class="h-16">
		<NavBar />
	</div>
	{#key data.pathname}
		<main
			class="flex h-[calc(100vh-4rem)] flex-col"
			in:fade={{ duration: 150, delay: 150 }}
			out:fade={{ duration: 150 }}
		>
			<slot />
		</main>
	{/key}
</div>

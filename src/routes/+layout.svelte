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

<div
	class=" h-screen w-screen
	 "
>
	<div class="h-16">
		<NavBar />
	</div>
	{#key data.pathname}
		<main
			class=" custom-bg-animation flex h-[calc(100vh-4rem)] animate-[breathe_2s_ease-in-out_infinite] flex-col bg-gradient-to-t from-primary via-accent via-15% to-background to-80% bg-[length:100%_400%]"
			in:fade={{ duration: 150, delay: 150 }}
			out:fade={{ duration: 150 }}
		>
			<slot />
		</main>
	{/key}
</div>

<style>
	.custom-bg-animation {
		animation: breathe 2.5s ease-in-out infinite alternate;
	}
	@keyframes breathe {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 0 12.5%;
		}
	}
</style>

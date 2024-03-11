<script lang="ts">
	import { Github, Home, Settings } from 'lucide-svelte';
	import ToggleMode from './ToggleMode.svelte';
	import { currentPageTitle } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { bounceIn, bounceOut } from 'svelte/easing';

	let ready = false;

	onMount(() => (ready = true));
</script>

{#if ready}
	<nav
		class="flex h-full items-center justify-between bg-background_light px-4 py-2 text-foreground shadow shadow-primary dark:shadow-md dark:shadow-primary"
	>
		<h3 in:slide={{ duration: 300, delay: 150, axis: 'x' }} class="whitespace-nowrap text-nowrap">
			{$currentPageTitle}
		</h3>
		<div class="flex items-center gap-4">
			<a href="/" in:fly={{ duration: 500, delay: 250, x: 100, easing: bounceOut }}><Home /></a>
			<a
				href="https://github.com/Havelex/proto-portfolio"
				in:fly={{ duration: 500, delay: 350, x: 100, easing: bounceOut }}><Github /></a
			>
			<div
				class="flex items-center justify-center"
				in:fly={{ duration: 500, delay: 450, x: 100, easing: bounceOut }}
			>
				<ToggleMode />
			</div>
			<div
				class="flex items-center justify-center"
				in:fly={{ duration: 500, delay: 550, x: 100, easing: bounceOut }}
			>
				<Settings class="transition-transform hover:rotate-180" />
			</div>
		</div>
	</nav>
{/if}

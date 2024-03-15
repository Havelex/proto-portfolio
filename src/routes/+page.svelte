<script lang="ts">
	import { currentPageTitle } from '$lib/stores/stores';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let ready = false;

	onMount(() => (ready = true));

	$currentPageTitle = 'Home';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if ready}
	<div class="flex flex-grow flex-col items-center justify-center pt-32">
		<div in:scale={{ duration: 300 }} out:scale={{ duration: 300, delay: 100 }}>
			<h1
				class="animate-gradient inline-block min-h-[1.15em] text-center font-bold text-transparent sm:text-[9rem]"
			>
				English Portfolio
			</h1>
		</div>
		<span
			class="mt-6 text-2xl font-bold sm:mt-0"
			in:fly={{ duration: 300, delay: 100, y: -50 }}
			out:fly={{ duration: 300, y: -150 }}>Max Lamprecht 2023/24</span
		>
		<div class="mt-32 flex items-center justify-center gap-5">
			<span class="text-3xl font-bold" transition:fly={{ duration: 300, x: -150 }}>Explore now</span
			>
			<a
				href="/explore/sections/Guides/posts/ExplorerGuide"
				transition:fly={{ duration: 300, x: 150 }}
			>
				<div
					class="animate-bounce-right flex aspect-square w-10 items-center justify-center rounded-full border-2 border-accent bg-background_light hover:border-foreground hover:text-accent"
				>
					<ArrowRight class="hover:text-text" />
				</div>
			</a>
		</div>
	</div>
{/if}

<style>
	.animate-gradient {
		background: linear-gradient(
			90deg,
			var(--primary) 0%,
			var(--accent) 25%,
			var(--secondary) 50%,
			var(--accent) 75%,
			var(--primary) 100%
		);
		background-clip: text;
		background-size: 200% 100%;
		animation: gradient 3s linear infinite;
	}

	@keyframes gradient {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>

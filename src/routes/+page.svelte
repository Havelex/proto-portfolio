<script lang="ts">
	import { currentPageTitle } from '$lib/stores/stores';
	import { ArrowRight } from 'lucide-svelte';

	$currentPageTitle = 'Home';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<div class="flex flex-grow flex-col items-center justify-center pt-32">
	<div>
		<h1 class="animate-gradient inline-block h-[1.15em] font-bold text-transparent sm:text-9xl">
			English Portfolio
		</h1>
	</div>
	<span class="text-2xl font-bold">Max Lamprecht 2023/24</span>
	<div class="mt-32 flex items-center justify-center gap-5">
		<span class="text-3xl font-bold">Explore now</span>
		<a href="/explore/sections/Guides/posts/ExplorerGuide">
			<div
				class="animate-bounce-right flex aspect-square w-10 items-center justify-center rounded-full border-2 border-accent bg-background_light hover:border-foreground hover:text-accent"
			>
				<ArrowRight class="hover:text-text" />
			</div>
		</a>
	</div>
</div>

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

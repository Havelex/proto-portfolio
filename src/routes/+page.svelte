<script lang="ts">
	import { currentPageTitle } from '$lib/stores/stores';
	import { ArrowRight } from 'lucide-svelte';

	$currentPageTitle = 'Home';
</script>

<div class="flex flex-grow flex-col items-center justify-center pt-32">
	<h1 class="sm:text-9xl">English Portfolio</h1>
	<span class="font-bold text-2xl">Max Lamprecht 2023/24</span>
	<div class="mt-32 flex items-center justify-center gap-5">
		<span class="font-bold text-3xl">Explore now</span>
		<a href="/starmap">
			<div
				class="animate-bounce-right flex items-center justify-center bg-background_light rounded-full border-2 hover:border-foreground hover:text-accent border-accent aspect-square w-10"
			>
				<ArrowRight class="hover:text-text" />
			</div>
		</a>
	</div>
</div>

<style>
	@keyframes bounce-right {
		0%,
		100% {
			transform: translateX(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateX(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}

	.animate-bounce-right {
		animation: bounce-right 1s infinite;
	}
</style>

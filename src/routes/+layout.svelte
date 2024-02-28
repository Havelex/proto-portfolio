<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<ModeWatcher />

<div
	class="custom-bg-animation flex h-screen w-screen
	animate-[breathe_2s_ease-in-out_infinite] flex-col bg-gradient-to-t from-primary via-accent via-15% to-background to-80% bg-[length:100%_400%]"
>
	<NavBar />
	<slot />
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

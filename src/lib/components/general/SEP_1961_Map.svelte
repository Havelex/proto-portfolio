<script lang="ts">
	import { mode, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	let glassIntact = true;
	let taps = 0;
	let shaking = false;

	onMount(() => setMode('light'));
</script>

{#if $mode === 'dark'}
	<button
		class={`rounded px-4 ${glassIntact && 'bg-secondary'} ${shaking && 'shaking'}`}
		on:click|stopPropagation={() => (
			(++taps > 13 && ((glassIntact = false), true)) || (shaking = true),
			setTimeout(() => (shaking = false), 500)
		)}
	>
		<img src="/images/SEP_1961_Map.png" alt="map" class={`${glassIntact && 'opacity-25'}`} />
	</button>
{/if}

<style>
	.shaking {
		animation: shake 0.1s infinite;
	}

	@keyframes shake {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(-5px, -5px) rotate(-1deg);
		}
		50% {
			transform: translate(5px, 5px) rotate(1deg);
		}
		75% {
			transform: translate(-5px, -5px) rotate(-1deg);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>

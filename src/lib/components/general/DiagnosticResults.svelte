<script lang="ts">
	import { mode, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	onMount(() => setMode('dark'));
</script>

<div class={`flex justify-center ${$mode === 'dark' && 'bg-background'}`}>
	<img
		src="/images/geogebra-export.png"
		alt="graph"
		class={`rounded-xl ${$mode === 'dark' && 'opacity-[0.5%]'}`}
	/>
</div>

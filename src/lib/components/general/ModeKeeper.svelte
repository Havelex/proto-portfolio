<script lang="ts">
	import { mode, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	export let desired: 'dark' | 'light';

	onMount(() => setMode('light'));

	$: $mode !== desired && setMode(desired);
</script>

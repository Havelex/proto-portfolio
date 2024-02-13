<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<button on:click={toggleMode}>
	{#if $mode === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>

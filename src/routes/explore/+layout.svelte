<script lang="ts">
	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { currentPageTitle } from '$lib/stores/stores';
	import { onDestroy, onMount } from 'svelte';

	export let data;

	let ready = false;

	onMount(() => (ready = true));
	onDestroy(() => (ready = false));

	$currentPageTitle = 'Explore';
</script>

<svelte:head>
	<title>Explore</title>
</svelte:head>
{#if ready}
	<div class="flex max-h-full grow pt-6">
		<SideBar
			sections={new Map([...data.sections.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])))}
		/>
		<slot />
	</div>
{/if}

<script lang="ts">
	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { currentPageTitle } from '$lib/stores/stores';

	export let data;

	$currentPageTitle = 'Explore';
</script>

<svelte:head>
	<title>Explore</title>
</svelte:head>
<div class="flex max-h-[calc(100%-64px)] grow pt-6">
	<SideBar
		sections={new Map([...data.sections.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])))}
	/>
	<div class="flex h-full grow flex-col items-center overflow-y-scroll pb-5">
		<slot />
	</div>
	<div class="mx-4 flex h-full w-10 items-center justify-center" />
</div>

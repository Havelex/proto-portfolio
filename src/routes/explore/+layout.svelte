<script lang="ts">
	import { browser } from '$app/environment';
	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { currentPageTitle } from '$lib/stores/stores';
	import type { Metadata } from '$lib/types/types.js';
	import { ChevronsRight } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let data;

	let ready = false;
	let showSideBar = false;
	// let sections: Map<
	// 	string,
	// 	{
	// 		path: string;
	// 		metadata: Metadata;
	// 	}[]
	// >;

	onMount(() => {
		const sideBarOpen = localStorage.getItem('sideBarOpen');
		(sideBarOpen !== null && (showSideBar = JSON.parse(sideBarOpen))) ||
			localStorage.setItem('sideBarOpen', JSON.stringify(showSideBar));
		ready = true;
	});

	$: ready && browser && localStorage.setItem('sideBarOpen', JSON.stringify(showSideBar));
	onDestroy(() => (ready = false));

	$currentPageTitle = 'Explore';

	// $: sections = data && data.sections;
</script>

<svelte:head>
	<title>Explore</title>
</svelte:head>
{#if ready}
	<div class="relative flex max-h-full grow pt-6">
		<div class="z-40 flex h-full">
			{#if showSideBar}
				<SideBar
					sections={new Map(
						[...data.sections.entries()].sort(
							(e1, e2) => (
								e1[1].sort((v1, v2) => v1.metadata.title.localeCompare(v2.metadata.title)),
								e1[0].localeCompare(e2[0])
							)
						)
					)}
				/>
			{/if}

			<div class="mx-4 flex h-full w-10 items-center justify-center">
				<button
					on:click={() => (showSideBar = !showSideBar)}
					class={`${showSideBar && 'hover:animate-bounce-left'} hover:animate-bounce-right`}
				>
					<div
						class=" flex items-center justify-center"
						in:fly={{ duration: 300, delay: 150, x: -100 }}
						out:fly={{ duration: 300, x: -100 }}
					>
						<ChevronsRight
							class={`${showSideBar && '-rotate-180'} size-10 transition-transform duration-300`}
						/>
					</div>
				</button>
			</div>
		</div>
		<slot />
	</div>
{/if}

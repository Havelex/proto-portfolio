<script lang="ts">
	import { currentPageTitle, selectedItem } from '$lib/stores/stores';
	import type { Metadata } from '$lib/types/types';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import SearchBar from './SearchBar.svelte';

	$currentPageTitle = 'Explore';

	export let sections: Map<string, { path: string; metadata: Metadata }[]>;

	let filteredSections = sections;
	let searchValue = '';
	$: {
		filteredSections = sections;
		if (searchValue.trim().length > 0) {
			const filteredEntries = [...filteredSections.entries()]
				.map(([k, v]) => {
					const filteredItems = v.filter(
						(val): boolean =>
							val.metadata.title.toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !==
								-1 ||
							(val.metadata.tags?.some(
								(tag) => tag.toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !== -1
							) ??
								false)
					);
					if (filteredItems.length > 0) return [k, filteredItems];
					if (k.toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !== -1) return [k, v];
					return null;
				})
				.filter((entry) => entry !== null);
			filteredSections = new Map(
				filteredEntries as
					| Iterable<
							readonly [
								string,
								{
									path: string;
									metadata: Metadata;
								}[]
							]
					  >
					| null
					| undefined
			);
		}
	}
</script>

<div
	class="absolute top-0 flex h-full w-full flex-col items-center justify-center whitespace-nowrap bg-black bg-opacity-80 px-16 pt-16 backdrop-blur-sm sm:relative sm:w-min sm:items-start sm:bg-transparent sm:pl-16 sm:pr-0 sm:pt-0"
	transition:slide={{ duration: 300, easing: quintInOut, axis: 'x' }}
>
	<SearchBar bind:searchValue />
	{#key filteredSections}
		<div
			class="flex h-full flex-col gap-7 overflow-y-scroll py-4 text-background dark:text-foreground sm:bg-transparent sm:text-foreground"
		>
			{#if [...filteredSections.entries()].length > 0}
				{#each filteredSections.entries() as section}
					<div class="flex flex-col pr-2">
						<span class="flex text-2xl sm:text-base"><b>{section[0]}</b></span>
						<div
							class="flex flex-col gap-2 border-l-2 border-l-foreground_pale sm:flex-col sm:gap-0 sm:border-l"
						>
							{#each section[1] as item}
								{@const itemName = (() => {
									const splitted = item.path.split('/');
									return splitted[splitted.length - 1].split('.')[0];
								})()}
								<a
									href={`/explore/sections/${item.metadata.section}/posts/${itemName}`}
									class={`base:text-base ml-4 text-xl ${
										$selectedItem &&
										item.metadata.section === $selectedItem.section &&
										item.metadata.title === $selectedItem.title &&
										'text-accent'
									} hover:text-secondary`}
								>
									<span class="text-xl sm:text-sm">{item.metadata.title}</span>
								</a>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex w-full justify-center">No scrolls match your spell</div>
			{/if}
		</div>
	{/key}
</div>

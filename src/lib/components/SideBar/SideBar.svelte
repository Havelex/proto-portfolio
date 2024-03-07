<script lang="ts">
	import { currentPageTitle, selectedItem } from '$lib/stores/stores';
	import type { Metadata, Section } from '$lib/types/types';
	import { ChevronsRight, Search, Triangle } from 'lucide-svelte';
	import { mode } from 'mode-watcher';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	$currentPageTitle = 'Explore';

	export let sections: Map<string, { path: string; metadata: Metadata }[]>;

	let filteredSections = sections;
	let searchValue = '';
	let open = false;
	let mounted = false;

	onMount(() => {
		const sideBarOpen = localStorage.getItem('sideBarOpen');
		(sideBarOpen !== null && (open = JSON.parse(sideBarOpen))) ||
			localStorage.setItem('sideBarOpen', JSON.stringify(open));
		mounted = true;
	});

	$: mounted && browser && localStorage.setItem('sideBarOpen', JSON.stringify(open));
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

<div class="flex h-full">
	{#if open}
		<div
			class="flex h-full w-min flex-col whitespace-nowrap pl-16"
			transition:slide={{ duration: 300, easing: quintInOut, axis: 'x' }}
		>
			<div class="pointer-events-none z-10 pb-4 shadow-xl shadow-background">
				<div
					class="pointer-events-auto flex rounded-md bg-background_light p-2 shadow shadow-primary"
				>
					<input
						type="text"
						bind:value={searchValue}
						placeholder="Search...again..."
						class="mx-2 bg-transparent bg-none focus:outline-none"
					/>
					<Search class="" />
				</div>
			</div>
			<div class="flex h-full flex-col gap-7 overflow-y-scroll py-4">
				{#if [...filteredSections.entries()].length > 0}
					{#each filteredSections.entries() as section}
						<div class="flex flex-col pr-2">
							<span class="flex"><b>{section[0]}</b></span>
							<div class="flex flex-col border-l border-l-foreground_pale">
								{#each section[1] as item}
									{@const itemName = (() => {
										const splitted = item.path.split('/');
										return splitted[splitted.length - 1].split('.')[0];
									})()}
									<a
										href={`/explore/sections/${item.metadata.section}/posts/${itemName}`}
										class={`ml-4 ${
											item.metadata.section === $selectedItem.section &&
											item.metadata.title === $selectedItem.title &&
											'text-accent'
										}`}
									>
										<span class="text-sm">{item.metadata.title}</span>
									</a>
								{/each}
							</div>
						</div>
					{/each}
				{:else}
					<div class="flex w-full justify-center">No scrolls match your spell</div>
				{/if}
			</div>
		</div>
	{/if}
	<div class="mx-4 flex h-full w-10 items-center justify-center">
		<button
			on:click={() => (open = !open)}
			class={`${open && 'hover:animate-bounce-left'} hover:animate-bounce-right`}
		>
			<ChevronsRight class={`${open && '-rotate-180'} size-10 transition-transform duration-300`} />
		</button>
	</div>
</div>

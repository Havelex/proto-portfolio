<script lang="ts">
	import { currentPageTitle } from '$lib/stores/stores';
	import { mockSections } from '$lib/utils/mock';
	import type { Section } from '$lib/utils/types';
	import { Search } from 'lucide-svelte';

	$currentPageTitle = 'Explore';

	const sections: Section[] = mockSections;

	let searchValue = '';
	const search = () => {};
</script>

<div class=" ml-24 flex h-full w-min flex-col">
	<div class="pointer-events-none z-10 pb-4 shadow-xl shadow-background">
		<div class="pointer-events-auto flex rounded-md bg-background_light p-2 shadow shadow-primary">
			<input
				type="text"
				bind:value={searchValue}
				placeholder="Search...again..."
				class="mx-2 bg-transparent bg-none focus:outline-none"
			/>
			<button on:click={search}>
				<Search class="" />
			</button>
		</div>
	</div>
	<div class="flex h-full flex-col gap-7 overflow-y-scroll">
		{#each sections as section}
			<div class="flex flex-col pr-2">
				<a href={`./${section.name}`} class="flex"><b>{section.name}</b></a>
				<div class="flex flex-col border-l border-l-foreground_pale">
					{#each section.items as subsection}
						<a href={subsection.name} class="ml-4">
							<span class="text-sm">{subsection.name}</span>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

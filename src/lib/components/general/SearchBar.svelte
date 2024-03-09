<script lang="ts">
	import { Filter, Search } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let searchValue = '';
	let searchCategories: string[] = ['All'];
	let selectedSearchCategory: string;
	let showFilter = false;

	const search = () => {};
</script>

<div class="relative flex rounded-md bg-background p-2 shadow-[inset_0_-0.5px_4px_var(--primary)]">
	<button
		on:click={() => {
			showFilter = !showFilter;
		}}
	>
		<Filter />
	</button>
	<input
		type="text"
		bind:value={searchValue}
		placeholder="Search..."
		class="mx-2 bg-transparent bg-none focus:outline-none"
	/>
	<button on:click={search}>
		<Search />
	</button>

	{#if showFilter}
		<div
			transition:slide={{ duration: 500 }}
			class="shadow-heavy absolute left-0 top-full mt-5 flex w-full flex-col rounded-lg bg-background_light p-5 backdrop:bg-black backdrop:opacity-50"
		>
			<h4>Filter</h4>
			<div class="flex flex-col">
				<label for="category" class="font-text"><b>Category</b></label>
				<select bind:value={selectedSearchCategory} name="category" class="w-max rounded-md p-1">
					{#each searchCategories as searchCategory, i (i)}
						<option
							value={searchCategory}
							class="bg-transparent bg-none focus:bg-transparent focus:bg-none"
							>{searchCategory}</option
						>
					{/each}
				</select>
			</div>
			<button on:click={() => (showFilter = false)} class="w-min self-end rounded-md bg-accent p-2">
				<b>Apply</b>
			</button>
		</div>
	{/if}
</div>

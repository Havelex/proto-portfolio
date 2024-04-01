<script lang="ts">
	import { Search } from 'lucide-svelte';
	export let searchValue = '';
</script>

<div class="pointer-events-none z-10 pb-4">
	<div class="pointer-events-auto flex w-min rounded-md bg-background_light p-2">
		<input
			type="text"
			bind:value={searchValue}
			placeholder="Search..."
			class="mx-2 bg-transparent bg-none text-xl focus:outline-none sm:text-base"
		/>
		<Search class="" />
	</div>
</div>

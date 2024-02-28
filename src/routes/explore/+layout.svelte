<script lang="ts">
	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { currentPageTitle } from '$lib/stores/stores';

	$currentPageTitle = 'Home';
</script>

<div class="flex max-h-[calc(100%-64px)] grow pt-6">
	<SideBar />
	<div class="flex h-full grow justify-center overflow-y-scroll">
		<slot />
	</div>
</div>

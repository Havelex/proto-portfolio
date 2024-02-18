<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import ToggleMode from './ToggleMode.svelte';
	import { currentPageTitle } from '$lib/stores/stores';
</script>

<div
	class="top-0 sticky flex justify-between items-center p-2 bg-background_light text-foreground shadow-primary shadow-md"
>
	<h3>{$currentPageTitle}</h3>
	<div class="flex space-x-2 items-center">
		<ToggleMode />
		<Menu />
	</div>
</div>

<script lang="ts">
	import { Home, Settings } from 'lucide-svelte';
	import ToggleMode from './ToggleMode.svelte';
	import { currentPageTitle } from '$lib/stores/stores';
</script>

<div
	class="flex h-16 items-center justify-between bg-background_light px-4 py-2 text-foreground shadow shadow-primary dark:shadow-md dark:shadow-primary"
>
	<h3>{$currentPageTitle}</h3>
	<div class="flex items-center space-x-2">
		<a href="/"><Home /></a>
		<ToggleMode />
		<Settings class="transition-transform hover:rotate-180" />
	</div>
</div>

<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import ToggleMode from './ToggleMode.svelte';
</script>

<div
	class="top-0 sticky flex justify-between items-center p-2 bg-accent text-background shadow-primary shadow-md"
>
	<h2>Placeholder</h2>
	<div class="flex space-x-2 items-center">
		<ToggleMode />
		<Menu />
	</div>
</div>

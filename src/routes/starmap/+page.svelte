<script lang="ts">
	import NodeMap from '$lib/components/NodeMap/NodeMap.svelte';
	import { currentPageTitle } from '$lib/stores/stores';

	let mapRoot: HTMLElement;

	$currentPageTitle = 'Explore';
</script>

<div bind:this={mapRoot}>
	<NodeMap root={mapRoot} />
</div>

<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<ModeWatcher />
<NavBar />
<slot />

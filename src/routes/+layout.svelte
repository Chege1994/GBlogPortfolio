<script>
	import '../app.css';
	let { children } = $props();
	import Navbar from './components/Navbar/Navbar.svelte';
</script>

<Navbar />

{@render children()}

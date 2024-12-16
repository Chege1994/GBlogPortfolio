<script>
	import '../app.css';
	let { children } = $props();
</script>

<nav class="bg-gray-800 p-4 text-white">
	<ul class="flex space-x-4">
		<li><a href="/" class="hover:underline">Home</a></li>
		<li><a href="/projects" class="hover:underline">Projects</a></li>
		<li><a href="/blog" class="hover:underline">Blog</a></li>
		<li><a href="/tools/converter" class="hover:underline">Tools</a></li>
	</ul>
</nav>
{@render children()}

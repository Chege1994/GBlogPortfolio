<script>
	const projects = [
		{
			name: 'Project A',
			description: 'A short description of Project A.',
			link: 'https://github.com/yourusername/project-a'
		},
		{
			name: 'Project B',
			description: 'A short description of Project B.',
			link: 'https://github.com/yourusername/project-b'
		},
		{
			name: 'Project C',
			description: 'A short description of Project B.',
			link: 'https://github.com/yourusername/project-b'
		},
		{
			name: 'Project D',
			description: 'A short description of Project B.',
			link: 'https://github.com/yourusername/project-b'
		},
		{
			name: 'Project E',
			description: 'A short description of Project B.',
			link: 'https://github.com/yourusername/project-b'
		}
	];
</script>

<div class="container mx-auto mt-10 p-5">
	<h1 class="mb-5 text-4xl font-bold">My Projects</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each projects as project}
			<div class="rounded-lg bg-white p-5 shadow-lg transition-shadow hover:shadow-xl">
				<h2 class="mb-2 text-2xl font-semibold">{project.name}</h2>
				<p class="mb-4 text-gray-700">{project.description}</p>
				<a href={project.link} target="_blank" class="text-blue-500 hover:underline">
					View Project
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	:global(body) {
		background-color: #f9fafb;
		font-family: 'Inter', sans-serif;
	}
</style>

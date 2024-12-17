<script>
	import { AccordionItem, Accordion, Button } from 'flowbite-svelte';

	// Example dynamic projects
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
			description: 'A short description of Project C.',
			link: 'https://github.com/yourusername/project-c'
		}
	];

	// Boolean array for controlling which accordion items are open
	let items = Array(projects.length).fill(false);

	// Functions to control opening and closing all items
	const open_all = () => (items = items.map(() => true));
	const close_all = () => (items = items.map(() => false));
</script>

<div class="container mx-auto mt-10 p-5">
	<h1 class="mb-5 text-4xl font-bold">My Projects</h1>

	<!-- Buttons to open or close all accordions -->
	<Button on:click={open_all} class="mb-4">Open All</Button>
	<Button on:click={close_all}>Close All</Button>

	<!-- Accordion displaying the list of projects -->
	<Accordion multiple>
		{#each projects as project, index}
			<AccordionItem bind:open={items[index]}>
				<span slot="header">{project.name}</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">{project.description}</p>
				<a
					href={project.link}
					target="_blank"
					class="text-blue-600 hover:underline dark:text-blue-500"
				>
					View Project
				</a>
			</AccordionItem>
		{/each}
	</Accordion>
</div>

<style>
	:global(body) {
		background-color: #f9fafb;
		font-family: 'Inter', sans-serif;
	}
</style>

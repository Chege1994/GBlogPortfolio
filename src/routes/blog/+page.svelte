<script>
	import { P } from 'flowbite-svelte';
	import { Blockquote, Rating } from 'flowbite-svelte';
	import { Textarea } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let textareaprops = {
		id: 'message',
		name: 'message',
		label: 'Your message',
		rows: 4,
		placeholder: 'Leave a comment...'
	};

	let username = '';
	let comment = '';
	let email = '';
	let comments = [];

	async function submitComment() {
		const response = await fetch('/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, comment, email })
		});

		if (response.ok) {
			username = '';
			comment = '';
			email = '';
			fetchComments();
		}
	}

	async function fetchComments() {
		const response = await fetch('/api/comments');
		if (response.ok) {
			comments = await response.json();
		}
	}

	onMount(fetchComments);

	// Function to format the date
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="flex justify-around">
	<div class="w-[70vw]">
		<div class="mb-8 flex flex-col space-y-6 pb-7">
			{#each comments as { username, comment, timestamp }}
				<figure class="max-w-screen-md">
					<div class="mb-4 flex items-center text-yellow-300">
						<Rating total={5} rating={4.66} ceil size="24" />
					</div>
					<Blockquote italic={false} size="2xl">{comment}</Blockquote>
					<figcaption class="mt-6 flex items-center space-x-3 rtl:space-x-reverse">
						<img
							class="h-6 w-6 rounded-full"
							src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
							alt="Bonnie Green profile"
						/>
						<div
							class="flex items-center divide-x-2 divide-gray-300 rtl:divide-x-reverse dark:divide-gray-700"
						>
							<cite class="pe-3 font-medium text-gray-900 dark:text-white">{username}</cite>
							<cite class="ps-3 text-sm font-light text-gray-500 dark:text-gray-400"
								>{formatDate(timestamp)}</cite
							>
						</div>
					</figcaption>
				</figure>
			{/each}
		</div>

		<!-- Comment form -->
		<h2 class="mt-8 text-xl font-semibold">Leave a Comment</h2>
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<input
				type="text"
				bind:value={username}
				placeholder="Your Name"
				class="mb-4 w-full rounded-md border p-3 shadow-sm"
				required
			/>
			<input
				type="email"
				bind:value={email}
				placeholder="Your Email (optional)"
				class="mb-4 w-full rounded-md border p-3 shadow-sm"
			/>
			<Textarea
				{...textareaprops}
				bind:value={comment}
				class="mb-4 w-full rounded-md border p-3 shadow-sm"
				required
			/>
			<button
				type="button"
				on:click={submitComment}
				class="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700"
			>
				Submit
			</button>
		</div>
	</div>
</div>

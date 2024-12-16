<script>
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
</script>

<h3>Recent Comments</h3>
{#each comments as { username, comment, timestamp }}
	<div class="comment">
		<p><strong>{username}</strong>:</p>
		<p>{comment}</p>
		<p><small>Posted on {timestamp}</small></p>
	</div>
{/each}

<h2>კომენტარები</h2>

<div>
	<input type="text" bind:value={username} placeholder="Your Name" required />
	<input type="email" bind:value={email} placeholder="Your Email (optional)" />
	<Textarea {...textareaprops} bind:value={comment} required />
	<button on:click={submitComment}>Submit</button>
</div>

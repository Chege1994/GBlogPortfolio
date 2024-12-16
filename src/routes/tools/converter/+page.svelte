<script>
	let file;
	let pdfUrl = '';

	async function uploadFile() {
		if (!file) return alert('Please select a Word file.');

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('/api/tools/converter', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();
			if (response.ok) {
				pdfUrl = result.pdfUrl;
			} else {
				alert(result.error);
			}
		} catch (error) {
			console.error('Error uploading file:', error.message);
			alert('Failed to upload the file. Please try again.');
		}
	}
</script>

<h1>Word to PDF Converter</h1>
<div>
	<input type="file" accept=".docx" on:change={(e) => (file = e.target.files[0])} />
	<button on:click={uploadFile}>Convert</button>
</div>

{#if pdfUrl}
	<div>
		<a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
	</div>
{/if}

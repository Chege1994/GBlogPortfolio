<script>
	import { Label, Helper, Fileupload, Indicator } from 'flowbite-svelte';
	let fileuploadprops = {
		id: 'file_upload',
		accept: '.docx', // Only accept Word files
		multiple: false // Single file upload
	};
	import { StepIndicator } from 'flowbite-svelte';
	let file = null;
	let pdfUrl = '';
	let currentStep = 0; // Track the current step in the process

	async function uploadFile() {
		if (!file) return alert('Please select a Word file.');

		// Move to Step 2: File Uploading
		currentStep = 2;

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('/api/tools/converter', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();
			if (response.ok) {
				// Move to Step 3: Conversion Success
				currentStep = 3;
				pdfUrl = result.pdfUrl;
			} else {
				alert(result.error);
				currentStep = 1; // Reset to Step 1 on error
			}
		} catch (error) {
			console.error('Error uploading file:', error.message);
			alert('Failed to upload the file. Please try again.');
			currentStep = 1; // Reset to Step 1 on error
		}
	}
</script>

<div
	class="flex h-screen w-full items-center justify-center bg-gradient-to-r from-slate-50 from-0% via-slate-100 via-50% to-slate-400 to-100%"
>
	<div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
		<h1 class="mb-6 text-center text-3xl font-semibold text-gray-900">Word to PDF</h1>

		<!-- Stepper Indicator -->
		<ol class="mb-6 flex w-full items-center justify-around">
			<li class=" text-center">
				<Indicator
					size="md"
					color={currentStep >= 1 ? 'primary' : 'gray'}
					class={currentStep >= 1 ? 'z-10 bg-gray-900 ring-0 ' : ''}
				/>
			</li>
			<li class=" text-center">
				<Indicator
					size="md"
					color={currentStep >= 2 ? 'primary' : 'gray'}
					class={currentStep >= 2 ? 'z-10 bg-gray-900 ring-0 ' : ''}
				/>
			</li>
			<li class=" text-center">
				<Indicator
					size="md"
					color={currentStep >= 3 ? 'primary' : 'gray'}
					class={currentStep >= 3 ? 'z-10 bg-gray-900 ring-0 ' : ''}
				/>
			</li>
		</ol>

		<!-- File Upload -->
		<div class="mb-6">
			<Fileupload
				class="mb-4 w-full border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-center "
				{...fileuploadprops}
				on:change={(e) => {
					const selectedFiles = e.target.files || e.detail.files; // Ensure compatibility
					file = selectedFiles ? selectedFiles[0] : null; // Get the first file
					if (file) currentStep = 1; // Highlight Step 1
				}}
			/>
			<Helper class="text-xs text-gray-900 dark:text-black">Word File (MAX. 3mb).</Helper>
		</div>

		<!-- Convert Button -->
		<button
			class="mb-4 w-full rounded-lg bg-gray-800 py-3 text-white transition hover:bg-gray-900"
			on:click={uploadFile}
			disabled={!file || currentStep > 1}
		>
			Convert
		</button>

		<!-- Download Link -->
		{#if pdfUrl}
			<div class="mt-4 text-start dark:text-white">
				<a
					href={pdfUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-700 underline hover:text-blue-800"
				>
					Download PDF
				</a>
			</div>
		{/if}
	</div>
</div>

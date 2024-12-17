<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Navbar from './Navbar.svelte';
	import { fn } from '@storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'New/Navbar',
		component: Navbar,
		tags: ['autodocs'],
		argTypes: {
			backgroundColor: { control: 'color' },
			size: {
				control: { type: 'select' },
				options: ['small', 'medium', 'large']
			}
		},
		args: {
			onClick: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ primary: true, label: 'Navbar' }} />

<Story name="Secondary" args={{ label: 'Navbar' }} />

<Story name="Large" args={{ size: 'large', label: 'Navbar' }} />

<Story name="Small" args={{ size: 'small', label: 'Navbar' }} />

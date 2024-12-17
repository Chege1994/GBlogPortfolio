import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import flowbitePlugin from 'flowbite/plugin';
import { DarkMode } from 'flowbite-svelte';
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			spacing: {
				1: '8px',
				2: '12px',
				3: '16px',
				4: '24px',
				5: '32px',
				6: '48px',
				7: '64px',
				8: '96px',
				13: '3.25rem',
				15: '3.75rem',
				128: '32rem',
				144: '36rem'
			},
			borderRadius: {
				'4xl': '2rem'
			},

			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B',
					maincolor: '1F2937'
				},
				fontFamily: {
					sans: ['Graphik', 'sans-serif'],
					serif: ['Merriweather', 'serif']
				}
			}
		}
	},
	plugins: [typography, forms, flowbitePlugin, containerQueries]
};

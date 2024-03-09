import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'], smartypants: true })],
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter({}),
		alias: {
			$markdown: './src/markdown/'
		},
		paths: {}
	}
};

export default config;

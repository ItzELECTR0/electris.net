import selfhost from '@sveltejs/adapter-static';
import cloudflare from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess()
	],

	kit: {
		adapter: cloudflare()
	}
};

export default config;
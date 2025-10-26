import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const buildMode = process.env.BUILD_MODE === 'newhome' ? 'newhome' : 'regular';
	
	return {
		plugins: [sveltekit(), tailwindcss()],
		define: {
			__BUILD_MODE__: JSON.stringify(buildMode)
		},
		server: {
			host: '0.0.0.0',
			allowedHosts: ['.electris.net']
		},
		preview: {
			host: '0.0.0.0',
			allowedHosts: ['.electris.net']
		}
	};
});
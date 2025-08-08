import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const buildMode = process.env.BUILD_MODE || 'regular';
	
	return {
		plugins: [sveltekit(), tailwindcss()],
		server: {
			host: '0.0.0.0'
		},
		define: {
			__BUILD_MODE__: JSON.stringify(buildMode)
		}
	};
});
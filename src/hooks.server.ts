import type { Handle } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const buildMode = process.env.BUILD_MODE === 'newhome' ? 'newhome' : 'regular';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	if (buildMode === 'newhome') {
		if (!pathname.startsWith('/newhome')) {
			return new Response(null, {
				status: 302,
				headers: {
					location: '/newhome'
				}
			});
		}
	} else {
		if (pathname.startsWith('/newhome')) {
			throw error(404, 'Page not found');
		}
	}

	const response = await resolve(event);
	return response;
};
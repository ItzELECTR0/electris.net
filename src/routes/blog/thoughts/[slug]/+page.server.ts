import { error } from '@sveltejs/kit';
import { extractMetadata } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  
  if (slug.startsWith('_')) {
    throw error(404, 'Post not found');
  }
  
  try {
    const filePath = join(process.cwd(), 'src', 'routes', 'blog', 'thoughts', `${slug}.html`);
    
    if (!existsSync(filePath)) {
      throw error(404, 'Post not found');
    }
    
    const content = readFileSync(filePath, 'utf-8');
    const metadata = extractMetadata(content);
    
    if (!metadata) {
      throw error(404, 'Post not found or invalid metadata');
    }
    
    const cleanContent = content.replace(/<metadata>[\s\S]*?<\/metadata>/g, '');
    
    return {
      post: {
        slug,
        ...metadata
      },
      content: cleanContent
    };
  } catch (err) {
    console.error('Error loading post:', err);
    throw error(404, 'Post not found');
  }
};
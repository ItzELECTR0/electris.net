import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'dark' | 'light';

const storedTheme = browser ? localStorage.getItem('theme') as Theme : null;
const initialTheme: Theme = storedTheme || 'dark';

export const theme = writable<Theme>(initialTheme);

export function toggleTheme(): void {
  theme.update(currentTheme => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (browser) {
      localStorage.setItem('theme', newTheme);
      
      applyTheme(newTheme);
    }
    
    return newTheme;
  });
}

export function applyTheme(selectedTheme: Theme): void {
  if (!browser) return;
  
  const existingThemeLink = document.getElementById('theme-stylesheet');
  if (existingThemeLink) {
    existingThemeLink.remove();
  }
  
  const link = document.createElement('link');
  link.id = 'theme-stylesheet';
  link.rel = 'stylesheet';
  link.href = `/themes/app.${selectedTheme}.css`;
  document.head.appendChild(link);
  
  document.documentElement.setAttribute('data-theme', selectedTheme);
}
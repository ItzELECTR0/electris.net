import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'midnight' | 'auto';

export const availableThemes = [
  'light',
  'dark',
  'midnight',
  'auto'
] as const;

const storedTheme = browser ? localStorage.getItem('theme') as Theme : null;
const initialTheme: Theme = storedTheme && availableThemes.includes(storedTheme as any) ? storedTheme : 'dark';

export const theme = writable<Theme>(initialTheme);

function getSystemPreference(): 'light' | 'dark' {
  if (!browser) return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(selectedTheme: Theme): 'light' | 'dark' | 'midnight' {
  if (selectedTheme === 'auto') {
    return getSystemPreference();
  }
  return selectedTheme;
}

export function setTheme(newTheme: Theme): void {
  theme.update(() => {
    if (browser) {
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    }
    return newTheme;
  });
}

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
  
  const resolvedTheme = resolveTheme(selectedTheme);
  
  const existingThemeLink = document.getElementById('theme-stylesheet');
  if (existingThemeLink) {
    existingThemeLink.remove();
  }
  
  const link = document.createElement('link');
  link.id = 'theme-stylesheet';
  link.rel = 'stylesheet';
  link.href = `/themes/app.${resolvedTheme}.css`;
  document.head.appendChild(link);
  
  document.documentElement.setAttribute('data-theme', resolvedTheme);
  
  document.documentElement.setAttribute('data-theme-selected', selectedTheme);
}

if (browser) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  mediaQuery.addEventListener('change', () => {
    theme.update(currentTheme => {
      if (currentTheme === 'auto') {
        applyTheme('auto');
      }
      return currentTheme;
    });
  });
  
  theme.subscribe(currentTheme => {
    if (currentTheme) {
      applyTheme(currentTheme);
    }
  });
}
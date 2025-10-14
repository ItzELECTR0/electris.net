<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { isNewHomeMode, isRegularMode } from '$lib/utils/buildMode';
  import NavBar from '$lib/UI/NavBar.svelte';
  import Cursor from '$lib/UI/Cursor.svelte';
  import Popup from '$lib/Mobile/Popup.svelte';
  import { theme, colorScheme, applyStyles } from '$lib/stores/theme';
  import '/src/app.base.css';

  onMount(() => {
    // Subscribe to both theme and colorScheme changes
    const unsubscribeTheme = theme.subscribe(currentTheme => {
      const currentColorScheme = $colorScheme;
      applyStyles(currentTheme, currentColorScheme);
    });

    const unsubscribeColorScheme = colorScheme.subscribe(currentColorScheme => {
      const currentTheme = $theme;
      applyStyles(currentTheme, currentColorScheme);
    });

    if (browser) {
      const currentPath = $page.url.pathname;
      
      if (isNewHomeMode()) {
        if (!currentPath.startsWith('/newhome')) {
          goto('/newhome');
        }
      } else if (isRegularMode()) {
        if (currentPath.startsWith('/newhome')) {
          goto('/');
        }
      }
    }

    return () => {
      unsubscribeTheme();
      unsubscribeColorScheme();
    };
  });

</script>

<main data-theme={$theme} data-color-scheme-selected={$colorScheme}>
  <NavBar />
  <Cursor />
  <Popup />
  <slot />
</main>
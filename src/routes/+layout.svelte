<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { isNewHomeMode, isRegularMode } from '$lib/utils/buildMode';
  import NavBar from '$lib/NavBar/NavBar.svelte';
  import Cursor from '$lib/UI/Cursor.svelte';
  import Popup from '$lib/Mobile/Popup.svelte';
  import { theme, applyTheme } from '$lib/stores/theme';
  import '/src/app.base.css';

  onMount(() => {
    const unsubscribe = theme.subscribe(currentTheme => {
      applyTheme(currentTheme);
    });

    // Route conditions for build mode
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

    return unsubscribe;
  });

</script>

<main data-theme={$theme}>
  <NavBar />
  <Cursor />
  <Popup />
  <slot />
</main>
<script lang="ts">
  import { onMount } from 'svelte';
  import NavBar from '$lib/UI/NavBar.svelte';
  import Cursor from '$lib/UI/Cursor.svelte';
  import Popup from '$lib/Mobile/Popup.svelte';
  import { theme, colorScheme, applyStyles } from '$lib/stores/theme';
  import '/src/app.base.css';

  onMount(() => {
    const unsubscribeTheme = theme.subscribe(currentTheme => {
      const currentColorScheme = $colorScheme;
      applyStyles(currentTheme, currentColorScheme);
    });

    const unsubscribeColorScheme = colorScheme.subscribe(currentColorScheme => {
      const currentTheme = $theme;
      applyStyles(currentTheme, currentColorScheme);
    });

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
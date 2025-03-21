<script lang="ts">
  import { onMount } from 'svelte';
  import TopNav from '$lib/NavBar/NavBar.svelte';
  import Cursor from '$lib/Cursor.svelte';
  import HamburgerMenu from '$lib/NavBar/NavBar.svelte';
  import Popup from '$lib/Mobile/Popup.svelte';
  import { theme, applyTheme } from '$lib/stores/theme';
  import '/src/app.base.css';

  onMount(() => {
    const unsubscribe = theme.subscribe(currentTheme => {
      applyTheme(currentTheme);
    });

    return unsubscribe;
  });
</script>

<main data-theme={$theme}>
  <TopNav />
  <HamburgerMenu />
  <Cursor />
  <Popup />
  <slot />
</main>
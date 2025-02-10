<script lang="ts">
  import TopNav from '$lib/TopNav.svelte';
  import Cursor from '$lib/Cursor.svelte';
  import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  import '/src/app.css';
  import { onMount, onDestroy } from 'svelte';

  let enableHamburger = true;
  let enableCursorFollower = true;

  function updatePreferences() {
    if (typeof window !== 'undefined') {
      const storedHamburger = localStorage.getItem('enableHamburger');
      const storedCursor = localStorage.getItem('enableCursorFollower');
      if (storedHamburger !== null) {
        enableHamburger = storedHamburger === 'true';
      }
      if (storedCursor !== null) {
        enableCursorFollower = storedCursor === 'true';
      }
    }
  }

  onMount(() => {
    updatePreferences();
    window.addEventListener('preferencesUpdated', updatePreferences);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('preferencesUpdated', updatePreferences);
    }
  });
</script>

<main>
  <TopNav />
  {#if enableCursorFollower}
    <Cursor />
  {/if}
  {#if enableHamburger}
    <HamburgerMenu />
  {/if}
  <slot />
</main>

<script lang="ts">
  import TopNav from '$lib/NavBar/NavBar.svelte';
  import Cursor from '$lib/Cursor.svelte';
  import HamburgerMenu from '$lib/NavBar/NavBar.svelte';
  import Popup from '$lib/Mobile/Popup.svelte';
  import '/src/app.css';
</script>

<main>
  <TopNav />
  <HamburgerMenu />
  <Cursor />
  <Popup />
  <slot />
</main>
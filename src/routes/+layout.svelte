<script lang="ts">
  import TopNav from '$lib/NavBar.svelte';
  import Cursor from '$lib/Cursor.svelte';
  import HamburgerMenu from '$lib/NavBar.svelte';
  import '/src/app.css';
</script>

<main>
  <TopNav />
  <Cursor />
  <HamburgerMenu />
  <slot />
</main>

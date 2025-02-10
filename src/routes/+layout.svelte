<script lang="ts">
	import TopNav from '$lib/TopNav.svelte';
  import Cursor from '$lib/Cursor.svelte';
  import HamburgerMenu from '$lib/HamburgerMenu.svelte';
	import '/src/app.css';
</script>

<main>
  <TopNav />
  <Cursor />
  <HamburgerMenu />
  <slot />
</main>
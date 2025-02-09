<script lang="ts">
	import TopNav from '$lib/TopNav.svelte';
	import '../app.css';
</script>

<main>
  <TopNav />
  <slot />
</main>
  
<style>
  main {
    margin-top: 60px;
  }
</style>
<script lang="ts">
  import { onMount } from 'svelte';
  import { theme, applyTheme } from '$lib/stores/theme';
  import '/src/app.base.css';

  onMount(() => {
    const unsubscribe = theme.subscribe(currentTheme => {
      applyTheme(currentTheme);
    });

    return unsubscribe;
  });
</script>

<svelte:head>
  <!-- Override embed tags for NewHome -->
  <title>ELECTRIS NewHome</title>
  <meta property="og:title" content="ELECTRIS NewHome" />
  <meta property="og:description" content="ELECTRIS NewHome - Your personal browser start page"/>
  <meta property="og:url" content="https://new.electris.net/" />
  <meta name="twitter:title" content="ELECTRIS NewHome"/>
  <meta name="twitter:description" content="ELECTRIS NewHome - Your personal browser start page"/>
</svelte:head>

<main data-theme={$theme} class="newhome-layout">
  <slot />
</main>

<style>
  .newhome-layout {
    min-height: 100vh;
    background: var(--bg-primary, #ffffff);
  }
</style>
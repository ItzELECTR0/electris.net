<script lang="ts">
  import { onMount } from 'svelte';
  import { theme, applyTheme } from '$lib/stores/theme';
  import { initializeI18n } from '$lib/stores/i18n';
  import Cursor from '$lib/UI/Cursor.svelte';
  import '/src/app.base.css';

  onMount(async () => {
    await initializeI18n();
    const unsubscribe = theme.subscribe(currentTheme => {
      applyTheme(currentTheme);
    });

    return unsubscribe;
  });
</script>

<svelte:head>
  <title>ELECTRIS NewHome</title>
  <meta property="og:title" content="ELECTRIS NewHome" />
  <meta property="og:description" content="ELECTRIS NewHome | A New Home for your browser"/>
  <meta property="og:url" content="https://newhome.electris.net/" />
  <meta name="twitter:title" content="ELECTRIS NewHome"/>
  <meta name="twitter:description" content="ELECTRIS NewHome | A New Home for your browser"/>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main data-theme={$theme} class="newhome-layout">
  <slot />
</main>

<style>
  .newhome-layout {
    min-height: 100vh;
    background: var(--bg-primary, #0f1411);
    color: var(--text-primary, #ff6811);
    position: relative;
    font-family: 'Redwing', sans-serif;
  }

  :global([data-theme="dark"]) .newhome-layout {
    --bg-primary: hsl(160, 7%, 8%);
    --text-primary: hsl(22, 99%, 48%);
    --accent-color: #ff6811;
    --accent-secondary: #f65901;
  }

  :global([data-theme="light"]) .newhome-layout {
    --bg-primary: #f5f1f8;
    --text-primary: #ff5608;
    --accent-color: #ff5608;
    --accent-secondary: #ff6811;
  }

  :global([data-theme="midnight"]) .newhome-layout {
    --bg-primary: #000000;
    --text-primary: #ff6811;
    --accent-color: #ff6811;
    --accent-secondary: #f65901;
  }

  :global(.newhome-layout) {
    scroll-behavior: smooth;
  }

  :global(.newhome-layout *) {
    font-family: inherit;
  }

  :global(.newhome-layout .navbar) {
    display: none !important;
  }

  :global(.newhome-layout .hamburger) {
    display: none !important;
  }

  :global(.newhome-layout .hamburger-button) {
    display: none !important;
  }

  :global(.newhome-layout .circle) {
    border-color: var(--accent-color, #ff6811);
  }

  :global(.newhome-layout .circle.hovered-text-grow) {
    border-color: var(--accent-secondary, #f65901);
  }

  :global(.newhome-layout .circle.hovered-button-grow) {
    border-color: var(--accent-color, #ff6811);
  }

  @media (max-width: 768px) {
    .newhome-layout {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .newhome-layout {
      font-size: 0.85rem;
    }
  }

  @media (prefers-contrast: high) {
    :global([data-theme="dark"]) .newhome-layout {
      --bg-primary: #000000;
      --text-primary: #ffffff;
      --accent-color: #ffaa00;
    }

    :global([data-theme="light"]) .newhome-layout {
      --bg-primary: #ffffff;
      --text-primary: #000000;
      --accent-color: #cc4400;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.newhome-layout *) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    :global(.newhome-layout .electrical-particle) {
      display: none !important;
    }

    :global(.newhome-layout .scan-lines) {
      animation: none !important;
    }
  }
</style>
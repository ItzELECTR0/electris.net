<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';
  import Hover from './Hover.svelte';
  

  let showOptions = false;
  let isOpen = false;
  let siteUrl = "";
  let siteVer = "";
  let siteEnvironment = "";
  let siteHref = "";

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Socials', href: '/socials' },
    { label: 'Game Studios', href: '/egs' },
    { label: 'Media Studios', href: '/ems' }
  ];

  function updateSiteHref() {
    const path = window.location.pathname;
    const search = window.location.search;
  
    if (siteEnvironment === "testing" || siteEnvironment === "development") {
      siteHref = 'https://electris.net' + path + search;
    } else {
      siteHref = 'https://testing.electris.net' + path + search;
    }
  }

  onMount(() => {
    determineEnvironment();
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
    }
  });

  afterNavigate(() => {
    updateSiteHref();
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  function handleClickOutside(event: MouseEvent) {
    if (typeof document === 'undefined') return;
    if (showOptions) {
      const optionsMenu = document.querySelector('.options-menu');
      const logoButton = document.querySelector('.logo-button');
      if (
        optionsMenu &&
        !optionsMenu.contains(event.target as Node) &&
        logoButton &&
        !logoButton.contains(event.target as Node)
      ) {
        showOptions = false;
      }
    }
  }

  function determineEnvironment() {
    siteUrl = import.meta.env.VITE_SITE_URL || "";
    siteVer = import.meta.env.VITE_SITE_VER || "v0.0.1";
  
    const hostname = window.location.hostname;
    if (hostname === "testing.electris.net") {
      siteEnvironment = "testing";
    } else if (hostname === "electris.net") {
      siteEnvironment = "production";
    } else {
      siteEnvironment = "development";
    }
  
    updateSiteHref();
  }
</script>

<nav class="navbar">
  <div class="nav-buttons">
    <a class="nav-button" href="/about">About Us</a>
    <a class="nav-button" href="/">ELECTRIS</a>
    <a class="nav-button" href="/projects">Projects</a>
  </div>
  <button type="button" class="hamburger-button" on:click={() => isOpen = !isOpen}>
    &#9776;
  </button>
  {#if isOpen}
    <div class="overlay" on:click={() => isOpen = false} transition:fade={{ duration: 200 }}></div>
  {/if}
  <button
    type="button"
    class="logo-button"
    on:click={(event) => {
      event.stopPropagation();
      showOptions = !showOptions;
    }}>
    <img class="logo" src='/icons/elts-v1-transparent.png' alt='ELECTRIS' />
  </button>
  <div class="hamburger {isOpen ? 'open' : ''}">
    <div class="hamburger-content">
      {#each menuItems as item}
        <div class="menu-item">
          <a
            href={item.href}
            target={item.newTab ? "_blank" : null}
            on:click={() => isOpen = false}>
            {item.label}
          </a>
        </div>
      {/each}
    </div>
      <div class="hamburger-footer" role="region"
        on:mouseenter={(e: MouseEvent) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          window.dispatchEvent(new CustomEvent('footerHovered', { detail: { x: centerX, y: centerY } }));
        }}
        on:mouseleave={() => {
          window.dispatchEvent(new CustomEvent('footerUnhovered'));
        }}>
        <div class="footer">
          <p><u>ELECTRIS &#169;2025</u></p>
          <a href="https://github.com/ItzELECTR0/electris.net"><u>{siteVer}</u></a>
          <span class="env-indicator">{siteEnvironment}</span>
        </div>
      </div>
  </div>
</nav>

<Hover />

{#if showOptions}
  <div class="options-menu" transition:fade={{ duration: 200 }}>
    <div transition:slide={{ duration: 300 }}>
      <h2 class="circle-no-interact">Options</h2>
      <div class="option">
        
      </div>
      <div class="option">
        <button type="button">
          <a href={siteHref}>
            {#if siteEnvironment === "production"}
              Switch to Testing
            {:else}
              Switch to Main
            {/if}
          </a>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .logo-button {
    user-select: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  .logo {
    user-select: none;
    height: 3vh;
  }
  
  .options-menu {
    position: fixed;
    top: 5vh;
    right: 1vh;
    background-color: #222;
    padding: 1.5vh;
    border-radius: 8px;
    z-index: 200;
    color: #f65901;
    width: 250px;
  }
  
  .options-menu h2 {
    font-family: 'sans-sherif';
    margin-top: 0;
    font-size: 1.5rem;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu-item {
    margin-top: 1vh;
    margin-bottom: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: left;
  }

  .menu-item a {
    display: inline-block;
    line-height: 1.5;
    font-family: sans-serif;
    text-decoration: none;
    color: #f65901;
    font-size: 1.2rem;
  }

  .env-indicator {
    margin-left: 0.5rem;
    color: #f65901;
    font-size: 0.8rem;
    background-color: rgba(246, 89, 1, 0.2);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-family: monospace;
  }
</style>

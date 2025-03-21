<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';
  import Hover from './Hover.svelte';
  import { theme, toggleTheme, applyTheme } from '$lib/stores/theme';

  type Theme = 'dark' | 'light';

  let showOptions = false;
  let isOpen = false;
  let siteUrl = "";
  let siteVer = "";
  let siteEnvironment = "";
  let siteHref = "";
  let currentTheme: string;

  theme.subscribe(value => {
    currentTheme = value;
  });

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Socials', href: '/socials' },
    { label: 'Game Studios', href: '/egs' },
    { label: 'Media Studios', href: '/ems' }
  ];

  const pages = import.meta.glob('/src/routes/**/+page.svelte', { eager: true });

  interface SearchData {
    name: string;
    description: string;
    url: string;
  }

  function pathToUrl(path: string): string {
    let url = path.replace(/^\/src\/routes/, '').replace(/\/\+page\.svelte$/, '');
    if (url === '') url = '/';
    return url;
  }

  let searchData: SearchData[] = [];
  for (const [path, module] of Object.entries(pages)) {
    if ((module as any).search) {
      searchData.push({ ...((module as any).search), url: pathToUrl(path) });
    }
  }

  let searchQuery = "";
  let filteredResults = [];
  $: filteredResults = searchData.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  function clearSearch() {
    searchQuery = "";
  }

  function updateSiteHref() {
    const path = window.location.pathname;
    const search = window.location.search;
  
    if (siteEnvironment === "testing" || siteEnvironment === "development") {
      siteHref = 'https://electris.net' + path + search;
    } else if (siteEnvironment === "production") {
      siteHref = 'https://testing.electris.net' + path + search;
    } else {
      siteHref = 'https://localhost:5173' + path + search;
    }
  }

  onMount(() => {
    determineEnvironment();
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
      applyTheme(currentTheme as Theme);
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
    } else if (hostname === "localhost") {
      siteEnvironment = "development";
    } else {
      siteEnvironment = "unknown";
    }
  
    updateSiteHref();
  }

  function handleThemeToggle() {
    toggleTheme();
  }
</script>

<nav class="navbar">
  <div class="nav-buttons">
    <a class="nav-button" href="/about">About Us</a>
    <a class="nav-button" href="/">ELECTRIS</a>
    <a class="nav-button" href="/projects">Projects</a>
  </div>
  <div class="search-container">
    <input type="search" placeholder="Search pages..." bind:value={searchQuery} />
    {#if searchQuery && filteredResults.length > 0}
      <div class="search-results" transition:fade>
        {#each filteredResults as result}
          <a href={result.url} on:click={clearSearch}>
            <strong>{result.name}</strong>
            <span>{result.description}</span>
          </a>
        {/each}
      </div>
    {/if}
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
        <span>Theme</span>
        <button type="button" class="theme-toggle" on:click={handleThemeToggle}>
          {#if currentTheme === 'dark'}
            <span class="theme-icon">🌙</span> Dark
          {:else}
            <span class="theme-icon">☀️</span> Light
          {/if}
        </button>
      </div>
      <div class="option">
        <button type="button">
          <a href={siteHref}>
            {#if siteEnvironment === "production"}
              Switch to Testing
            {:else if siteEnvironment === "testing" || siteEnvironment === "development"}
              Switch to Main
            {:else}
              Switch to Development
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
    margin-bottom: 1vh;
  }

  .theme-toggle {
    background: none;
    border: 1px solid #f65901;
    color: #f65901;
    padding: 0.5vh 1vh;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5vh;
    transition: background-color 0.2s;
  }

  .theme-toggle:hover {
    background-color: rgba(246, 89, 1, 0.1);
  }

  .theme-icon {
    display: inline-block;
    font-size: 1rem;
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
    letter-spacing: 0.065vh;
    background-color: rgba(246, 89, 1, 0.2);
    padding: 0.1rem 0.3rem;
    border-radius: 0.4vh;
    font-family: monospace;
  }

  .footer span {
    font-family: 'Redwing Light';
  }

  .search-container {
    position: relative;
    display: inline-block;
    margin-right: 1vh;
  }
  
  .search-container input[type="search"] {
    padding: 0.5rem;
    border: 1px solid #f65901;
    border-radius: 4px;
    background: transparent;
    color: #f65901;
  }

  .search-container input[type="search"]::placeholder {
    color: #f65901;
  }
  
  .search-results {
    position: absolute;
    top: 100%;
    right: 0;
    background: #131615;
    border: 1px solid #f65901;
    border-radius: 4px;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 150;
  }

  .search-results a {
    display: block;
    padding: 0.5rem;
    color: #f65901;
    text-decoration: none;
    border-bottom: 1px solid #f65901;
  }

  .search-results a:last-child {
    border-bottom: none;
  }

  .search-results a:hover {
    background: rgba(246,89,1,0.1);
  }
</style>
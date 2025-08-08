<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';
  import Hover from './Hover.svelte';
  import LanguageSelector from '$lib/Localization/LanguageSelector.svelte';
  import { theme, applyTheme, setTheme } from '$lib/stores/theme';
  import { t, initializeI18n } from '$lib/stores/i18n';

  type Theme = 'light' |'dark' | 'midnight' | 'auto';

  interface ThemeOption {
    value: Theme;
    label: string;
    icon: string;
    description?: string;
  }

  let showOptions = false;
  let showThemeDropdown = false;
  let isOpen = false;
  let siteUrl = "";
  let siteVer = "";
  let siteEnvironment = "";
  let footerEnv = "";
  let siteHref = "";
  let currentTheme: string;
  let availableThemes: ThemeOption[];
  
  let gearElement: HTMLImageElement;
  let isHoveringGear = false;
  let animationId: number;
  let currentRotation = 0;
  let targetSpeed = 0;
  let currentSpeed = 0;

  theme.subscribe(value => {
    currentTheme = value;
  });

  $: availableThemes = [
    { 
      value: 'light' as Theme, 
      label: $t('nav.options.theme.light', 'Light'), 
      icon: '☀️',
      description: $t('nav.options.theme.light.desc', 'Clean and bright')
    },
    { 
      value: 'dark' as Theme, 
      label: $t('nav.options.theme.dark', 'Dark'), 
      icon: '🌙',
      description: $t('nav.options.theme.dark.desc', 'Easy on the eyes')
    },
    { 
      value: 'midnight' as Theme, 
      label: $t('nav.options.theme.oled', 'Midnight'), 
      icon: '🌚',
      description: $t('nav.options.theme.oled.desc', 'Blackout')
    },
    { 
      value: 'auto' as Theme, 
      label: $t('nav.options.theme.auto', 'Automatic'), 
      icon: '🔄',
      description: $t('nav.options.theme.auto.desc', 'Follows system')
    }
  ];

  $: currentThemeInfo = availableThemes.find(t => t.value === currentTheme) || availableThemes[0];

  $: menuItems = [
    { label: $t('nav.burger.home', 'Home'), href: '/', newTab: false },
    { label: $t('nav.burger.social', 'Socials'), href: '/socials', newTab: false },
    { label: $t('nav.burger.egs', 'Game Studios'), href: '/egs', newTab: false },
    { label: $t('nav.burger.ems', 'Media Studios'), href: '/ems', newTab: false }
  ];

  $: {
    targetSpeed = 0;
    if (isHoveringGear) {
      targetSpeed += 1;
    }
    if (showOptions) {
      targetSpeed += 1;
    }
    startGearAnimation();
  }

  function updateSiteHref() {
    const path = window.location.pathname;
    const search = window.location.search;
  
    if (siteEnvironment === "canary" || siteEnvironment === "development") {
      siteHref = 'https://electris.net' + path + search;
    } else if (siteEnvironment === "production") {
      siteHref = 'https://canary.electris.net' + path + search;
    } else {
      siteHref = 'https://localhost:5173' + path + search;
    }
  }

  function animateGear() {
    const speedDiff = targetSpeed - currentSpeed;
    const acceleration = 0.3;
    currentSpeed += speedDiff * acceleration;

    if (Math.abs(speedDiff) < 0.01) {
      currentSpeed = targetSpeed;
    }

    currentRotation += currentSpeed;
    
    if (targetSpeed === 0 && Math.abs(currentSpeed) < 0.1) {
      const nearestFullRotation = Math.round(currentRotation / 360) * 360;
      const rotationDiff = nearestFullRotation - currentRotation;
      
      if (Math.abs(rotationDiff) < 10) {
        currentRotation = nearestFullRotation % 360;
        currentSpeed = 0;
      }
    }

    if (currentRotation >= 360) {
      currentRotation -= 360;
    } else if (currentRotation <= -360) {
      currentRotation += 360;
    }

    if (gearElement) {
      gearElement.style.transform = `rotate(${currentRotation}deg)`;
    }

    if (Math.abs(currentSpeed) > 0.01 || Math.abs(targetSpeed - currentSpeed) > 0.01) {
      animationId = requestAnimationFrame(animateGear);
    }
  }

  function startGearAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animateGear();
  }

  function handleGearHover() {
    isHoveringGear = true;
    startGearAnimation();
  }

  function handleGearLeave() {
    isHoveringGear = false;
    startGearAnimation();
  }

  onMount(async () => {
    determineEnvironment();
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
      applyTheme(currentTheme as Theme);
      await initializeI18n();
    }
  });

  afterNavigate(() => {
    updateSiteHref();
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  function handleClickOutside(event: MouseEvent) {
    if (typeof document === 'undefined') return;
    
    if (showOptions) {
      const optionsMenu = document.querySelector('.options-menu');
      const logoButton = document.querySelector('.settings-button');
      if (
        optionsMenu &&
        !optionsMenu.contains(event.target as Node) &&
        logoButton &&
        !logoButton.contains(event.target as Node)
      ) {
        showOptions = false;
        showThemeDropdown = false;
        startGearAnimation();
      }
    }

    if (showThemeDropdown) {
      const themeSelector = document.querySelector('.theme-selector');
      if (themeSelector && !themeSelector.contains(event.target as Node)) {
        showThemeDropdown = false;
      }
    }
  }

  function determineEnvironment() {
    siteUrl = import.meta.env.VITE_SITE_URL || "";
    siteVer = import.meta.env.VITE_SITE_VER || "v0.0.2";
  
    const hostname = window.location.hostname;
    if (hostname === "canary.electris.net" || hostname === "testing.electris.net") {
      siteEnvironment = "canary";
    } else if (hostname === "electris.net") {
      siteEnvironment = "production";
    } else if (hostname === "localhost" || "127.0.0.1") {
      siteEnvironment = "development";
    } else {
      siteEnvironment = "unknown";
    }
  
    updateSiteHref();
  }

  $: footerEnv = (() => {
    switch (siteEnvironment) {
      case "canary":
        return $t('nav.burger.version.test', 'canary');
      case "production":
        return $t('nav.burger.version.prod', 'production');
      case "development":
       return $t('nav.burger.version.dev', 'development');
      default:
        return $t('nav.burger.version.null', 'unknown');
   }
  })();

  function handleThemeChange(themeValue: Theme) {
    setTheme(themeValue);
    showThemeDropdown = false;
  }

  function toggleThemeDropdown(event: MouseEvent) {
    event.stopPropagation();
    showThemeDropdown = !showThemeDropdown;
  }

  function handleOptionsToggle(event: MouseEvent) {
    event.stopPropagation();
    showOptions = !showOptions;
    if (!showOptions) showThemeDropdown = false;
    startGearAnimation();
  }
</script>

<nav class="navbar">
  <div class="nav-buttons">
    <a class="nav-button" href="/about">{$t('about.title', 'About Us')}</a>
    <a class="nav-button" href="/">{$t('site.title', 'ELECTRIS')}</a>
    <a class="nav-button" href="/projects">{$t('nav.bar.proj', 'Projects')}</a>
  </div>
  <button type="button" class="hamburger-button" on:click={() => isOpen = !isOpen}>
    &#9776;
  </button>
  {#if isOpen}
    <div class="overlay" on:click={() => isOpen = false} transition:fade={{ duration: 200 }}></div>
  {/if}
  <button
    type="button"
    class="settings-button"
    on:click={handleOptionsToggle}
    on:mouseenter={handleGearHover}
    on:mouseleave={handleGearLeave}>
    <img 
      bind:this={gearElement}
      class="settings-icon" 
      src='/icons/gear.svg' 
      alt='ELECTRIS' 
    />
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
          <a href="https://github.com/ItzELECTR0/electris.net" target="_blank"><u>{siteVer}</u></a>
          <span class="env-indicator">{footerEnv}</span>
        </div>
      </div>
  </div>
</nav>

<Hover />

{#if showOptions}
  <div class="options-menu" transition:fade={{ duration: 200 }}>
    <div transition:slide={{ duration: 300 }}>
      <h2 class="circle-no-interact">{$t('nav.options', 'Options')}</h2>
      <div class="option">
        <span>{$t('nav.options.theme', 'Theme')}</span>
        <div class="theme-selector">
          <button 
            type="button" 
            class="theme-button"
            on:click={toggleThemeDropdown}
            aria-expanded={showThemeDropdown}
            aria-haspopup="listbox"
          >
            <span class="theme-icon">{currentThemeInfo.icon}</span>
            <span class="theme-name">{currentThemeInfo.label}</span>
            <span class="dropdown-arrow" class:open={showThemeDropdown}>▼</span>
          </button>
          
          {#if showThemeDropdown}
            <div class="theme-dropdown" transition:slide={{ duration: 200 }} role="listbox">
              {#each availableThemes as themeOption}
                <button
                  type="button"
                  class="theme-option"
                  class:active={currentTheme === themeOption.value}
                  on:click={() => handleThemeChange(themeOption.value)}
                  role="option"
                  aria-selected={currentTheme === themeOption.value}
                  title={themeOption.description}
                >
                  <span class="theme-icon">{themeOption.icon}</span>
                  <div class="theme-info">
                    <span class="theme-name">{themeOption.label}</span>
                    {#if themeOption.description}
                      <span class="theme-description">{themeOption.description}</span>
                    {/if}
                  </div>
                  {#if currentTheme === themeOption.value}
                    <span class="checkmark">✓</span>
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
      <div class="option">
        <span>{$t('nav.options.lang', 'Language')}</span>
        <LanguageSelector />
      </div>
      <div class="option">
        <a href={siteHref} class="rounded-button">
          {#if siteEnvironment === "production"}
            {$t('nav.options.switch.test', 'Switch to Canary')}
          {:else if siteEnvironment === "canary" || siteEnvironment === "development"}
            {$t('nav.options.switch.prod', 'Switch to Main')}
          {:else}
            {$t('nav.options.switch.dev', 'Switch to Development')}
          {/if}
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .nav-buttons {
    display: flex;
    justify-content: center;
    gap: 1.5vh;
    flex-grow: 1;
    margin-left: 3vh;
  }

  .nav-button {
    font-family: sans-serif;
    text-decoration: none;
    font-size: 1.2rem;
  }

  .settings-button {
    user-select: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  .settings-icon {
    user-select: none;
    height: 3vh;
    transition: none; /* Remove any default transitions so our JS animation takes full control */
    transform-origin: center; /* Ensure rotation happens from the center */
  }
  
  .options-menu {
    position: fixed;
    top: 5vh;
    right: 1vh;
    padding: 1.5vh;
    border-radius: 1vh;
    z-index: 200;
    color: #f65901;
    width: 20vw;
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
    margin-top: 1.5vh;
    margin-bottom: 1vh;
  }

  .rounded-button {
    display: inline-block;
    padding: 0.1em 0.2em;
    border: 0.2vh solid hsl(22, 100%, 50%);
    border-radius: 0.8vh;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: 200.0ms;
  }

  .rounded-button:hover {
    border: 0.2vh solid hsl(22, 100%, 60%);
    background: rgba(139, 59, 35, 0.274);
    transition: 200.0ms;
  }

  .theme-selector {
    position: relative;
    display: inline-block;
    width: 7vw;
  }

  .theme-button {
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
    font-family: inherit;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .theme-button:hover {
    background-color: rgba(246, 89, 1, 0.1);
  }

  .theme-icon {
    font-size: 1rem;
    display: inline-block;
    flex-shrink: 0;
  }

  .theme-name {
    font-size: 0.9rem;
    flex-grow: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .dropdown-arrow {
    font-size: 0.8rem;
    transition: transform 0.2s;
    flex-shrink: 0;
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .theme-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--bg-secondary, #1a1a1a);
    border: 1px solid #f65901;
    border-radius: 4px;
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    z-index: 1000;
    max-height: 250px;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .theme-option {
    width: 100%;
    background: none;
    border: none;
    color: #f65901;
    padding: 0.75vh 1vh;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5vh;
    transition: background-color 0.2s;
    font-family: inherit;
    text-align: left;
    box-sizing: border-box;
    min-height: 3.5vh;
  }

  .theme-option:hover {
    background-color: rgba(246, 89, 1, 0.1);
  }

  .theme-option.active {
    background-color: rgba(246, 89, 1, 0.2);
    font-weight: 500;
  }

  .theme-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .theme-option .theme-name {
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .theme-description {
    font-size: 0.75rem;
    color: rgba(246, 89, 1, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0.1vh;
  }

  .checkmark {
    color: #f65901;
    font-weight: bold;
    font-size: 0.9rem;
    flex-shrink: 0;
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

  :global([data-theme="light"]) .theme-dropdown {
    background: var(--bg-secondary, #f0f0f0);
    color: #333;
  }

  :global([data-theme="light"]) .theme-button,
  :global([data-theme="light"]) .theme-option {
    color: #f65901;
  }

  :global([data-theme="light"]) .theme-description {
    color: rgba(246, 89, 1, 0.6);
  }
</style>
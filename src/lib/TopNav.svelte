<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  let showOptions = false;
  let enableHamburger = true;
  let useDarkMode = false;
  let enableCursorFollower = true;

  onMount(() => {
    if (typeof window !== 'undefined') {
      const storedHamburger = localStorage.getItem('enableHamburger');
      const storedDarkMode = localStorage.getItem('useDarkMode');
      const storedCursor = localStorage.getItem('enableCursorFollower');

      if (storedHamburger !== null) {
        enableHamburger = storedHamburger === 'true';
      }
      if (storedDarkMode !== null) {
        useDarkMode = storedDarkMode === 'true';
        updateDarkMode(useDarkMode);
      }
      if (storedCursor !== null) {
        enableCursorFollower = storedCursor === 'true';
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
    }
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  function toggleHamburger() {
    enableHamburger = !enableHamburger;
    if (typeof window !== 'undefined') {
      localStorage.setItem('enableHamburger', enableHamburger.toString());
      window.dispatchEvent(new CustomEvent('preferencesUpdated'));
    }
  }

  function toggleDarkMode() {
    useDarkMode = !useDarkMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('useDarkMode', useDarkMode.toString());
      updateDarkMode(useDarkMode);
      window.dispatchEvent(new CustomEvent('preferencesUpdated'));
    }
  }

  function toggleCursor() {
    enableCursorFollower = !enableCursorFollower;
    if (typeof window !== 'undefined') {
      localStorage.setItem('enableCursorFollower', enableCursorFollower.toString());
      window.dispatchEvent(new CustomEvent('preferencesUpdated'));
    }
  }

  function updateDarkMode(isDark: boolean) {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    }
  }

  function handleClickOutside(event: MouseEvent) {
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
</script>

<nav class="navbar">
  <div class="nav-buttons">
    <a class="nav-button" href="/about">About Us</a>
    <a class="nav-button" href="/">ELECTRIS</a>
    <a class="nav-button" href="/projects">Projects</a>
  </div>
  <button type="button" class="logo-button" on:click={() => showOptions = !showOptions}>
    <img class="logo" src='/icons/elts-v1-transparent.png' alt='ELECTRIS' />
  </button>
</nav>

{#if showOptions}
<div class="options-menu" transition:fade={{ duration: 200 }}>
  <div transition:slide={{ duration: 300 }}>
    <h2 class="circle-no-interact">Options</h2>
    <div class="option">
      <label for="hamburger-toggle">Enable Hamburger Menu</label>
      <input
        id="hamburger-toggle"
        type="checkbox"
        bind:checked={enableHamburger}
        on:change={toggleHamburger} />
    </div>
    <div class="option">
      <label for="darkmode-toggle">Use Dark Mode</label>
      <input
        id="darkmode-toggle"
        type="checkbox"
        bind:checked={useDarkMode}
        on:change={toggleDarkMode} />
    </div>
    <div class="option">
      <label for="cursor-toggle">Enable Cursor Follower</label>
      <input
        id="cursor-toggle"
        type="checkbox"
        bind:checked={enableCursorFollower}
        on:change={toggleCursor} />
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
  .option label {
    font-family: 'sans-sherif';
    font-size: 1rem;
    margin-bottom: 0.1vh;
  }
  .option input[type="checkbox"] {
    width: 1.5vh;
    height: 1.5vh;
  }
</style>

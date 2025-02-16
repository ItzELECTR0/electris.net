<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  let showOptions = false;
  let isOpen = false;

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Game Studios', href: '/egs' },
    { label: 'Media Studios', href: '/ems' },
    { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net', newTab: true },
    { label: 'Social Media', href: '/socials' }
  ];

  onMount(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
    }
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
            target={item.newTab ? "_blank" : "_self"}
            on:click={() => isOpen = false}>
            {item.label}
          </a>
        </div>
      {/each}
    </div>
    <div class="hamburger-footer">
      <p>ELECTRIS &#169;2025</p>
      <p>v0.0.1</p>
    </div>
  </div>
</nav>

{#if showOptions}
  <div class="options-menu" transition:fade={{ duration: 200 }}>
    <div transition:slide={{ duration: 300 }}>
      <h2 class="circle-no-interact">Options</h2>
      <div class="option">
        <label for="testing-toggle">Testing Option</label>
        <input id="testing-option" type="checkbox" />
      </div>
      <div class="option">
        <a href="https://testing.electris.net">Switch to Testing</a>
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

  .menu-item {
    margin-top: 0.5vh;
    margin-bottom: 0.8vh;
  }

  .menu-item a {
    font-family: sans-serif;
    text-decoration: none;
    color: #f65901;
    font-size: 1.2rem;
  }
</style>

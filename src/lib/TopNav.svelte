<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  let showOptions = false;

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
        type="checkbox" />
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

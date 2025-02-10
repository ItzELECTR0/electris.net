<script>
  import { fade } from 'svelte/transition';
  let isOpen = false;
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Game Studios', href: '/egs' },
    { label: 'Media Studios', href: '/ems' },
    { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net', newTab: true },
    { label: 'Social Media', href: '/socials' }
  ];
</script>

<div class="hamburger-button" on:click={() => isOpen = !isOpen}>
  &#9776;
</div>

{#if isOpen}
  <div class="overlay" on:click={() => isOpen = false} transition:fade={{ duration: 200 }}></div>
{/if}

<div class="hamburger {isOpen ? 'open' : ''}">
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

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .hamburger {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #131615;
    width: 250px;
    height: 100vh;
    max-width: 80%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 110;
    padding: 17px;
    padding-top: 60px;
  }

  .hamburger-button {
    user-select: none;
    position: fixed;
    top: 5px;
    left: 10px;
    z-index: 111;
    cursor: pointer;
    font-size: 2rem;
    color: #f65901;
  }

  .hamburger.open {
    transform: translateX(0);
  }

  .menu-item {
    margin-top: 5px;
    margin-bottom: 15px;
  }

  .menu-item a {
    font-family: sans-serif;
    text-decoration: none;
    color: #f65901;
    font-size: 1.2rem;
  }
</style>
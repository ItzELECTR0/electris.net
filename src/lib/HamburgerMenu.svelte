<script>
  export let items = [];
  let isOpen = false;
</script>

<div class="hamburger-button" on:click={() => isOpen = !isOpen}>
  &#9776;
</div>

{#if isOpen}
  <div class="overlay" on:click={() => isOpen = false}></div>
{/if}

<div class="hamburger {isOpen ? 'open' : ''}">
  {#each items as item}
    <div class="menu-item">
      <a href={item.href} target="_blank">{item.label}</a>
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
    top: 0px;
    left: 0;
    background-color: #131615;
    width: 250px;
    height: 5000px;
    max-width: 80%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 110;
    padding: 20px;
  }

  .hamburger-button {
    user-select: none;
    position: fixed;
    top: 20px;
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
    top: -20px;
    margin-top: 5px;
    margin-bottom: 15px;
  }

  .menu-item a {
    text-decoration: none;
    color: #f65901;
    font-size: 1.2rem;
  }
</style>
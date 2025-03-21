<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const cursorReset = () => {
      const cursor = document.querySelector('.circle');
      if (cursor) {
        cursor.className = "circle";
      }
    };

    setTimeout(cursorReset, 10);
  });

  export const search = {
    name: "About Us",
    description: "The place to find out more about us."
  };
</script>

<svelte:head>
  <title>About Us | ELECTRIS</title>
</svelte:head>

<div class="hero">
  <h1><u>About Us</u></h1>
  <p>[More info coming here soon]</p>
</div>
  
<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    text-align: center;
  }

  .hero h1 {
    font-size: 4rem;
    margin: 0;
  }

  .hero p {
    font-family: 'Nightcore';
    font-size: 6.5rem;
    margin-top: 20px;
    max-width: 80%;
  }
  </style>
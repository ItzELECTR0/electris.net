<script lang="ts">
  
</script>

<svelte:head>
  <title>ELECTRIS</title>
</svelte:head>

<div>
  <div class="hero">
    <h1>ELECTRIS</h1>
    <p>Heart like a pen, On paper it bleeds</p>
  </div>
</div>
  
<style>
  .hero {
    min-height: calc(20vh - 25vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    text-align: center;
  }

  .hero h1 {
    padding-top: 1vh;
    font-family: 'Letric';
    font-size: 4rem;
    margin: 0;
  }

  .hero p {
    font-family: sans-serif;
    font-size: 1.5rem;
    margin-top: 10px;
    max-width: 80%;
  }
  
  .rhinestones {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 3vh;
    pointer-events: auto;
  }
</style>
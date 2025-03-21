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
    name: "Main Page",
    description: "Welcome to ELECTRIS, the main page."
  };
</script>

<svelte:head>
  <title>ELECTRIS</title>
</svelte:head>

<div>
  <div class="hero">
    <h1>ELECTRIS</h1>
    <p>Heart like a pen, On paper it bleeds</p>
    
    <div class="connector-line">
      <div class="vertical-line"></div>
      <div class="horizontal-line"></div>
      <div class="pointers">
        <div class="left-pointer"></div>
        <div class="right-pointer"></div>
      </div>
    </div>
    
    <div class="boxes-container">
      <a href="/projects" class="box main-card-1">
        <h2>PROJECTS</h2>
        <p>Our own creations. <br> Projects that we ourselves create, as part of our mission to deepen our connection with the creators we want to help push forward, which will help push us forward as well.</p>
        <div class="box-image">
          <img src="/media/TWAOS/Cover/4K.png" alt="Projects" />
        </div>
        <div class="hover-overlay">
          <img src="/icons/elts-v1-transparent.png" alt="Logo" class="overlay-logo" width="350" />
        </div>
      </a>
      
      <a href="/divisions" class="box main-card-2">
        <h2>DIVISIONS</h2>
        <p>The parts of us that are for everyone to join. <br> The parts of us that were designed to help. <br> The parts divided, yet connected to the future. <br> The parts of us that won't change for anyone.</p>
        <div class="box-image">
          <img src="/media/TWAOS/Cover/4K.png" alt="Divisions" />
        </div>
        <div class="hover-overlay">
          <img src="/icons/elts-v1-transparent.png" alt="Logo" class="overlay-logo" width="350" />
        </div>
      </a>
    </div>
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
  
  .connector-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1vh;
  }
  
  .vertical-line {
    width: 0.7vh;  
    height: 2vh;
    background-color: #f65901;
    border-radius: 2px;
  }

  .horizontal-line {
    width: 51vh;
    height: 0.6vh; 
    background-color: #f65901;
    border-radius: 2px; 
  }
  
  .pointers {
    display: flex;
    justify-content: space-between;
    width: 51vh;
  }
  
  .left-pointer, .right-pointer {
    width: 0.7vh;
    height: 4vh;
    background-color: #f65901;
    border-radius: 1px;
  }
  
  .boxes-container {
    display: flex;
    justify-content: center;
    gap: 5vw;
    margin-top: 2vh;
    width: 100%;
  }
  
  .box {
    position: relative;
    overflow: hidden;
    max-width: 40vh;
    max-height: 50vh;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .box:hover {
    transform: scale(1.03);
  }

  .box:hover .hover-overlay {
    background: rgba(0, 0, 0, 0.6);
    opacity: 1;
  }

  .box:hover .overlay-logo {
    transform: scale(1);
    opacity: 1;
  }

  .overlay-logo {
    padding-left: 1vh;
    transform: scale(0.8);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .box h2 {
    font-family: 'Letric';
    font-size: 3.5rem;
    margin: 0;
    margin-bottom: 1vh;
    color: #f65901;
    padding-top: 1vh;
    padding-left: 2vh;
    padding-right: 2vh;
  }
  
  .box p {
    font-family: 'Redwing', sans-serif;
    text-align: left;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.5;
    color: #f65901;
    padding-left: 0.1vh;
    padding-right: 0.1vh;
  }
  
  .box-image {
    width: 100%;
    height: auto;
    margin-top: auto;
    padding-top: 3vh;
    padding-left: 2vh;
    padding-right: 2vh;
    padding-bottom: 2vh;
  }
  
  .box-image img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    object-fit: cover;
  }
</style>
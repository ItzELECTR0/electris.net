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
      <a href="/projects" class="box box-1">
        <h2>PROJECTS</h2>
        <p>Our own creations. Projects that we ourselves create, as part of our mission to deepen our connection with the creators we want to help push forward, which will help push us forward as well.</p>
        <div class="box-image">
          <img src="/media/TWAOS/Cover/4K.png" alt="Projects" />
        </div>
      </a>
      
      <a href="/divisions" class="box box-2">
        <h2>DIVISIONS</h2>
        <p>The parts of us that are for everyone to join. The ones where you decide which direction you want your art to go through with us. <br> The parts of us that are here to help. <br> The parts of us that won't change for anyone.</p>
        <div class="box-image">
          <img src="/media/TWAOS/Cover/4K.png" alt="Divisions" />
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
    width: 46vh;
    height: 0.6vh; 
    background-color: #f65901;
    border-radius: 2px; 
  }
  
  .pointers {
    display: flex;
    justify-content: space-between;
    width: 46vh;
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
    width: 35%;
    max-width: 35vh;
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
  
  .box-1 {
    background-color: #25211f;
  }
  
  .box-2 {
    background-color: #151e22;
  }
  
  .box h2 {
    font-family: 'Letric';
    font-size: 2.5rem;
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
    font-size: 1rem;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 2vh;
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
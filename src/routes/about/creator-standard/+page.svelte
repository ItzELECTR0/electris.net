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
  <title>Creator Standard | ELECTRIS</title>
</svelte:head>

<div class="hero">
  <h1>The <span class="highlight">"Creator Standard"</span></h1>
</div>

<div class="content">
  <div class="main-section">
    <h2>Meaning:</h2>
    <p class="definition">Works that live up to ELECTRO's Vision</p>
    
    <div class="explanation">
      <p>
        ELECTRO keeps a personal standard for all his works, code, assets and projects under ELECTRIS. This standard ensures that everything aligns with the current vision and direction.
      </p>
      
      <p>
        Only works that meet this standard and support the intended goals will be utilized. This applies to both original creations as well as third party ones.
      </p>
      
      <div class="important-notice">
        <h3>Vision Evolution</h3>
        <p>
          As creative vision naturally evolves over time, ELECTRO reserves the right to remove, modify, or completely recreate any creative work, whether originally created by him or not. This can happen at any time and for any reason. This makes sure that all remains consistent with the current plans and quality standards.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .hero {
    font-family: 'sans-serif';
    text-align: center;
    padding-top: 5vh;
    margin-bottom: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
  }

  .hero h1 {
    font-family: 'Letric';
    font-size: 4rem;
    margin: 0;
  }

  .highlight {
    font-family: 'Nightcore';
    font-size: 4.2rem;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px 80px;
  }

  .main-section {
    text-align: left;
  }

  .main-section h2 {
    font-family: 'Letric';
    font-size: 2.5rem;
    margin-bottom: 20px;
    border-bottom: 2px solid;
    padding-bottom: 10px;
  }

  .definition {
    font-family: 'Redwing';
    font-size: 2rem;
    margin-bottom: 4vh;
    font-weight: 400;
    font-style: italic;
  }

  .explanation {
    font-family: 'Redwing';
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .explanation p {
    margin-bottom: 25px;
    font-weight: 300;
  }

  .important-notice {
    margin-top: 4vh;
    padding: 2vh;
    border-radius: 0.5vh;
    border-left: 0.3vh solid;
  }

  .important-notice h3 {
    font-family: 'Nightcore';
    font-size: 2rem;
    margin: 0 0 15px 0;
  }

  .important-notice p {
    margin: 0;
    font-weight: 500;
    font-size: 1.2rem;
  }
</style>
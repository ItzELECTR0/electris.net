<script lang="ts">
  import { onMount } from 'svelte';

  let iconSize = 150;

  const projects = [
    {
      title: 'TWAOS',
      description: 'An adventure-action-rpg with a sci-fi setting and a fantasy inspired super-powered, heart wrenching narrative.',
      icon: '/icons/twaos.svg',
      width: 8,
      link: '/egs/twaos'
    }
  ];

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
    name: "Projects",
    description: "The place to see all of our projects."
  };
</script>

<svelte:head>
  <title>Projects | ELECTRIS</title>
</svelte:head>

<div class="hero">
  <h1>Projects</h1>
</div>

<div class="twaos">
  {#each projects as project}
    <a class="twaos-card" href={project.link}>
      <div class="card-icon-twaos" style="margin-right: {Math.min(iconSize * 0.2, 5)}px;">
        <img
          src={project.icon}
          alt="{project.title} icon"
          style="width: {project.width}vh; object-fit: contain; margin-right: {Math.min(iconSize * 0.5, 10)}px; margin-left: {Math.min(iconSize * 0.5, 5)}px;"
        />
      </div>
      <div class="card-content-twaos">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
    </a>
  {/each}
</div>

<style>
  .hero {
    font-family: 'sans-serif';
    text-align: center;
    padding-top: 80px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hero h1 {
    padding-top: 1vh;
    font-family: 'Letric';
    font-size: 4rem;
    margin: 0;
  }
  .twaos {
    display: flex;
    flex-direction: line;
    align-items: center;
    gap: 20px;
    padding: 0 20px 20px;
    justify-content: center;
    align-items: center;
  }
  .twaos-card {
    font-family: 'sans-serif';
    display: flex;
    flex-direction: line;
    align-items: left;
    background-color: #222;
    padding: 10px;
    border-radius: 8px;
    text-decoration: none;
    color: #f65901;
    width: 100%;
    max-width: 600px;
    transition: transform 0.2s;
    justify-content: left;
    text-align: left;
  }
  .twaos-card:hover {
    transform: scale(1.02);
  }
  .card-icon-twaos {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .card-content-twaos {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card-content-twaos h2 {
    margin: 0;
    font-family: 'Nightcore';
    font-size: 2rem;
  }
  .card-content-twaos p {
    font-family: 'Redwing Light';
    font-size: 1.2rem;
    margin: 5px 0 0;
  }
</style>

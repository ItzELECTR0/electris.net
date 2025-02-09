<script>
  import HamburgerMenu from '$lib/HamburgerMenu.svelte';

  let iconSize = 150;

  const menuItems = [
    { label: 'Back', href: '/' },
    { label: 'TWAOS', href: 'https://github.com/ItzELECTR0/TWAOS' },
    { label: 'Game Studios', href: '/egs' },
    { label: 'Media Studios', href: '/ems' },
    { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net' }
  ];

  const projects = [
    {
      title: 'TWAOS',
      description:
        'An adventure-action-rpg with a sci-fi setting and a fantasy inspired super-powered, heart wrenching narrative.',
      icon: 'https://raw.githubusercontent.com/ItzELECTR0/ItzELECTR0/605355a69b8d7bbf3427bc851deb29be519b01ae/assets/TWAOS.svg',
      link: '/egs/twaos'
    }
  ];
</script>

<HamburgerMenu items={menuItems} />

<div class="hero">
  <h1>Projects</h1>
</div>

<div class="projects-container">
  {#each projects as project}
    <a class="project-card" href={project.link}>
      <div class="card-icon" style="margin-right: {Math.min(iconSize * 0.2, 5)}px;">
        <img
          src={project.icon}
          alt="{project.title} icon"
          style="width: {iconSize}px; height: {iconSize}px; object-fit: contain;"
        />
      </div>
      <div class="card-content">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
    </a>
  {/each}
</div>

<style>
  .hero {
    text-align: center;
    padding-top: 80px;
    margin-bottom: 40px;
  }
  .hero h1 {
    font-size: 4rem;
    margin: 0;
  }
  .projects-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 0 20px 20px;
  }
  .project-card {
    display: flex;
    align-items: center;
    background-color: #222;
    padding: 10px;
    border-radius: 8px;
    text-decoration: none;
    color: #f65901;
    width: 100%;
    max-width: 600px;
    transition: transform 0.2s;
  }
  .project-card:hover {
    transform: scale(1.02);
  }
  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card-content h2 {
    margin: 0;
    font-size: 1.8rem;
  }
  .card-content p {
    margin: 5px 0 0;
  }
</style>

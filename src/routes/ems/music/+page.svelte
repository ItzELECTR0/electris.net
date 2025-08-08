<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { t, currentLocale } from '$lib/stores/i18n';

  $: isPageArabic = $currentLocale === 'ar';

  $: cardLinks = [
    {
      icon: '/icons/vinyl.svg',
      title: $t('ems.music.card.vinyl', 'Albums'),
      link: '/ems/music/albums'
    },
    {
      icon: '/icons/cd.svg',
      title: $t('ems.music.card.disc', 'Singles'),
      link: '/ems/music/singles'
    }
  ];

  let crownCanvas: HTMLCanvasElement;
  let crownImage: HTMLImageElement;
  let isHovered = false;

  let maskImage: HTMLImageElement;

  function drawMask() {
    if (!crownCanvas || !maskImage) return;
    const ctx = crownCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, crownCanvas.width, crownCanvas.height);
      ctx.drawImage(maskImage, 0, 0);
    }
  }

  const handleCrownClick = async () => {
    await goto('/ems/music/GEE');
    console.log('Heavy is the head that chose to wear the crown.');
  };

  function checkPixelHit(event: MouseEvent) {
    if (!crownCanvas) return false;
    const rect = crownCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const scaleX = crownCanvas.width / rect.width;
    const scaleY = crownCanvas.height / rect.height;
    const canvasX = Math.floor(x * scaleX);
    const canvasY = Math.floor(y * scaleY);

    const ctx = crownCanvas.getContext('2d');
    if (!ctx) return false;
    try {
      const pixel = ctx.getImageData(canvasX, canvasY, 1, 1);
      return pixel.data[3] > 0;
    } catch {
      return false;
    }
  }

  function handleMouseMove(event: MouseEvent) {
    const prev = isHovered;
    isHovered = checkPixelHit(event);
    if (prev !== isHovered) {
      (event.currentTarget as HTMLCanvasElement).style.cursor = isHovered ? 'pointer' : 'default';
    }
    if (isHovered) {
      drawMask();
    }
  }

  function handleCanvasClick(event: MouseEvent) {
    if (checkPixelHit(event)) handleCrownClick();
  }

  onMount(() => {
    maskImage = new Image();
    maskImage.src = '/icons/GEE/crown-HoverArea.png';
    maskImage.crossOrigin = 'anonymous';
    maskImage.onload = () => {
      if (!crownCanvas) return;
      crownCanvas.width = maskImage.width;
      crownCanvas.height = maskImage.height;
      const ctx = crownCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, maskImage.width, maskImage.height);
        ctx.drawImage(maskImage, 0, 0);
      }
    };

    if (crownCanvas && crownImage) {
      const ctx = crownCanvas.getContext('2d');
      crownImage.onload = () => {
        if (!ctx) return;
        crownCanvas.width = crownImage.naturalWidth;
        crownCanvas.height = crownImage.naturalHeight;
        ctx.clearRect(0, 0, crownCanvas.width, crownCanvas.height);
        ctx.drawImage(crownImage, 0, 0);
      };
      if (crownImage.complete && ctx) {
        crownCanvas.width = crownImage.naturalWidth;
        crownCanvas.height = crownImage.naturalHeight;
        ctx.clearRect(0, 0, crownCanvas.width, crownCanvas.height);
        ctx.drawImage(crownImage, 0, 0);
      }
    }

    setTimeout(() => {
      const c = document.querySelector('.circle');
      if (c) c.className = 'circle';
    }, 10);
  });
</script>

<svelte:head>
  <title>Music | ELECTRIS</title>
</svelte:head>

<div class="hero">
    <h1>{$t('ems.music.hero.title', 'MUSIC')}</h1>
  </div>

<div class="music-container">
  {#each cardLinks as card}
    <a class="music-card" class:arabic={isPageArabic} href={card.link}>
      <div class="cover-container">
        <img src={card.icon} alt="{card.title} icon" class="cover-image" />
      </div>
      <div class="song-info">
        <h3>{card.title}</h3>
      </div>
    </a>
  {/each}
</div>

<div class="crown">
  <div class="crown-container">
    <img 
      bind:this={crownImage}
      src="/icons/GEE/crown.png" 
      alt="Crown of Thorns" 
      class="crown-image"
      class:hovered={isHovered}
    />
    <canvas 
      bind:this={crownCanvas}
      class="crown-canvas"
      on:mousemove={handleMouseMove}
      on:mouseleave={() => { isHovered = false; }}
      on:click={handleCanvasClick}
      role="button"
      tabindex="0"
      aria-label="Crown of Thorns"
    ></canvas>
  </div>
</div>

<style>
  .hero {
    min-height: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 6vh;
    text-align: center;
  }

  .hero h1 {
    padding-top: 1vh;
    padding-bottom: -5vh;
    font-family: 'Letric';
    font-size: 4rem;
    margin: 0;
  }

  .music-container {
    display: flex;
    justify-content: center;
    gap: 2vh;
    padding: 5vh;
  }
  
  .music-card {
    border-radius: 1.5vh;
    width: 20vw;
    height: 40vh;
    padding: 1.5vh;
    text-decoration: none;
    color: #f65901;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
  }
  
  .music-card:hover {
    transform: scale(1.05);
  }
  
  .cover-container {
    width: 24vh;
    height: 25vh;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1vh;
  }
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .song-info h3 {
    margin: 0;
    font-size: 3.2rem;
    text-align: center;
  }

  .music-card .song-info h3 {
    position: relative;
    overflow: visible;
  }

  .music-card .song-info h3::after {
    content: "";
    position: absolute;
    bottom: 0.25em;                
    left: 0;
    width: 0;
    height: 0.2vh;
    background-color: currentColor;
    transition: width 0.3s ease-in-out;
  }

  .music-card:hover .song-info h3::after {
    width: 100%;
  }

  .music-card.arabic .song-info h3::after {
    left: auto;
    right: 0;
  }

  .music-card.arabic:hover .song-info h3::after {
    width: 100%;
  }

  .crown {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .crown-container {
    position: relative;
    max-width: 30vh;
    max-height: 30vh;
  }
  
  .crown-image {
    max-width: 30vh;
    max-height: 30vh;
    display: block;
    cursor: pointer;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .crown-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: default;
    background: none;
  }
  
  .crown-canvas:focus {
    outline: 2px solid rgba(246, 89, 1, 0.6);
    outline-offset: 2px;
  }
</style>
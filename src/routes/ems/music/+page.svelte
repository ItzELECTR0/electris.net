<script lang="ts">
  import { onMount } from 'svelte';

  const songs = [
    {
      cover: 'https://i1.sndcdn.com/artworks-PpLyHdUlYokl1XBf-DcMRmA-t500x500.jpg',
      title: 'Farewell, Apocalypse',
      artist: 'ELECTRO',
      link: 'https://youtu.be/zzrLzNRdY6o',
      artist_font: 'Letric'
    },
    {
      cover: 'https://i1.sndcdn.com/artworks-fJpDbkU3cXMIkGPm-tkSQWg-t500x500.png',
      title: 'shame on u',
      artist: 'ELECTRO',
      link: 'https://youtu.be/rlKIZdmGC4o',
      artist_font: 'Letric'
    },
    {
      cover: 'https://i1.sndcdn.com/artworks-DEJ2oIyB3AEYbg18-PNhitw-t500x500.jpg',
      title: 'Zero',
      artist: 'ELECTRO',
      link: 'https://youtu.be/xVaTP_cPid0',
      title_font: 'sans-serif',
      artist_font: 'Letric'
    }
  ];

  let crownCanvas: HTMLCanvasElement;
  let crownImage: HTMLImageElement;
  let isHovered = false;

  const handleCrownClick = () => {
    window.location.href = '/ems/music/GEE';
  };

  const checkPixelHit = (event: MouseEvent) => {
    if (!crownCanvas || !crownImage) return false;
    
    const rect = crownCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Scale coordinates to canvas size
    const scaleX = crownCanvas.width / rect.width;
    const scaleY = crownCanvas.height / rect.height;
    const canvasX = Math.floor(x * scaleX);
    const canvasY = Math.floor(y * scaleY);
    
    const ctx = crownCanvas.getContext('2d');
    if (!ctx) return false;
    
    try {
      const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
      // Check alpha channel (transparency)
      return imageData.data[3] > 0;
    } catch {
      return false;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    const wasHovered = isHovered;
    isHovered = checkPixelHit(event);
    
    if (wasHovered !== isHovered) {
      // Update cursor style
      const canvas = event.target as HTMLCanvasElement;
      canvas.style.cursor = isHovered ? 'pointer' : 'default';
    }
  };

  const handleCanvasClick = (event: MouseEvent) => {
    if (checkPixelHit(event)) {
      handleCrownClick();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCrownClick();
    }
  };

  onMount(() => {
    const cursorReset = () => {
      const cursor = document.querySelector('.circle');
      if (cursor) {
        cursor.className = "circle";
      }
    };

    setTimeout(cursorReset, 10);

    if (crownCanvas && crownImage) {
      const ctx = crownCanvas.getContext('2d');
      if (ctx) {
        crownImage.onload = () => {
          crownCanvas.width = crownImage.naturalWidth;
          crownCanvas.height = crownImage.naturalHeight;
          ctx.drawImage(crownImage, 0, 0);
        };
        
        if (crownImage.complete) {
          crownCanvas.width = crownImage.naturalWidth;
          crownCanvas.height = crownImage.naturalHeight;
          ctx.drawImage(crownImage, 0, 0);
        }
      }
    }
  });
</script>

<svelte:head>
  <title>Music | ELECTRIS</title>
</svelte:head>

<div class="music-container">
  {#each songs as song}
    <a class="music-card" href={song.link} target="_blank">
      <div class="cover-container">
        <img src={song.cover} alt="{song.title} cover" class="cover-image" />
      </div>
      <div class="song-info">
        <h3 style="font-family: {song.title_font}">{song.title}</h3>
        <p style="font-family: {song.artist_font}">{song.artist}</p>
      </div>
    </a>
  {/each}
</div>

<div class="crown">
  <div class="crown-container">
    <img 
      bind:this={crownImage}
      src="/icons/crown.png" 
      alt="Crown of Thorns - GEE Album Teaser" 
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
      on:keydown={handleKeyDown}
      aria-label="Crown of Thorns - GEE Album Teaser"
    ></canvas>
  </div>
</div>

<style>
  .crown {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    margin-top: 5vh;
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
  }
  
  .crown-canvas:focus {
    outline: 2px solid rgba(246, 89, 1, 0.6);
    outline-offset: 2px;
  }
  
  .music-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2vh;
    padding: 10vh 2vh 2vh;
  }
  
  .music-card {
    border-radius: 1.5vh;
    width: 25vh;
    padding: 1.5vh;
    text-decoration: none;
    color: #f65901;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
  }
  
  .music-card:hover {
    transform: scale(1.03);
  }
  
  .cover-container {
    width: 13vh;
    height: 13vh;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1.5vh;
  }
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .song-info h3 {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .song-info p {
    margin: 5px 0 0;
    text-align: center;
  }
</style>
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

<style>
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
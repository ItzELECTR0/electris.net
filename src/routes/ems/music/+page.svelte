<script>
  const songs = [
    {
      cover: 'https://i1.sndcdn.com/artworks-iyeUOVQg9HUl30Pc-GIg5eg-t500x500.png',
      title: 'Farewell, Apolcalypse',
      artist: 'ELECTRO',
      link: 'https://soundcloud.com/electro_dev/farewell-apocalypse'
    },
    {
      cover: 'https://i1.sndcdn.com/artworks-fJpDbkU3cXMIkGPm-tkSQWg-t500x500.png',
      title: 'shame on u',
      artist: 'ELECTRO',
      link: 'https://youtu.be/rlKIZdmGC4o'
    },
    {
      cover: 'https://i1.sndcdn.com/artworks-DEJ2oIyB3AEYbg18-PNhitw-t500x500.jpg',
      title: 'Zero',
      artist: 'ELECTRO',
      link: 'https://youtu.be/xVaTP_cPid0'
    }
  ];
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
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
    </a>
  {/each}
</div>

<style>
  .music-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 80px 20px 20px;
  }
  
  .music-card {
    background-color: #222;
    border-radius: 8px;
    width: 250px;
    padding: 15px;
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
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
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
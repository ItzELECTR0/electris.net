<script>
    import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  
    // Hamburger menu items for Music page
    const menuItems = [
      { label: 'Back', href: '/ems' },
      { label: 'Home', href: '/' },
      { label: 'TWAOS', href: 'https://github.com/ItzELECTR0/TWAOS' },
      { label: 'Game Studios', href: '/egs' },
      { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net' }
    ];
  
    // Song data
    const songs = [
      {
        title: 'Zero',
        artist: 'ELECTRO',
        link: 'https://youtu.be/xVaTP_cPid0'
      },
      {
        title: 'shame on u',
        artist: 'ELECTRO',
        link: 'https://youtu.be/rlKIZdmGC4o'
      }
    ];
  </script>
  
  <HamburgerMenu items={menuItems} />
  
  <div class="music-container">
    {#each songs as song}
      <a class="music-card" href={song.link} target="_blank">
        <div class="vinyl">
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
    .vinyl {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: radial-gradient(circle, #f65901 40%, #222 42%);
      margin-bottom: 15px;
    }
    .song-info h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    .song-info p {
      margin: 5px 0 0;
    }
  </style>
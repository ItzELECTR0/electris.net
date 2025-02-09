<script>
    import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  
    // Hamburger menu items for Media Studios page
    const menuItems = [
      { label: 'Back', href: '/' },
      { label: 'TWAOS', href: 'https://github.com/ItzELECTR0/TWAOS' },
      { label: 'Game Studios', href: '/egs' },
      { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net' }
    ];
  </script>
  
  <HamburgerMenu items={menuItems} />
  
  <div class="hero">
    <h1>ELECTRIS Media Studios</h1>
    <p>A studio is a room with a microphone, A set is a phone and a couple of chairs for it to sit on</p>
  </div>
  
  <div class="discography">
    <a href="/ems/music" class="disc-card">
      <div class="icon">🎵</div>
      <div class="card-content">
        <h2>Music</h2>
        <p>Explore our tunes</p>
      </div>
    </a>
  </div>
  
  <style>
    .hero {
      min-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 80px;
      text-align: center;
    }
    .hero h1 {
      font-size: 3.5rem;
      margin: 0;
    }
    .hero p {
      font-size: 1.5rem;
      margin-top: 20px;
      max-width: 80%;
    }
    .discography {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
    .disc-card {
      display: flex;
      align-items: center;
      background-color: #222;
      padding: 20px;
      border-radius: 8px;
      text-decoration: none;
      color: #f65901;
      transition: transform 0.2s;
    }
    .disc-card:hover {
      transform: scale(1.02);
    }
    .disc-card .icon {
      font-size: 3rem;
      margin-right: 20px;
    }
    .disc-card h2 {
      margin: 0;
      font-size: 1.8rem;
    }
    .disc-card p {
      margin: 5px 0 0;
    }
  </style>
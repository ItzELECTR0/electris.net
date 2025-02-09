<script>
    import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  
    // Hamburger menu items for About Us page
    const menuItems = [
      { label: 'Back', href: '/' },
      { label: 'TWAOS', href: 'https://github.com/ItzELECTR0/TWAOS' },
      { label: 'Game Studios', href: '/egs' },
      { label: 'Media Studios', href: '/ems' },
      { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net' }
    ];
  </script>

<HamburgerMenu items={menuItems} />
  
  <div class="hero">
    <h1>About Us</h1>
    <p>[Enter description here later]</p>
  </div>
  
  <style>
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 80px;
      text-align: center;
    }
    .hero h1 {
      font-size: 4rem;
      margin: 0;
    }
    .hero p {
      font-size: 1.5rem;
      margin-top: 20px;
      max-width: 80%;
    }
  </style>
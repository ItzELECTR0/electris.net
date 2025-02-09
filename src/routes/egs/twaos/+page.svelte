<script>
    import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  
    // Hamburger menu items for the TWAOS detail page
    const menuItems = [
      { label: 'Back', href: '/projects' },
      { label: 'TWAOS', href: 'https://github.com/ItzELECTR0/TWAOS' },
      { label: 'Game Studios', href: '/egs' },
      { label: 'Media Studios', href: '/ems' },
      { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net' }
    ];
  </script>
  
  <HamburgerMenu items={menuItems} />
  
  <div class="hero">
    <h1>The Wonderful Adventures Of Sip (TWAOS)</h1>
    <p>More details about TWAOS will be added soon.</p>
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
      font-size: 3.5rem;
      margin: 0;
    }
    .hero p {
      font-size: 1.5rem;
      margin-top: 20px;
      max-width: 80%;
    }
  </style>
<script>
    import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  
    const menuItems = [
      { label: 'TWAOS', href: 'https://github.com/ItzELECTR0/TWAOS' },
      { label: 'Game Studios', href: '/egs' },
      { label: 'Media Studios', href: '/ems' },
      { label: 'Source Code', href: 'https://github.com/ItzELECTR0/electris.net' }
    ];
  </script>
  
  <HamburgerMenu items={menuItems} />
  
  <div class="hero">
    <h1>ELECTRIS</h1>
    <p>Heart like a pen, On paper it bleeds</p>
  </div>
  
  <style>

    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .hero h1 {
      font-family: 'Letric';
      font-size: 4rem;
      margin: 0;
    }
    .hero p {
      font-family: sans-serif;
      font-size: 1.5rem;
      margin-top: 10px;
      max-width: 80%;
    }
  </style>
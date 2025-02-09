<script>
    import HamburgerMenu from '$lib/HamburgerMenu.svelte';
  
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
    <h1>The Wonderful Adventures Of Sip</h1>
    <h5>An open-source AAA Game created by a Solo Developer</h5>
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

.hero h5 {
    font-size: 1.5rem;
    margin: 0;
}
</style>
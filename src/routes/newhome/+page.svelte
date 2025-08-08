<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentTime = new Date();
  
  onMount(() => {
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);
    
    return () => clearInterval(interval);
  });
  
  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  function formatDate(date: Date): string {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
</script>

<svelte:head>
  <title>ELECTRIS NewHome</title>
  <meta name="description" content="ELECTRIS NewHome - Your personal browser start page" />
</svelte:head>

<div class="newhome-container">
  <div class="welcome-section">
    <h1 class="title">ELECTRIS NewHome</h1>
    <div class="time-display">
      <div class="time">{formatTime(currentTime)}</div>
      <div class="date">{formatDate(currentTime)}</div>
    </div>
  </div>
  
  <div class="quick-links">
    <h2>Quick Access</h2>
    <div class="links-grid">
      <a href="https://electris.net" class="link-card">
        <span class="link-title">Main Site</span>
        <span class="link-url">electris.net</span>
      </a>
      <a href="https://searxng.electris.net" class="link-card">
        <span class="link-title">SearXNG</span>
        <span class="link-url">searxng.electris.net</span>
      </a>
      <a href="https://ai.electris.net" class="link-card">
        <span class="link-title">Open WebUI</span>
        <span class="link-url">ai.electris.net</span>
      </a>
      <a href="https://jellyfin.electris.net" class="link-card">
        <span class="link-title">Jellyfin</span>
        <span class="link-url">jellyfin.electris.net</span>
      </a>
    </div>
  </div>
</div>

<style>
  .newhome-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .welcome-section {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .time-display {
    margin-bottom: 1rem;
  }
  
  .time {
    font-size: 4rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  
  .date {
    font-size: 1.25rem;
    opacity: 0.7;
  }
  
  .quick-links h2 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.8;
  }
  
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    max-width: 800px;
  }
  
  .link-card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }
  
  .link-card:hover {
    transform: translateY(-2px);
    border-color: rgba(102, 126, 234, 0.3);
    background: rgba(102, 126, 234, 0.1);
  }
  
  .link-title {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .link-url {
    font-size: 0.9rem;
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }
    
    .time {
      font-size: 2.5rem;
    }
    
    .links-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
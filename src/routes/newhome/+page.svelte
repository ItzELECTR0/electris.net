<script lang="ts">
  import { onMount } from 'svelte';
  import { t, currentLocale } from '$lib/stores/i18n';
  import { browser } from '$app/environment';
  
  let currentTime = new Date();
  let searchQuery = '';
  let searchInput: HTMLInputElement;
  let suggestions: string[] = [];
  let showSuggestions = false;
  let selectedSuggestion = -1;
  
  $: isPageArabic = $currentLocale === 'ar';
  
  let pins = [
    { url: 'https://electris.net', title: 'ELECTRIS', domain: extractDomain('https://electris.net') },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' },
    { url: '', title: '', domain: '' }
  ];
  
  let editingPinIndex = -1;
  let editUrl = '';
  let editTitle = '';
  
  onMount(() => {
    const cursorReset = () => {
      const cursor = document.querySelector('.circle');
      if (cursor) {
        cursor.className = "circle";
      }
    };
    setTimeout(cursorReset, 10);

    const interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);
    
    const createFloatingOrb = () => {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      orb.style.left = Math.random() * 100 + '%';
      orb.style.animationDuration = (8 + Math.random() * 4) + 's';
      orb.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(orb);

      setTimeout(() => {
        orb.remove();
      }, 12000);
    };

    const orbInterval = setInterval(createFloatingOrb, 8000 + Math.random() * 5000);

    const addGlitchEffect = () => {
      const title = document.querySelector('.newhome-subtitle');
      if (title && Math.random() < 0.15) {
        title.classList.add('glitch-pulse');
        setTimeout(() => {
          title.classList.remove('glitch-pulse');
        }, 300);
      }
    };

    const glitchInterval = setInterval(addGlitchEffect, 6000 + Math.random() * 8000);
    
    if (browser) {
      loadPins();
    }

    return () => {
      clearInterval(interval);
      clearInterval(orbInterval);
      clearInterval(glitchInterval);
    };
  });
  
  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  
  function formatDate(date: Date): string {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  function extractDomain(url: string): string {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  }

  function loadPins() {
    if (!browser) return;
    
    const savedPins = localStorage.getItem('newhome-pins');
    if (savedPins) {
      try {
        pins = JSON.parse(savedPins);
      } catch (e) {
        console.warn('Failed to load saved pins:', e);
      }
    }
  }

  function savePins() {
    if (!browser) return;
    
    try {
      localStorage.setItem('newhome-pins', JSON.stringify(pins));
    } catch (e) {
      console.warn('Failed to save pins:', e);
    }
  }

  function startEditingPin(index: number) {
    editingPinIndex = index;
    editUrl = pins[index].url;
    editTitle = pins[index].title;
  }

  function cancelEditing() {
    editingPinIndex = -1;
    editUrl = '';
    editTitle = '';
  }

  function savePin() {
    if (editingPinIndex < 0) return;
    
    let processedUrl = editUrl.trim();
    if (processedUrl && !processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }
    
    pins[editingPinIndex] = {
      url: processedUrl,
      title: editTitle.trim() || (processedUrl ? extractDomain(processedUrl) : ''),
      domain: processedUrl ? extractDomain(processedUrl) : ''
    };
    
    savePins();
    cancelEditing();
  }

  function deletePin(index: number) {
    pins[index] = { url: '', title: '', domain: '' };
    savePins();
  }

  function handlePinKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      savePin();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing();
    }
  }

  async function fetchSuggestions(query: string) {
    if (!query.trim()) {
      suggestions = [];
      showSuggestions = false;
      return;
    }

    try {
      const response = await fetch(`https://searxng.electris.net/autocompleter?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        suggestions = data[1] ? data[1].slice(0, 5) : [];
        showSuggestions = suggestions.length > 0;
        selectedSuggestion = -1;
      }
    } catch (error) {
      console.warn('Failed to fetch suggestions:', error);
      suggestions = [];
      showSuggestions = false;
    }
  }

  function handleSearch(query: string = searchQuery) {
    if (!query.trim()) return;
    
    const searchUrl = `https://searxng.electris.net/search?q=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank');
    
    searchQuery = '';
    showSuggestions = false;
  }

  let searchTimeoutId: ReturnType<typeof setTimeout> | undefined;

  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }
    
    searchTimeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 200);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      showSuggestions = false;
      selectedSuggestion = -1;
      searchInput.blur();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
        handleSearch(suggestions[selectedSuggestion]);
      } else {
        handleSearch();
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedSuggestion = Math.min(selectedSuggestion + 1, suggestions.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedSuggestion = Math.max(selectedSuggestion - 1, -1);
    }
  }

  function selectSuggestion(suggestion: string) {
    handleSearch(suggestion);
  }

  function handleHover(event: MouseEvent, isEntering: boolean, type: 'button' | 'text' | 'search') {
    const cursor = document.querySelector('.circle');
    if (!cursor) return;
    
    if (isEntering) {
      if (type === 'button') cursor.classList.add('hovered-button-grow');
      else if (type === 'text') cursor.classList.add('hovered-text-grow');
      else if (type === 'search') cursor.classList.add('hovered-button-grow');
    } else {
      cursor.classList.remove('hovered-button-grow', 'hovered-text-grow');
    }
  }

  function handleImageError(event: Event) {
    const target = event.target;
    if (target && 'style' in target) {
      (target as HTMLElement).style.display = 'none';
    }
  }
</script>

<svelte:head>
  <title>NewHome | ELECTRIS</title>
  <meta name="description" content="ELECTRIS NewHome | A New Home for your browser" />
</svelte:head>

<div class="newhome-container">
  <div class="ambient-dots">
    <div class="ambient-dot dot-1"></div>
    <div class="ambient-dot dot-2"></div>
    <div class="ambient-dot dot-3"></div>
  </div>
  
  <div class="welcome-section">
    <h1 
      class="newhome-title" 
      on:mouseenter={(e) => handleHover(e, true, 'text')}
      on:mouseleave={(e) => handleHover(e, false, 'text')}
    >
      <span class="title-main">ELECTRIS</span>
      <span class="newhome-subtitle">NewHome</span>
    </h1>
    
    <div class="time-display">
      <div class="time">{formatTime(currentTime)}</div>
      <div class="date">{formatDate(currentTime)}</div>
    </div>
  </div>

  <div class="search-section">
    <div class="search-container">
      <div class="search-wrapper">
        <input
          bind:this={searchInput}
          bind:value={searchQuery}
          on:input={handleSearchInput}
          on:keydown={handleKeyDown}
          on:focus={() => fetchSuggestions(searchQuery)}
          on:blur={() => setTimeout(() => showSuggestions = false, 200)}
          type="text"
          placeholder={$t('newhome.search.placeholder', 'Search with SearXNG...')}
          class="search-input"
        />
        <button 
          on:click={() => handleSearch()}
          class="search-button"
          on:mouseenter={(e) => handleHover(e, true, 'search')}
          on:mouseleave={(e) => handleHover(e, false, 'search')}
        >
          <img src="/icons/mg.svg" class="search-icon"/>
        </button>
      </div>
      
      {#if showSuggestions && suggestions.length > 0}
        <div class="suggestions-dropdown">
          {#each suggestions as suggestion, index}
            <div 
              class="suggestion-item"
              class:selected={index === selectedSuggestion}
              on:click={() => selectSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <div class="pins-section">
    <h2 class="section-title">
      {$t('newhome.pins.title', 'Quick Pins')}
    </h2>
    
    <div class="pins-grid" class:arabic-layout={isPageArabic}>
      {#each pins as pin, index}
        <div class="pin-card" class:empty={!pin.url} class:editing={editingPinIndex === index}>
          {#if editingPinIndex === index}
            <div class="pin-edit">
              <input
                type="text"
                bind:value={editUrl}
                placeholder="Enter URL..."
                class="pin-edit-url"
                on:keydown={handlePinKeydown}
                autofocus
              />
              <input
                type="text"
                bind:value={editTitle}
                placeholder="Enter title (optional)"
                class="pin-edit-title"
                on:keydown={handlePinKeydown}
              />
              <div class="pin-edit-actions">
                <button 
                  class="pin-save-btn" 
                  on:click={savePin}
                  on:mouseenter={(e) => handleHover(e, true, 'button')}
                  on:mouseleave={(e) => handleHover(e, false, 'button')}
                >
                  ✓
                </button>
                <button 
                  class="pin-cancel-btn" 
                  on:click={cancelEditing}
                  on:mouseenter={(e) => handleHover(e, true, 'button')}
                  on:mouseleave={(e) => handleHover(e, false, 'button')}
                >
                  ✕
                </button>
              </div>
            </div>
          {:else if pin.url}
            <a 
              href={pin.url}
              class="pin-link"
              target="_blank"
              rel="noopener noreferrer"
              on:mouseenter={(e) => handleHover(e, true, 'button')}
              on:mouseleave={(e) => handleHover(e, false, 'button')}
            >
              <div class="pin-favicon">
                <img 
                  src="https://icons.duckduckgo.com/ip3/{pin.domain}.ico" 
                  alt=""
                  loading="lazy"
                  on:error={handleImageError}
                />
              </div>
              <div class="pin-info">
                <div class="pin-title">{pin.title}</div>
                <div class="pin-domain">{pin.domain}</div>
              </div>
              <div class="pin-glow"></div>
            </a>
            <button 
              class="pin-edit-trigger"
              on:click={() => startEditingPin(index)}
              on:mouseenter={(e) => handleHover(e, true, 'button')}
              on:mouseleave={(e) => handleHover(e, false, 'button')}
              title="Edit pin"
            >
              <img src="/icons/gear.svg" class="pin-gear">
            </button>
            <button 
              class="pin-delete-trigger"
              on:click={() => deletePin(index)}
              on:mouseenter={(e) => handleHover(e, true, 'button')}
              on:mouseleave={(e) => handleHover(e, false, 'button')}
              title="Delete pin"
            >
              <img src="/icons/bin.svg" class="pin-trash">
            </button>
          {:else}
            <button 
              class="pin-empty" 
              on:click={() => startEditingPin(index)}
              on:mouseenter={(e) => handleHover(e, true, 'button')}
              on:mouseleave={(e) => handleHover(e, false, 'button')}
            >
              <div class="empty-icon">+</div>
              <div class="empty-text">{$t('newhome.pin.empty', 'Add Pin')}</div>
            </button>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="footer-info">
    <p class="version-info">
      {$t('site.newhome.version', 'NewHome')} • {$t('newhome.powered_by', 'Powered by ELECTRIS')}
    </p>
  </div>
</div>

<style>
  :global(.floating-orb) {
    position: fixed;
    width: 4px;
    height: 4px;
    background: rgba(246, 89, 1, 0.6);
    border-radius: 50%;
    opacity: 0;
    top: 100vh;
    z-index: 1;
    animation: float-up 10s linear forwards;
    pointer-events: none;
    box-shadow: 0 0 8px rgba(246, 89, 1, 0.4);
  }

  @keyframes float-up {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0);
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.8;
      transform: translateY(-100vh) translateX(20px);
    }
    100% {
      opacity: 0;
      transform: translateY(-100vh) translateX(40px);
    }
  }

  .newhome-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding: 6rem 2rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .ambient-dots {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  .ambient-dot {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(246, 89, 1, 0.3);
    border-radius: 50%;
    animation: ambient-pulse 4s ease-in-out infinite;
  }

  .dot-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .dot-2 {
    top: 60%;
    right: 15%;
    animation-delay: 1.5s;
  }

  .dot-3 {
    bottom: 30%;
    left: 80%;
    animation-delay: 3s;
  }

  @keyframes ambient-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(2); }
  }
  
  .welcome-section {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    z-index: 2;
  }
  
  .newhome-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .title-main {
    font-family: 'Letric', sans-serif;
    color: var(--accent-color, #ff6811);
    text-shadow: 0 0 20px rgba(246, 89, 1, 0.3);
    display: block;
  }

  .newhome-subtitle {
    font-family: 'Nightcore', sans-serif;
    font-size: 0.75em;
    display: block;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 50%, #667eea 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-flow 4s ease-in-out infinite;
    position: relative;
  }

  .newhome-subtitle:hover {
    animation: gradient-flow-intense 2s ease-in-out infinite;
  }

  .newhome-subtitle.glitch-pulse {
    animation: subtitle-glitch 0.3s ease-in-out, gradient-flow 4s ease-in-out infinite;
  }

  @keyframes gradient-flow {
    0%, 100% { 
      background-position: 0% 50%;
      filter: brightness(1);
    }
    50% { 
      background-position: 100% 50%;
      filter: brightness(1.2);
    }
  }

  @keyframes gradient-flow-intense {
    0%, 100% { 
      background-position: 0% 50%;
      filter: brightness(1.1);
    }
    25% { 
      background-position: 50% 50%;
      filter: brightness(1.4);
    }
    50% { 
      background-position: 100% 50%;
      filter: brightness(1.6);
    }
    75% { 
      background-position: 150% 50%;
      filter: brightness(1.4);
    }
  }

  @keyframes subtitle-glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-1px, 1px); }
    40% { transform: translate(-1px, -1px); }
    60% { transform: translate(1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }
  
  .time-display {
    margin-bottom: 2rem;
    position: relative;
  }
  
  .time {
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    font-family: 'Redwing', sans-serif;
  }
  
  .date {
    font-size: 1.1rem;
    opacity: 0.7;
    font-family: 'Redwing', sans-serif;
  }

  .search-section {
    width: 100%;
    max-width: 600px;
    margin-bottom: 3rem;
    position: relative;
    z-index: 10;
  }

  .search-container {
    position: relative;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    background: rgba(246, 89, 1, 0.1);
    border: 2px solid rgba(246, 89, 1, 0.3);
    border-radius: 25px;
    overflow: hidden;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .search-wrapper:focus-within {
    border-color: rgba(246, 89, 1, 0.6);
    box-shadow: 0 0 20px rgba(246, 89, 1, 0.2);
    transform: translateY(-2px);
  }

  .search-icon {
    position: relative;
    height: auto;
    width: auto;
  }

  .search-input {
    flex: 1;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    font-size: 1.1rem;
    font-family: 'Redwing', sans-serif;
    color: inherit;
    outline: none;
  }

  .search-input::placeholder {
    color: rgba(246, 89, 1, 0.6);
  }

  .search-button {
    position: relative;
    width: 15%;
    padding: 1rem 1.5rem;
    background: rgba(246, 89, 1, 0.2);
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: inherit;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-button:hover {
    background: rgba(246, 89, 1, 0.4);
  }

  .suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(246, 89, 1, 0.1);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(246, 89, 1, 0.3);
    border-radius: 12px;
    margin-top: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
  }

  .suggestion-item {
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Redwing', sans-serif;
    border-bottom: 1px solid rgba(246, 89, 1, 0.1);
  }

  .suggestion-item:last-child {
    border-bottom: none;
  }

  .suggestion-item:hover,
  .suggestion-item.selected {
    background: rgba(246, 89, 1, 0.2);
  }

  .pins-section {
    width: 100%;
    max-width: 900px;
    position: relative;
    z-index: 2;
  }

  .section-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    font-family: 'Letric', sans-serif;
    position: relative;
  }

  .pin-gear {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .pin-trash {
    position: relative;
    width: 20px;
    height: 20px;
  }
  
  .pins-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  .pins-grid.arabic-layout {
    direction: rtl;
  }

  .pin-card {
    aspect-ratio: 1;
    border-radius: 12px;
    position: relative;
    overflow: visible;
  }

  .pin-card.empty .pin-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed rgba(246, 89, 1, 0.3);
    border-radius: 12px;
    transition: all 0.3s ease;
    background: transparent;
    cursor: pointer;
    font-family: 'Redwing', sans-serif;
    color: inherit;
  }

  .pin-card.empty:hover .pin-empty {
    border-color: rgba(246, 89, 1, 0.6);
    background: rgba(246, 89, 1, 0.05);
  }

  .pin-card.editing {
    border: 2px solid rgba(246, 89, 1, 0.6);
    border-radius: 12px;
    background: rgba(246, 89, 1, 0.1);
    animation: pin-edit-appear 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes pin-edit-appear {
    0% {
      transform: scale(0.8) rotateY(-15deg);
      opacity: 0;
      filter: blur(8px);
    }
    50% {
      transform: scale(1.05) rotateY(5deg);
      opacity: 0.8;
      filter: blur(2px);
    }
    100% {
      transform: scale(1) rotateY(0deg);
      opacity: 1;
      filter: blur(0px);
    }
  }

  .pin-edit {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.8rem;
    position: relative;
    animation: pin-edit-content 0.3s ease-out 0.1s both;
  }

  @keyframes pin-edit-content {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .pin-edit-url,
  .pin-edit-title {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid rgba(246, 89, 1, 0.3);
    border-radius: 6px;
    background: rgba(246, 89, 1, 0.05);
    color: inherit;
    font-family: 'Redwing', sans-serif;
    font-size: 0.8rem;
    outline: none;
  }

  .pin-edit-url:focus,
  .pin-edit-title:focus {
    border-color: rgba(246, 89, 1, 0.6);
    background: rgba(246, 89, 1, 0.1);
  }

  .pin-edit-url::placeholder,
  .pin-edit-title::placeholder {
    color: rgba(246, 89, 1, 0.5);
  }

  .pin-edit-actions {
    display: flex;
    gap: 0.3rem;
    margin-top: auto;
  }

  .pin-save-btn,
  .pin-cancel-btn {
    flex: 1;
    padding: 0.4rem;
    border: 1px solid rgba(246, 89, 1, 0.3);
    border-radius: 4px;
    background: rgba(246, 89, 1, 0.1);
    color: inherit;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .pin-save-btn:hover {
    background: rgba(76, 175, 80, 0.2);
    border-color: rgba(76, 175, 80, 0.5);
  }

  .pin-cancel-btn:hover {
    background: rgba(244, 67, 54, 0.2);
    border-color: rgba(244, 67, 54, 0.5);
  }

  .pin-edit-trigger,
  .pin-delete-trigger {
    position: absolute;
    top: 0.3rem;
    background: rgba(246, 89, 1, 0.2);
    border: 1px solid rgba(246, 89, 1, 0.3);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 20;
    backdrop-filter: blur(5px);
  }

  .pin-edit-trigger {
    right: 2.2rem;
  }

  .pin-delete-trigger {
    right: 0.3rem;
  }

  .pin-card:hover .pin-edit-trigger,
  .pin-card:hover .pin-delete-trigger {
    opacity: 1;
  }

  .pin-edit-trigger:hover {
    background: rgba(246, 89, 1, 0.4);
  }

  .pin-delete-trigger:hover {
    background: rgba(244, 67, 54, 0.3);
    border-color: rgba(244, 67, 54, 0.5);
  }

  .empty-icon {
    font-size: 2rem;
    opacity: 0.5;
    margin-bottom: 0.5rem;
  }

  .empty-text {
    font-size: 0.8rem;
    opacity: 0.6;
    font-family: 'Redwing', sans-serif;
  }
  
  .pin-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: 2px solid rgba(246, 89, 1, 0.2);
    border-radius: 12px;
    background: rgba(246, 89, 1, 0.05);
    backdrop-filter: blur(10px);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .pin-link:hover {
    transform: translateY(-3px);
    border-color: rgba(246, 89, 1, 0.5);
    background: rgba(246, 89, 1, 0.1);
    box-shadow: 0 8px 25px rgba(246, 89, 1, 0.15);
  }

  .pin-favicon {
    width: 32px;
    height: 32px;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pin-favicon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .pin-info {
    text-align: center;
    width: 100%;
  }
  
  .pin-title {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
    font-family: 'Redwing', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .pin-domain {
    font-size: 0.7rem;
    opacity: 0.6;
    font-family: 'Redwing', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pin-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(246, 89, 1, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .pin-link:hover .pin-glow {
    opacity: 1;
  }

  .footer-info {
    margin-top: 3rem;
    text-align: center;
    opacity: 0.6;
    position: relative;
    z-index: 2;
  }

  .version-info {
    font-family: 'Redwing', sans-serif;
    font-size: 0.9rem;
    margin: 0;
  }
  
  @media (max-width: 1024px) {
    .pins-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 768px) {
    .newhome-container {
      padding: 5rem 1rem 4rem;
    }

    .newhome-title {
      font-size: 2.8rem;
    }
    
    .time {
      font-size: 2.5rem;
    }

    .pins-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .search-section {
      max-width: 500px;
    }
  }

  @media (max-width: 480px) {
    .newhome-container {
      padding: 4rem 1rem 4rem;
    }

    .newhome-title {
      font-size: 2.2rem;
    }

    .time {
      font-size: 2rem;
    }

    .section-title {
      font-size: 1.4rem;
    }

    .pins-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
    }

    .search-input {
      font-size: 1rem;
      padding: 0.8rem 1.2rem;
    }

    .search-button {
      padding: 0.8rem 1.2rem;
    }
  }
</style>
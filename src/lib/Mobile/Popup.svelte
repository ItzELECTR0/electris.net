<script lang="ts">
    import { onMount } from "svelte";
    let showPopup = false;
    let dontShowAgain = false;
    function setCookie(name: string, value: string, days: number) {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
    function getCookie(name: string): string | null {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    }
    function dismissPopup() {
      if (dontShowAgain) setCookie("mobilePopupDismissed", "true", 365);
      showPopup = false;
    }
    onMount(() => {
      if (getCookie("mobilePopupDismissed") === "true") return;
      if ("ontouchstart" in window) showPopup = true;
    });
  </script>
  
  {#if showPopup}
    <div class="mobile-popup-backdrop">
      <div class="mobile-popup">
        <h2>Mobile Notice</h2>
        <p>This site works on mobile, but things may look out of place or be hard to read. Please check us out on a laptop or desktop with a mouse or trackpad.</p>
        <div class="popup-controls">
          <label>
            <input type="checkbox" bind:checked={dontShowAgain}> Don't show again
          </label>
          <button on:click={dismissPopup}>Got it!</button>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .mobile-popup-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .mobile-popup {
      background-color: #131615;
      color: #f65901;
      padding: 3rem;
      border-radius: 3vh;
      max-width: 90%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      animation: fadeInGrow 0.3s ease;
    }

    .mobile-popup h2 {
      user-select: none;
      font-size: 5rem;
      font-family: 'Letric';
    }

    .mobile-popup p {
      user-select: none;
      font-size: 2rem;
      font-family: 'Redwing Light';
      padding-bottom: 2vh;
      padding-top: 1.5vh;
    }

    .mobile-popup label {
      user-select: none;
      font-size: 1.5rem;
    }

    .mobile-popup button {
      user-select: none;
      font-size: 2rem;
    }

    .popup-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
    button {
      background-color: #0f1010;
      color: #f65901;
      border: 1px solid #f65901;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    @keyframes fadeInGrow {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>
  
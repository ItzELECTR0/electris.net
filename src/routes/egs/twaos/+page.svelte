<script lang="ts">
  import { onMount } from 'svelte';
  import Hover from './lib/Hover.svelte';

  let currentVideo: HTMLVideoElement;
  let nextVideo: HTMLVideoElement;
  let recentlyPlayed: number[] = []; // Track recently played clips to enforce cooldown
  let hasMetShadow = false; // Track if the rare encounter (6.mp4) has been played

  function getNextClip(currentClip: number): number {
    const availableClips = [2, 3, 4, 5, 7];
    
    // If we just played 7.mp4, we must play 8.mp4 next
    if (currentClip === 7) {
      return 8;
    }
    
    const eligibleClips = availableClips.filter(clip => !recentlyPlayed.includes(clip));
    
    // Filter out similar clips if the current clip is similar
    let filteredClips = [...eligibleClips];
    if (currentClip === 2 || currentClip === 4) {
      filteredClips = filteredClips.filter(clip => clip !== 2 && clip !== 4);
    }
    if (currentClip === 3 || currentClip === 5) {
      filteredClips = filteredClips.filter(clip => clip !== 3 && clip !== 5);
    }
    
    if (!hasMetShadow && Math.random() < 0.001) // 0.1% chance to meet the shadow
    {
      hasMetShadow = true;
      return 6;
    }
    
    if (filteredClips.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredClips.length);
      return filteredClips[randomIndex];
    }
    
    if (eligibleClips.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleClips.length);
      return eligibleClips[randomIndex];
    }
    
    return Math.floor(Math.random() * 5) + 2;
  }

  function updateRecentlyPlayed(clipNumber: number) {
    recentlyPlayed.push(clipNumber);
    if (recentlyPlayed.length > 3) {
      recentlyPlayed.shift();
    }
  }

  function playNextVideo() {
    const currentClipNumber = parseInt(currentVideo.src.split('/').pop()?.split('.')[0] || '1');
    updateRecentlyPlayed(currentClipNumber);
    
    const nextClipNumber = getNextClip(currentClipNumber);
    nextVideo.src = `/media/TWAOS/BG/${nextClipNumber}.mp4`;
    
    nextVideo.load();
    nextVideo.onloadeddata = () => {
      swapVideos();
    };
  }

  function swapVideos() {
    const temp = currentVideo;
    currentVideo = nextVideo;
    nextVideo = temp;
    
    currentVideo.style.opacity = "1";
    nextVideo.style.opacity = "0";
    
    const playPromise = currentVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Video playback error:", error);
        setTimeout(() => {
          currentVideo.play().catch(e => console.error("Retry failed:", e));
        }, 1000);
      });
    }
  }

  function handleVideoEnded() {
    playNextVideo();
  }

  function ensurePlayback() {
    if (currentVideo && currentVideo.paused && !currentVideo.ended) {
      currentVideo.play().catch(error => {
        console.warn("Auto-play prevention detected:", error);
        setTimeout(() => currentVideo.play().catch(e => console.error("Retry failed:", e)), 1000);
      });
    }
  }

  function angle(cx: number, cy: number, ex: number, ey: number): number {
    const dy: number = ey - cy;
    const dx: number = ex - cx;
    const rad: number = Math.atan2(dy, dx);
    const deg: number = rad * 180 / Math.PI;
    return deg;
  }

  onMount(() => {
    const cursorReset = () => {
      const cursor = document.querySelector('.circle');
      if (cursor) {
        cursor.className = "circle";
      }
    };

    setTimeout(cursorReset, 10);

    currentVideo.src = '/media/TWAOS/BG/1.mp4';
    currentVideo.load();
    
    currentVideo.addEventListener('ended', handleVideoEnded);
    nextVideo.addEventListener('ended', handleVideoEnded);
    
    const playbackInterval = setInterval(ensurePlayback, 5000);
    
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && currentVideo.paused) {
        currentVideo.play().catch(e => console.error("Visibility play failed:", e));
      }
    });
    
    const anchor = document.querySelector('.styled-sip') as HTMLElement;
    const eyes = document.querySelectorAll('.eye') as NodeListOf<HTMLElement>;
    if (anchor) {
      const rekt = anchor.getBoundingClientRect();
      const anchorX = rekt.left + rekt.width / 1.5;
      const anchorY = rekt.top + rekt.height / 3;

      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

        eyes.forEach((eye) => {
          eye.style.transform = `rotate(${90 + angleDeg}deg)`;
        });
      });
    }
    
    currentVideo.play().catch(error => {
      console.error("Initial playback error:", error);
      setTimeout(() => currentVideo.play(), 1000);
    });
    
    return () => {
      clearInterval(playbackInterval);
      currentVideo.removeEventListener('ended', handleVideoEnded);
      nextVideo.removeEventListener('ended', handleVideoEnded);
    };
  });

  export const search = {
    name: "TWAOS",
    description: "Project 001, The Wondeful Adventures Of Sip."
  };
</script>

<svelte:head>
  <title>TWAOS | ELECTRIS</title>
</svelte:head>

<Hover />

<div class="hero">
  <div class="video-container">
    <video bind:this={currentVideo} class="hero-video" muted playsinline></video>
    <video bind:this={nextVideo} class="hero-video next" muted playsinline style="opacity:0;"></video>
    <div class="video-overlay"></div>
  </div>
  <div class="hero-text">
    <span class="text-container"><h2 class="tw">The Wonderful</h2></span>
    <span class="text-container"><h3 class="ao">Adventures Of</h3></span>
    <span class="text-container"><h1 class="sip">SIP</h1></span>
    <span class="text-container"><h5>An open-source Indie Game created by a Solo Developer</h5></span>
  </div>
  <div class="sip-icon">
    <a href="https://github.com/ItzELECTR0/TWAOS" target="_blank" class="styled-sip-link">
      <img class="styled-sip" src="/media/TWAOS/Styled/Sip.svg" alt="SIP" />
    </a>
    <div class="eyes">
      <a href="https://github.com/ItzELECTR0/TWAOS" target="_blank" class="styled-sip-link">
        <img class="eye" src="/media/TWAOS/Styled/SipEye.png" alt="SIPEYE-LEFT" style="top: 82vh; left: 24vh;" />
        <img class="eye" src="/media/TWAOS/Styled/SipEye.png" alt="SIPEYE-RIGHT" style="top: 80vh; left: 32.8vh;" />
      </a>
    </div>
  </div>
</div>

<style>
  .text-container {
    display: inline-block;
    line-height: 1.5;
  }

  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 6vh;
    text-align: center;
    overflow: hidden;
  }

  .hero-text {
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
    transition: opacity 0.1s ease-in-out;
  }

  .hero h1 {
    display: inline-block;
    font-family: 'Nightcore';
    font-size: 8rem;
    margin: 0;
  }

  .hero h1.sip {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 10px;
    margin: -1.7vh;
    color: #ff9933;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 1vh rgba(255, 123, 0, 0.7));
  }

  .hero h2 {
    font-family: 'Nightcore';
    font-size: 4rem;
    margin: -0.8vh;
  }

  .hero h2.tw {
    font-family: 'Nightcore';
    font-size: 4rem;
    margin: -0.8vh;
    color: #f65901;
    text-shadow: 0 0 10px rgba(246, 89, 1, 0.3), 0 0 20px rgba(246, 89, 1, 0.2), 0 0 30px rgba(246, 89, 1, 0.05);
  }

  .hero h3 {
    font-family: 'Nightcore';
    font-size: 3.5rem;
    margin: -0.5vh;
  }

  .hero h3.ao {
    font-family: 'Nightcore';
    font-size: 3.5rem;
    margin: -0.5vh;
    color: #f65901;
    text-shadow: 0 0 10px rgba(246, 89, 1, 0.3), 0 0 20px rgba(246, 89, 1, 0.2), 0 0 30px rgba(246, 89, 1, 0.05);
  }

  .hero h5 {
    font-family: 'Redwing Medium';
    font-size: 1.5rem;
    margin: 2vh;
  }

  .video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -2;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.8));
    z-index: -1;
  }

  .styled-sip {
    position: absolute;
    top: 70vh;
    bottom: 2vh;
    left: 2vh;
    right: 2vh;
    width: 40vh;
    height: 40vh;
  }

  .eye {
    position: absolute;
    bottom: 2vh;
    right: 2vh;
    width: 3vh;
    height: 3vh;
  }

  .sip-icon {
    display: grid;
    place-items: center;
  }
</style>
<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const anchor = document.querySelector('.styled-sip') as HTMLElement;
    const eyes = document.querySelectorAll('.eye') as NodeListOf<HTMLElement>;
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 1.5;
    const anchorY = rekt.top + rekt.height / 3;

    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!anchor) return;

      const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

      eyes.forEach((eye) => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`;
      });
    });

    function angle(cx: number, cy: number, ex: number, ey: number): number {
      const dy: number = ey - cy;
      const dx: number = ex - cx;
      const rad: number = Math.atan2(dy, dx);
      const deg: number = rad * 180 / Math.PI;
      return deg;
    }
  });
</script>

<svelte:head>
  <title>TWAOS | ELECTRIS</title>
</svelte:head>

<div class="hero">
  <video class="hero-video" autoplay muted loop playsinline>
    <source src="/media/TWAOS-BG.mp4" type="video/mp4" />
  </video>
  <div class="video-overlay"></div>
  <div class="hero-text">
    <h2>The Wonderful</h2>
    <h3>Adventures Of</h3>
    <h1 class="sip">SIP</h1>
    <h5>An open-source Indie Game created by a Solo Developer</h5>
  </div>
  <div class="sip-icon">
    <a href="https://github.com/ItzELECTR0/TWAOS" target="_blank" class="styled-sip-link">
      <img class="styled-sip" src="/media/StyledSip.svg" alt="SIP" />
    </a>
    <div class="eyes">
      <a href="https://github.com/ItzELECTR0/TWAOS" target="_blank" class="styled-sip-link">
        <img class="eye" src="/media/StyledSipEye.png" alt="SIPEYE-LEFT" style="top: 82vh; left: 24vh;" />
        <img class="eye" src="/media/StyledSipEye.png" alt="SIPEYE-RIGHT" style="top: 80vh; left: 32.8vh;" />
      </a>
    </div>
  </div>
</div>

<style>
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

  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  .hero h1 {
    font-family: 'Nightcore';
    font-size: 8rem;
    margin: 0;
  }

  .hero h1.sip {
    margin-top: -3vh;
  }

  .hero h2 {
    font-family: 'Nightcore';
    font-size: 4rem;
    margin: -0.8vh;
  }

  .hero h3 {
    font-family: 'Nightcore';
    font-size: 3.5rem;
    margin: 0;
  }

  .hero h5 {
    font-family: 'Redwing Medium';
    font-size: 1.5rem;
    margin: 1vh;
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
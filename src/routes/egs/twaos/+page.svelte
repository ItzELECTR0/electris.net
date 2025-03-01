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

<div class="hero">
  <h2>The Wonderful</h2>
  <h3>Adventures Of</h3>
  <h1 class="sip">SIP</h1>
  <h5>An open-source Indie Game created by a Solo Developer</h5>
  
  <div class="sip-icon">
    <a href="https://github.com/ItzELECTR0/TWAOS" target="_blank" class="styled-sip-link">
      <img class="styled-sip" src="/media/StyledSip.svg" alt="SIP">
    </a>
    <div class="eyes">
      <a href="https://github.com/ItzELECTR0/TWAOS" target="_blank" class="styled-sip-link">
        <img class="eye" src="/media/StyledSipEye.png" alt="SIPEYE-LEFT" style="top: 82vh; left: 24vh;">
        <img class="eye" src="/media/StyledSipEye.png" alt="SIPEYE-RIGHT" style="top: 80vh; left: 32.8vh;">
      </a>
    </div>
  </div>
</div>

<style>

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 6vh;
    text-align: center;
    position: relative;
    overflow: hidden;
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

  .circle.hovered-card {
  --circle-size: 2vh;
  position: fixed;
  height: var(--circle-size);
  width: var(--circle-size);
  border: 0.2vh solid #f65901;
  border-radius: 50%;
  top: calc(var(--circle-size) / 2.2 * -1);
  left: calc(var(--circle-size) / 2.2 * -1);
  pointer-events: none;
  will-change: transform;
  transition: width 0.1s ease-out, height 0.1s ease-out, top 0.1s ease-out, left 0.1s ease-out, border 0.2s ease-in-out;
  z-index: 500;
}

  .sip-icon {
    display: grid;
    place-items: center;
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
</style>
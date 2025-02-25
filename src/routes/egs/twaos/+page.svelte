<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const anchor = document.querySelector('.styled-sip') as HTMLElement;
      if (!anchor) return;

      const rekt = anchor.getBoundingClientRect();
      const anchorX = rekt.left + rekt.width / 1.5;
      const anchorY = rekt.top + rekt.height / 3;

      const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

      const eyes = document.querySelectorAll('.eye') as NodeListOf<HTMLElement>;
      eyes.forEach((eye) => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`;
      });
    });
  });

  function angle(cx: number, cy: number, ex: number, ey: number): number {
    const dy: number = ey - cy;
    const dx: number = ex - cx;
    const rad: number = Math.atan2(dy, dx);
    const deg: number = rad * 180 / Math.PI;
    return deg;
  }
</script>

<div class="hero">
  <h2>The Wonderful</h2>
  <h3>Adventures Of</h3>
  <h1 class="sip">SIP</h1>
  <h5>An open-source Indie Game created by a Solo Developer</h5>
  
  <div class="sip-icon">
    <img class="styled-sip" src="/media/StyledSip.png" alt="SIP">
    <div class="eyes">
      <img class="eye" src="/media/StyledSipEye.png" alt="SIPEYE-LEFT" style="top: 82.5vh; left: 21vh;">
      <img class="eye" src="/media/StyledSipEye.png" alt="SIPEYE-RIGHT" style="top: 79.7vh; left: 33.1vh;">
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
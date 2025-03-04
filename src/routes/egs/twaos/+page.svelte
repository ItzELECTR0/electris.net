<script lang="ts">
  import { onMount } from 'svelte';

  let currentVideo: HTMLVideoElement;
  let nextVideo: HTMLVideoElement;
  let videoSequence: string[] = [];
  let currentIndex = 0;

  function generateSequence() {
    const seq = ["/media/TWAOS/BG/1.mp4"];
    const middle = [
      "/media/TWAOS/BG/2.mp4",
      "/media/TWAOS/BG/3.mp4",
      "/media/TWAOS/BG/4.mp4",
      "/media/TWAOS/BG/5.mp4",
      "/media/TWAOS/BG/6.mp4",
      "/media/TWAOS/BG/7.mp4"
    ];
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
    seq.push(...middle);
    seq.push("/media/TWAOS/BG/8.mp4");
    return seq;
  }

  function loadNextVideo() {
    if (currentIndex < videoSequence.length) {
      nextVideo.src = videoSequence[currentIndex];
      nextVideo.load();
    }
  }

  function swapVideos() {
    const temp = currentVideo;
    currentVideo = nextVideo;
    nextVideo = temp;
    currentVideo.style.opacity = "1";
    currentVideo.play();
    attachEndedListener();
    nextVideo.style.opacity = "0";
    currentIndex++;
    if (currentIndex < videoSequence.length) {
      loadNextVideo();
    } else {
      videoSequence = generateSequence();
      currentIndex = 1;
      loadNextVideo();
    }
  }


  function onEnded() {
    if (nextVideo.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      swapVideos();
    } else {
      nextVideo.addEventListener('canplaythrough', swapVideos, { once: true });
    }
  }

  function attachEndedListener() {
    if (currentVideo) {
      currentVideo.addEventListener('ended', onEnded, { once: true });
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
    const anchor = document.querySelector('.styled-sip') as HTMLElement;
    const eyes = document.querySelectorAll('.eye') as NodeListOf<HTMLElement>;
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 1.5;
    const anchorY = rekt.top + rekt.height / 3;

    videoSequence = generateSequence();
    currentIndex = 1;
    loadNextVideo();

    if (currentVideo) {
      currentVideo.src = '/media/TWAOS/BG/1.mp4';
      currentVideo.load();
      attachEndedListener();
    }

    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!anchor) return;

      const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

      eyes.forEach((eye) => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`;

      });
    });

    currentVideo.addEventListener('ended', () => {
      if (nextVideo.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        swapVideos();
      } else {
        nextVideo.addEventListener('canplaythrough', swapVideos, { once: true });
      }
    });
  });
</script>

<svelte:head>
  <title>TWAOS | ELECTRIS</title>
</svelte:head>

<div class="hero">
  <div class="video-container">
    <video bind:this={currentVideo} class="hero-video" autoplay muted playsinline></video>
    <video bind:this={nextVideo} class="hero-video next" muted playsinline style="opacity:0;"></video>
    <div class="video-overlay"></div>
  </div>
  <div class="hero-text">
    <h2>The Wonderful</h2>
    <h3>Adventures Of</h3>
    <h1 class="sip">SIP</h1>
    <h5>An open-source Indie Game created by a Solo Developer</h5>
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
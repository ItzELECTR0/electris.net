<script lang="ts">
	import TopNav from '$lib/TopNav.svelte';
	import '/src/app.css';
  import { onMount } from "svelte";

  let circleElement: HTMLElement | null = null;

  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  let currentScale = 0;
  let currentAngle = 0;

  onMount(() => {
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const speed = 0.17;

    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;

      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
      const deltaMouseX = mouse.x - previousMouse.x
      const deltaMouseY = mouse.y - previousMouse.y
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);
      const scaleValue = (mouseVelocity / 150) * 0.5;

      currentScale += (scaleValue - currentScale) * speed;

      const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

      if (mouseVelocity > 10) {
        currentAngle = angle;
      }

      const rotateTransform = `rotate(${currentAngle}deg)`;

      if (circleElement) {
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      }

      requestAnimationFrame(tick);
    };

    tick();

    document.querySelectorAll("a, h1, h2, h3, p").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (circleElement) {
          circleElement.classList.add("hovered-text-grow");
        }
      });
      el.addEventListener("mouseleave", () => {
        if (circleElement) {
          circleElement.classList.remove("hovered-text-grow");
        }
      });
    });

    document.querySelectorAll(".nav-button, .hamburger-button, .twaos").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (circleElement) {
          circleElement.classList.add("hovered-button-grow");
        }
      });
      el.addEventListener("mouseleave", () => {
        if (circleElement) {
          circleElement.classList.remove("hovered-button-grow");
        }
      });
    });
  });
</script>

<div bind:this={circleElement} class="circle"></div>

<main>
  <TopNav />
  <slot />
</main>
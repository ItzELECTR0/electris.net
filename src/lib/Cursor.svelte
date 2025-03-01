<script lang="ts">
  import { onMount } from "svelte";

  let circleElement: HTMLElement | null = null;

  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  let currentScale = 0;
  let currentAngle = 0;

  let isTouchActive = false;
  let touchVisibility = 1;
  let isTouchDevice = false;

  const lockedPos = { x: 0, y: 0 };

  function handleTouchStart(e: TouchEvent) {
    isTouchActive = true;
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  }
  function handleTouchMove(e: TouchEvent) {
    isTouchActive = true;
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  }
  function handleTouchEnd(e: TouchEvent) {
    isTouchActive = false;
  }

  onMount(() => {
    isTouchDevice = 'ontouchstart' in window;

    switch (isTouchDevice) {
      case true:
        touchVisibility = 0
        window.addEventListener("touchstart", handleTouchStart)
        window.addEventListener("touchmove", handleTouchMove)
        window.addEventListener("touchend", handleTouchEnd)
        break;
      case false:
        window.addEventListener("mousemove", (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        });
        break;
    }

    const speed = 0.16;

    const tick = () => {
      if (circleElement?.classList.contains("hovered-sip")) {
        circle.x += (lockedPos.x - circle.x) * speed;
        circle.y += (lockedPos.y - circle.y) * speed;
      } else {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
      }

      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 5, 150);
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * speed;

      let finalScaleX = (1 + currentScale);
      let finalScaleY = (1 - currentScale);

      if (isTouchDevice) {
        finalScaleX *= touchVisibility;
        finalScaleY *= touchVisibility;
      }
      const scaleTransform = circleElement?.classList.contains("hovered-sip")
        ? ``
        : `scale(${finalScaleX}, ${finalScaleY})`;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

      if (mouseVelocity > 10) {
        currentAngle = angle;
      }

      const rotateTransform = circleElement?.classList.contains("hovered-sip")
        ? ``
        : `rotate(${currentAngle}deg)`;

      if (circleElement) {
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      }

      if (isTouchDevice) {
        if (isTouchActive) {
          touchVisibility += (1 - touchVisibility) * 0.1;
        } else {
          touchVisibility += (0 - touchVisibility) * 0.1;
        }
      } else {
        touchVisibility = 1;
      }

      requestAnimationFrame(tick);
    };


    tick();

    const sipIcon = document.querySelector('.sip-icon') as HTMLElement;
    {
      if (sipIcon) {
        sipIcon.addEventListener('mouseenter', () => {
          const styledSip = document.querySelector('.styled-sip') as HTMLElement;
          if (styledSip) {
            const rect = styledSip.getBoundingClientRect();
            lockedPos.x = rect.left + rect.width / 2 - 20;
            lockedPos.y = rect.top + rect.height / 2 -5;
          }
          circleElement?.classList.add("hovered-sip");
        });
        sipIcon.addEventListener('mouseleave', () => {
          circleElement?.classList.remove("hovered-sip");
        });
      }
    }

    
    const addHoverClasses = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, h1, h2, h3, h4, h5, p")) {
        if (target.closest(".circle-no-interact")) return;
        circleElement?.classList.add("hovered-text-grow");
      }
      if (target.closest(".option, .social-card, .logo-button, .nav-button, .hamburger-button, .menu-item, .twaos")) {
        if (target.closest(".circle-no-interact")) return;
        circleElement?.classList.add("hovered-button-grow");
      }
      if (target.closest(".hamburger-footer")) {
        circleElement?.classList.add("hovered-footer");
      }
    };

    const removeHoverClasses = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, h1, h2, h3, h4, h5, p")) {
        circleElement?.classList.remove("hovered-text-grow");
      }
      if (target.closest(".option, .social-card, .logo-button, .nav-button, .hamburger-button, .menu-item, .twaos")) {
        circleElement?.classList.remove("hovered-button-grow");
      }
      if (target.closest(".hamburger-footer")) {
        circleElement?.classList.remove("hovered-footer");
      }
    };

    document.addEventListener("mouseover", addHoverClasses);
    document.addEventListener("mouseout", removeHoverClasses);
  });
</script>

<div bind:this={circleElement} class="circle"></div>

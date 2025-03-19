<script lang="ts">
  import { onMount } from "svelte";
  import { afterNavigate } from '$app/navigation';

  let resetCursorFunction: () => void;

  let circleElement: HTMLElement | null = null;

  // Cursor Specific
  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  let currentScale = 0;
  let currentAngle = 0;

  // Mobile Specific
  let isTouchActive = false;
  let touchVisibility = 1;
  let isTouchDevice = false;

  // Hover lock Specific
  const lockedPos = { x: 0, y: 0 };

  // Navigation Specific
  let isNavigating = false;
  let resetTimer: number | null = null;

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

    resetCursorFunction = () => {
      if (circleElement) {
        circleElement.classList.remove(
          "hovered-lock",
          "hovered-text-grow",
          "hovered-button-grow",
          "hovered-footer",
          "hovered-sip",
          "hovered-menu-item"
        );
    
        currentScale = 0;
        currentAngle = 0;
    
        // Reset position to current mouse
        circle.x = mouse.x;
        circle.y = mouse.y;
    
        // Apply the reset immediately
        circleElement.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      }
    };

    const speed = 0.3;
    const hoverSpeed = 0.15;

    const handleNavigationStart = () => {
      isNavigating = true;
      if (circleElement) {
        circleElement.style.opacity = "0";
      }
    };

    document.addEventListener('sveltekit:navigation-start', handleNavigationStart);

    const tick = () => {
      if (isNavigating) {
        requestAnimationFrame(tick);
        return;
      }

      if (circleElement?.classList.contains("hovered-lock")) {
        circle.x += (lockedPos.x - circle.x) * hoverSpeed;
        circle.y += (lockedPos.y - circle.y) * hoverSpeed;
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
      const scaleTransform = circleElement?.classList.contains("hovered-lock")
        ? ``
        : `scale(${finalScaleX}, ${finalScaleY})`;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

      if (mouseVelocity > 10) {
        currentAngle = angle;
      }

      const rotateTransform = circleElement?.classList.contains("hovered-lock")
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

    afterNavigate(() => {
      setTimeout(() => {
        if (circleElement) {
          // Reset to default class (Removes all hover classes)
          circleElement.className = "circle";
      
          // Reset the transform to current mouse position
          circle.x = mouse.x;
          circle.y = mouse.y;
          circleElement.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      
          // Reset any other stuff
          currentScale = 0;
          currentAngle = 0;
        }
      }, 100);
    });

    window.addEventListener('footerHovered', (e: Event) => {
      const ce = e as CustomEvent;
      lockedPos.x = ce.detail.x;
      lockedPos.y = ce.detail.y;
      circleElement?.classList.add("hovered-lock");
    });
    window.addEventListener('footerUnhovered', (e: Event) => {
      circleElement?.classList.remove("hovered-lock");
    });
    
    window.addEventListener('sipHovered', (e: Event) => {
      const ce = e as CustomEvent;
      lockedPos.x = ce.detail.x;
      lockedPos.y = ce.detail.y;
      circleElement?.classList.add("hovered-lock");
      circleElement?.classList.add("hovered-sip");
    });
    window.addEventListener('sipUnhovered', (e: Event) => {
      circleElement?.classList.remove("hovered-lock");
      circleElement?.classList.remove("hovered-sip");
    });

    window.addEventListener('menuItemHovered', (e: Event) => {
      const ce = e as CustomEvent;
      lockedPos.x = ce.detail.x;
      lockedPos.y = ce.detail.y;
      circleElement?.classList.add("hovered-lock");
      circleElement?.classList.add("hovered-menu-item");
    });

    window.addEventListener('menuItemUnhovered', (e: Event) => {
      circleElement?.classList.remove("hovered-lock");
      circleElement?.classList.remove("hovered-menu-item");
    });
    
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
        if (target.closest(".circle-no-interact")) return;
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
        if (target.closest(".circle-no-interact")) return;
        circleElement?.classList.remove("hovered-footer");
      }
    };

    document.addEventListener("mouseover", addHoverClasses);
    document.addEventListener("mouseout", removeHoverClasses);

    return () => {
      document.removeEventListener('sveltekit:navigation-start', handleNavigationStart);
    };
  });
</script>

<div bind:this={circleElement} class="circle"></div>
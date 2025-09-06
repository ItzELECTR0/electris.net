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

  // Navigation Specific
  let isNavigating = false;

  // Hover Specific
  let lockedElement: HTMLElement | null = null;
  let lockedConfig: HoverConfig | null = null;
  let isTransitioning = false;
  let transitionStartTime = 0;
  let wasLocked = false;
  let lastLockedConfig: HoverConfig | null = null;

  interface HoverConfig {
    selectors: string[];
    className: string;
    lockPosition?: boolean;
    requireAllSelectors?: boolean;
    customEvent?: {
      hovered: string;
      unhovered: string;
    };
    customPositioning?: {
      targetSelector: string;
      offsetX?: number;
      offsetY?: number;
    };
  }
  
  // Utility functions (Turn vh/vw to px)
  function vhToPx(vh: number): number {
    return (vh / 100) * window.innerHeight;
  }

  function vwToPx(vw: number): number {
    return (vw / 100) * window.innerWidth;
  }
  
  // Hover effects list
  const hoverConfigs: HoverConfig[] = [
    {
      selectors: ['.menu-item a'],
      className: 'hovered-menu-item',
      requireAllSelectors: false,
      lockPosition: true,
      customEvent: {
        hovered: 'menuItemHovered',
        unhovered: 'menuItemUnhovered'
      }
    },
    {
      selectors: ['.nav-button', '.abt'],
      className: 'hovered-nav-abt',
      requireAllSelectors: true,
      lockPosition: true,
      customEvent: {
        hovered: 'navAbtHovered',
        unhovered: 'navAbtUnhovered'
      }
    },
    {
      selectors: ['.nav-button', '.elts'],
      className: 'hovered-nav-elts',
      requireAllSelectors: true,
      lockPosition: true,
      customEvent: {
        hovered: 'navELTSHovered',
        unhovered: 'navELTSUnhovered'
      }
    },
    {
      selectors: ['.nav-button', '.proj'],
      className: 'hovered-nav-proj',
      requireAllSelectors: true,
      lockPosition: true,
      customEvent: {
        hovered: 'navProjHovered',
        unhovered: 'navProjUnhovered'
      }
    },
    {
      selectors: ['.sip-icon'],
      className: 'hovered-sip',
      requireAllSelectors: false,
      lockPosition: true,
      customEvent: {
        hovered: 'sipHovered',
        unhovered: 'sipUnhovered'
      },
      customPositioning: {
        targetSelector: '.styled-sip'
      }
    },
    {
      selectors: ['.newhome-search', '.search-wrapper'],
      className: 'hovered-new-search',
      requireAllSelectors: true,
      lockPosition: true,
      customEvent: {
        hovered: 'searchNewHovered',
        unhovered: 'searchNewUnhovered'
      }
    },
    {
      selectors: ['.pin-card'],
      className: 'hovered-pin',
      requireAllSelectors: false,
      lockPosition: true,
      customEvent: {
        hovered: 'pinHovered',
        unhovered: 'pinUnhovered'
      }
    },
    {
      selectors: ['.hamburger-footer'],
      className: 'hovered-footer',
      requireAllSelectors: false,
      lockPosition: true,
      customEvent: {
        hovered: 'footerHovered',
        unhovered: 'footerUnhovered'
      }
    },
    {
      selectors: ['.hamburger-button'],
      className: 'hovered-hamburger',
      lockPosition: true
    },
    {
      selectors: ['.settings-button'],
      className: 'hovered-settings',
      requireAllSelectors: false,
      lockPosition: true,
      customEvent: {
        hovered: 'settingsHovered',
        unhovered: 'settingsUnhovered'
      },
      customPositioning: {
        targetSelector: '.settings-button',
        offsetX: -0.05
      }
    },
    {
      selectors: ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'p', '.time', '.date'],
      className: 'hovered-text-grow',
      lockPosition: false,
      requireAllSelectors: false
    },
    {
      selectors: [
        '.option',
        '.social-card',
        '.settings-button',
        '.menu-item',
        '.twaos-card'
      ],
      className: 'hovered-button-grow',
      lockPosition: false,
      requireAllSelectors: false
    }
  ];

  const hoveredElements = new Set<HTMLElement>();

  function shouldAllowRotation(): boolean {
    if (!circleElement) return true;
    
    if (isTransitioning) return false;
    
    const isLocked = circleElement.classList.contains('hovered-lock');
    const hasRectangularShape = circleElement.classList.contains('hovered-menu-item') || 
                                circleElement.classList.contains('hovered-footer') ||
                                circleElement.classList.contains('hovered-new-search');
    
    return !isLocked || !hasRectangularShape;
  }

  function isHoveringMenuItems(): boolean {
    return circleElement?.classList.contains('hovered-menu-item') || false;
  }

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

  function getElementCenter(element: HTMLElement, config?: HoverConfig): { x: number, y: number } {
  let targetElement = element;
  let offsetX = 0;
  let offsetY = 0;

  if (config?.className === 'hovered-pin') {
    return getPinCenter(element);
  }

  if (config?.customPositioning) {
    const customTarget = document.querySelector(config.customPositioning.targetSelector) as HTMLElement;
    if (customTarget) {
      targetElement = customTarget;
    }
    offsetX = config.customPositioning.offsetX ? vwToPx(config.customPositioning.offsetX) : 0;
    offsetY = config.customPositioning.offsetY ? vhToPx(config.customPositioning.offsetY) : 0;
  }

  const rect = targetElement.getBoundingClientRect();
  let centerX = rect.left + rect.width / 2 + offsetX;
  let centerY = rect.top + rect.height / 2 + offsetY;

  if (targetElement.closest('.newhome-search')) {
    const searchWrapper = targetElement.closest('.search-wrapper');
    if (searchWrapper) {
      const searchRect = searchWrapper.getBoundingClientRect();
      centerX = searchRect.left + searchRect.width / 2;
      centerY = searchRect.top + searchRect.height / 2;
      centerY -= vhToPx(0.1);
    }
  }

  return { x: centerX, y: centerY };
}

  function getCurrentLockedPosition(): { x: number, y: number } {
    if (!lockedElement || !lockedConfig) {
      return { x: circle.x, y: circle.y };
    }
    
    return getElementCenter(lockedElement, lockedConfig);
  }

  function getPinCenter(element: HTMLElement): { x: number, y: number } {
    const rect = element.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
  
    const pinLink = element.querySelector('.pin-link');
    if (pinLink) {
      const computedStyle = window.getComputedStyle(pinLink);
      const transform = computedStyle.transform;
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        centerY += matrix.m42;
      }
    }
  
    return { x: centerX, y: centerY };
  }

  function dispatchCustomEvent(eventName: string, element: HTMLElement, config?: HoverConfig, index?: number) {
    const center = getElementCenter(element, config);
    const detail: any = { x: center.x, y: center.y };
    if (index !== undefined) {
      detail.index = index;
    }
    
    window.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true
    }));
  }

  function elementMatchesConfig(target: HTMLElement, config: HoverConfig): { matches: boolean, element: HTMLElement | null } {
    if (config.requireAllSelectors) {
      const matchesAll = config.selectors.every(selector => target.closest(selector));
      if (matchesAll) {
        const element = target.closest(config.selectors[0]) as HTMLElement;
        return { matches: true, element };
      }
      return { matches: false, element: null };
    } else {
      const matchedSelector = config.selectors.find(selector => target.closest(selector));
      if (matchedSelector) {
        const element = target.closest(matchedSelector) as HTMLElement;
        return { matches: true, element };
      }
      return { matches: false, element: null };
    }
  }

  function handleHover(event: MouseEvent, config: HoverConfig, elementIndex?: number) {
    const target = event.target as HTMLElement;
    
    if (target.closest('.circle-no-interact')) return;

    const matchResult = elementMatchesConfig(target, config);
    if (!matchResult.matches || !matchResult.element) return;

    const element = matchResult.element;
    
    if (hoveredElements.has(element)) return;

    const wasHoveringMenu = isHoveringMenuItems();
    const willBeHoveringMenu = config.className === 'hovered-menu-item';

    hoveredElements.add(element);
    circleElement?.classList.add(config.className);

    if (config.lockPosition) {
      lockedElement = element;
      lockedConfig = config;
      
      if (wasHoveringMenu && willBeHoveringMenu) {
      } else {
        if (!circleElement?.classList.contains('hovered-lock')) {
          isTransitioning = true;
          transitionStartTime = performance.now();
        }
        
        circleElement?.classList.add('hovered-lock');
      }
    }

    if (config.customEvent) {
      dispatchCustomEvent(config.customEvent.hovered, element, config, elementIndex);
    }

    lastLockedConfig = config.lockPosition ? config : null;
  }

  function handleUnhover(event: MouseEvent, config: HoverConfig) {
    const target = event.target as HTMLElement;
    
    const matchResult = elementMatchesConfig(target, config);
    if (!matchResult.matches || !matchResult.element) return;

    const element = matchResult.element;
    if (!hoveredElements.has(element)) return;

    hoveredElements.delete(element);
    circleElement?.classList.remove(config.className);

    if (config.lockPosition) {
      const hasOtherLockedHover = hoverConfigs.some(otherConfig => 
        otherConfig.lockPosition && 
        otherConfig !== config && 
        circleElement?.classList.contains(otherConfig.className)
      );
      
      if (!hasOtherLockedHover) {
        lockedElement = null;
        lockedConfig = null;
        wasLocked = true;
        isTransitioning = true;
        transitionStartTime = performance.now();
        circleElement?.classList.remove('hovered-lock');
      }
    }

    if (config.customEvent) {
      window.dispatchEvent(new CustomEvent(config.customEvent.unhovered, {
        bubbles: true
      }));
    }
  }

  function setupHoverDetection() {
    const handleMouseOver = (event: MouseEvent) => {
      hoverConfigs.forEach((config, configIndex) => {
        if (config.className === 'hovered-menu-item') {
          const menuItems = document.querySelectorAll('.menu-item a');
          menuItems.forEach((menuItem, index) => {
            if (menuItem.contains(event.target as Node)) {
              handleHover(event, config, index);
            }
          });
        } else {
          handleHover(event, config);
        }
      });
    };

    const handleMouseOut = (event: MouseEvent) => {
      hoverConfigs.forEach(config => {
        handleUnhover(event, config);
      });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }

  function handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
  
    const isClickingHoverableElement = hoverConfigs.some(config => {
      const matchResult = elementMatchesConfig(target, config);
      return matchResult.matches;
    });
  
    if (!isClickingHoverableElement) {
      softResetCursor();
    }
  }

  function softResetCursor() {
    if (circleElement) {
      hoveredElements.clear();
    
      hoverConfigs.forEach(config => {
        circleElement?.classList.remove(config.className);
      });
    
      circleElement.classList.remove('hovered-lock');
    
      lockedElement = null;
      lockedConfig = null;
      isTransitioning = true;
      transitionStartTime = performance.now();
      wasLocked = false;
    
      hoverConfigs.forEach(config => {
        if (config.customEvent && hoveredElements.size > 0) {
          window.dispatchEvent(new CustomEvent(config.customEvent.unhovered, {
            bubbles: true
          }));
        }
      });
    }
  }

  onMount(() => {
    isTouchDevice = 'ontouchstart' in window;

    switch (isTouchDevice) {
      case true:
        touchVisibility = 0;
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
        break;
      case false:
        window.addEventListener("mousemove", (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        });
        break;
    }

    const cleanupHoverDetection = setupHoverDetection();

    resetCursorFunction = () => {
      if (circleElement) {
        circleElement.classList.remove(
          "hovered-lock",
          "hovered-text-grow",
          "hovered-button-grow",
          "hovered-footer",
          "hovered-sip",
          "hovered-menu-item",
          "hovered-new-search",
          "hovered-blog-search",
          "hovered-blog-filters",
          "hovered-pin",
          "hovered-pin-empty",
          "hovered-settings"
        );
    
        lockedElement = null;
        lockedConfig = null;
        currentScale = 0;
        currentAngle = 0;
        isTransitioning = false;
        wasLocked = false;
    
        // Reset position to current mouse
        circle.x = mouse.x;
        circle.y = mouse.y;
    
        // Apply the reset immediately
        circleElement.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      }
    };

    const speed = 0.3;
    const hoverSpeed = 0.15;
    const transitionDuration = 300; // ms

    const handleNavigationStart = () => {
      isNavigating = true;
      if (circleElement) {
        circleElement.style.opacity = "0";
      }
    };

    document.addEventListener('sveltekit:navigation-start', handleNavigationStart);
    document.addEventListener('click', handleDocumentClick);

    const tick = () => {
      if (isNavigating) {
        requestAnimationFrame(tick);
        return;
      }

      // Transition timing
      if (isTransitioning) {
        const elapsed = performance.now() - transitionStartTime;
        if (elapsed > transitionDuration) {
          isTransitioning = false;
          wasLocked = false;
        }
      }

      if (circleElement?.classList.contains("hovered-lock")) {
        const lockedPos = getCurrentLockedPosition();
        circle.x += (lockedPos.x - circle.x) * hoverSpeed;
        circle.y += (lockedPos.y - circle.y) * hoverSpeed;
      } else {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
      }

      let adjustedX = circle.x;
      let adjustedY = circle.y;
      
      if (circleElement) {
        const computedStyle = window.getComputedStyle(circleElement);
        const width = parseFloat(computedStyle.width);
        const height = parseFloat(computedStyle.height);
        adjustedX = circle.x - width / 2;
        adjustedY = circle.y - height / 2;
      }

      const translateTransform = `translate(${adjustedX}px, ${adjustedY}px)`;

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

      const allowRotation = shouldAllowRotation();
      const scaleTransform = (circleElement?.classList.contains("hovered-lock") || !allowRotation)
        ? ``
        : `scale(${finalScaleX}, ${finalScaleY})`;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

      if (mouseVelocity > 10 && allowRotation) {
        currentAngle = angle;
      }

      const rotateTransform = (circleElement?.classList.contains("hovered-lock") || !allowRotation)
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
          hoveredElements.clear();
          lockedElement = null;
          lockedConfig = null;
          
          // Remove all hover classes
          circleElement.className = "circle";
      
          // Reset transform to current mouse
          circle.x = mouse.x;
          circle.y = mouse.y;
          circleElement.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      
          // Reset the other stuff
          currentScale = 0;
          currentAngle = 0;
          isTransitioning = false;
          wasLocked = false;
        }
      }, 100);
    });

    return () => {
      document.removeEventListener('sveltekit:navigation-start', handleNavigationStart);
      document.removeEventListener('click', handleDocumentClick);
      cleanupHoverDetection();
    };
  });
</script>

<div bind:this={circleElement} class="circle"></div>
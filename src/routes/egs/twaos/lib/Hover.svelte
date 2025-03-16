<script lang="ts">
    import { onMount } from "svelte";
  
    onMount(() => {
      // Get the sip icon element
      const sipIcon = document.querySelector('.sip-icon');
      
      if (sipIcon) {
        sipIcon.addEventListener('mouseover', handleSipHover);
        sipIcon.addEventListener('mouseout', handleSipUnhover);
        
        return () => {
          sipIcon.removeEventListener('mouseover', handleSipHover);
          sipIcon.removeEventListener('mouseout', handleSipUnhover);
        };
      }
    });
  
    function handleSipHover(event: MouseEvent) {
      const styledSip = document.querySelector('.styled-sip') as HTMLElement;
      if (styledSip) {
        const rect = styledSip.getBoundingClientRect();
        const customEvent = new CustomEvent('sipHovered', {
          detail: {
            x: rect.left + rect.width / 2 - 20,
            y: rect.top + rect.height / 2 - 5
          },
          bubbles: true
        });
        window.dispatchEvent(customEvent);
      }
    }
  
    function handleSipUnhover(event: MouseEvent) {
      window.dispatchEvent(new CustomEvent('sipUnhovered', {
        bubbles: true
      }));
    }
  </script>
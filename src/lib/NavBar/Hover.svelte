<script lang="ts">
    import { onMount } from "svelte";
    
    onMount(() => {
      const menuItems = document.querySelectorAll('.menu-item a');
      
      if (menuItems.length) {
        menuItems.forEach((menuItem, index) => {
          menuItem.addEventListener('mouseover', (event) => handleMenuItemHover(event, index));
          menuItem.addEventListener('mouseout', handleMenuItemUnhover);
        });
        
        return () => {
          menuItems.forEach((menuItem, index) => {
            menuItem.removeEventListener('mouseover', (event) => handleMenuItemHover(event, index));
            menuItem.removeEventListener('mouseout', handleMenuItemUnhover);
          });
        };
      }
    });
    
    function handleMenuItemHover(event: MouseEvent, index: number) {
      const menuItem = event.currentTarget as HTMLElement;
      if (menuItem) {
        const rect = menuItem.getBoundingClientRect();
        const customEvent = new CustomEvent('menuItemHovered', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            index: index
          },
          bubbles: true
        });
        window.dispatchEvent(customEvent);
      }
    }
    
    function handleMenuItemUnhover(event: MouseEvent) {
      window.dispatchEvent(new CustomEvent('menuItemUnhovered', {
        bubbles: true
      }));
    }
  </script>
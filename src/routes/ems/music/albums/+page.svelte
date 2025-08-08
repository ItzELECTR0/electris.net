<script>
  import { onMount } from 'svelte';
  import { t } from '$lib/stores/i18n';

  onMount(() => {
    setTimeout(() => {
      const c = document.querySelector('.circle');
      if (c) c.className = 'circle';
    }, 10);
  });
</script>

<svelte:head>
  <title>Singles | ELECTRIS</title>
</svelte:head>
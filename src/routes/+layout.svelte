<script lang="ts">
  import '../styles/preflight.css';
  import '../styles/style.css';

  const isDev = import.meta.env.DEV;

  const { children } = $props();
</script>

<svelte:head>
  <title>Leseteppich</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">
</svelte:head>

{#if isDev}
  <div class="braten"></div>
{/if}

{@render children()}


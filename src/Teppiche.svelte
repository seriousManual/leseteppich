<script lang="ts">
  import type { TeppichData } from "./lib/data"

  interface Props {
    teppichs: TeppichData[]
    onTeppichSelect: (id: string) => void
  }

  const { teppichs, onTeppichSelect }: Props = $props()
</script>

<svelte:head>
  <title>Leseteppich</title> 
</svelte:head>

<h1>Teppiche</h1>

<div class="box">
  <ul>
    {#each teppichs as teppich}
      <li onclick={() => onTeppichSelect(teppich.id)}>
        {teppich.title}
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 0.8rem;
    height: 100%;
    width: 100%;
  }

  @media (min-width: 600px) {
    ul {
      grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    }
  }

  li {
    padding: 0.7rem;
    background-color: rgb(224, 224, 224);
    cursor: pointer;
    width: 100%;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
</style>

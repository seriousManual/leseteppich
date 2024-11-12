<script lang="ts">
  import Shell from "./lib/components/Shell.svelte"
  import type { TeppichData } from "./lib/data"

  interface Props {
    teppichs: TeppichData[]
    onTeppichSelect: (id: string) => void
  }

  const { teppichs, onTeppichSelect }: Props = $props()
</script>

<Shell title="Leseteppich">
  <ul>
    {#each teppichs as teppich}
      <li class="beard" onclick={() => onTeppichSelect(teppich.id)}>
        {teppich.title}
      </li>
    {/each}
  </ul>
</Shell>

<style>
   ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 0.8rem;
  }
 
  @media (min-width: 600px) {
    ul {
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    }
  }

  li {
    padding: 1.3rem 1rem;
    cursor: pointer;
    width: 100%;
    font-size: 1.8rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
</style>

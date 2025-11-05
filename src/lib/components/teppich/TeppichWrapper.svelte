<script lang="ts">
  import type { TeppichData } from "$lib/data"
  import Teppich from "$lib/components/teppich/Teppich.svelte"
  
  interface Props {
    teppich: TeppichData | undefined
    back: () => void
  }

  let { teppich, back }: Props = $props()
</script>

{#if !teppich}
  <div class="box">
    <div>Ich m&ouml;chte diesen Teppich nicht kaufen.</div>

    <button onclick={back}>Zurück</button>
  </div>
{:else}
  <Teppich teppich={teppich} back={back} />
{/if}

<style>
  .box div {
    margin-bottom: 1rem;
  }
</style>
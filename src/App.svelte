<script lang="ts">
  import Teppich from './Teppich.svelte'
  import Teppiche from './Teppiche.svelte'
  import Timer from './Timer.svelte'

  import teppichs from './lib/data'

  let currentTeppich = $state<number | undefined>(undefined)
</script>

<Timer />

{#if currentTeppich !== undefined}
  <Teppich 
    teppich={teppichs[currentTeppich]}
    back={() => currentTeppich = undefined}
  />
{:else}
  <Teppiche 
    teppichs={teppichs}
    onTeppichSelect={index => currentTeppich = index}
  />
{/if}


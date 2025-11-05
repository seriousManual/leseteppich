<script lang="ts">
  import type { Phrase } from "$lib/data"

  interface Props {
    phrase: Phrase
  }

  let { phrase }: Props = $props()

  let hasSyllabs = $derived(typeof phrase !== 'string' && phrase.length > 1)
  let parts = $derived(hasSyllabs ? phrase : [phrase])
</script>

<div class:withsyllabs={hasSyllabs}>
  {#each parts as a}
    <span>{a}</span>
  {/each}
</div>

<style>
  div.withsyllabs {
    span:nth-child(odd) {
      color: #7382BF;
    }
  }
</style>
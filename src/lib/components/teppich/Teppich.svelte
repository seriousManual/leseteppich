<script lang="ts">
  import ConfettiExplosion from "svelte-confetti-explosion/ConfettiExplosion.svelte"

  import type { TeppichData } from "$lib/data"
  import { shuffle } from "$lib/util"

  import type { Phrase } from "$lib/data"
  import PhraseVis from "$lib/components/teppich/PhraseVis.svelte"
  import tracking from "$lib/tracking"
  import Shell from "$lib/components/Shell.svelte";

  interface PhraseState {
    phrase: Phrase
    state: "initial" | "current" | "read"
  }

  interface Props {
    teppich: TeppichData
    back: () => void
  }

  let { teppich, back }: Props = $props()

  let showConfetti = $state(false)
  let phrases = $state(generate())

  let unreadEntries = $derived(phrases.filter((phrase) => phrase.state === "initial"))
  let currentEntry = $derived(phrases.find((phrase) => phrase.state === "current"))
  let readEntries = $derived(phrases.filter((phrase) => phrase.state === "read"))

  let phraseContainers = $state<HTMLDivElement[]>([])

  function initiate() {
    phrases = generate()
  }

  function generate(): PhraseState[] {
    const shuffled = shuffle(teppich.phrases)
    const sliced = teppich.splitable ? shuffled.slice(0, 20) : shuffled
    const mapped = sliced.map((phrase) => ({ phrase, state: "initial" }))

    return mapped as PhraseState[]
  }

  function mark() {
    // session started?
    if (currentEntry) {
      currentEntry.state = "read"
    } else {
      tracking.trackStart(teppich.id)
    }

    if (unreadEntries.length === 0) {
      tracking.trackFinish(teppich.id)
      showConfetti = true

      setTimeout(() => {
        showConfetti = false
        initiate()
      }, 3000)
    } else {
      const next = unreadEntries[Math.floor(Math.random() * unreadEntries.length)]
      next.state = 'current'

      const currentPhraseContainer = phraseContainers[phrases.findIndex(phrase => phrase.state === "current")]
      currentPhraseContainer?.scrollIntoView({behavior: 'smooth'})
    }
  }
</script>

{#snippet footerContent()}
  <button class="full" onclick={mark}>
    {#if currentEntry}
      Nächster ({readEntries.length} von {phrases.length} geschafft)
    {:else}
      Start
    {/if}
  </button>
{/snippet}

<Shell title={teppich.title} back={back} footer={footerContent}>
  <div class="main">
    {#if showConfetti}
      <div class="conf">
        <ConfettiExplosion duration={3000} stageHeight={400} stageWidth={600} />
      </div>
    {/if}

    <div class="box entries">
      {#each phrases as phrase, i}
        <div 
          class="beard"
          bind:this={phraseContainers[i]}
          class:marked={phrase.state === 'current'}
          class:solved={phrase.state === 'read'}
        >
          <PhraseVis phrase={phrase.phrase} />
        </div>
      {/each}
    </div>
  </div>
</Shell>

<style>
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;

    .buttons {
      margin-bottom: 1rem;
    }
  }

  .conf {
    width: 10px;
    margin: 0 auto;
  }

  .entries {
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr)); */
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    align-items: start;
    width: 100%;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 5rem;
      font-size: 1.8rem;
      font-weight: light;

      &.marked {
        background-color: #FAD07E;
        border: 0.15rem solid #FAD07E;
        color: #fff;
        /* box-shadow: 0px 0px 2rem 0px #b0b0b0; */
      }

      &.solved {
        opacity: 0.1;
      }
    }
  }

  @media (min-width: 400px) {
    .entries {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 600px) {
    .entries {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 900px) {
    .entries {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>

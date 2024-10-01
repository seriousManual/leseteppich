<script lang="ts">
  import type { TeppichData } from "./lib/data";
  import { shuffle } from "./lib/util";

  import { ConfettiExplosion } from "svelte-confetti-explosion";

  interface PhraseState {
    phrase: string;
    state: "initial" | "current" | "read";
  }

  interface Props {
    teppich: TeppichData;
    back: () => void;
  }

  const { teppich, back }: Props = $props();

  let showConfetti = $state(false);
  let phrases = $state(generate());

  let unsolved = $derived(phrases.filter((phrase) => phrase.state === "initial"));
  let current = $derived(phrases.find((phrase) => phrase.state === "current"));
  let solved = $derived(phrases.filter((phrase) => phrase.state === "read"));

  function initiate() {
    phrases = generate();
  }

  function generate(): PhraseState[] {
    const shuffled = shuffle(teppich.phrases);
    const sliced = shuffled.slice(0, 20);
    const mapped = sliced.map((phrase) => ({ phrase, state: "initial" }));

    return mapped as PhraseState[];
  }

  function mark() {
    if (current) {
      current.state = "read";
    }

    if (unsolved.length === 0) {
      showConfetti = true;

      setTimeout(() => {
        showConfetti = false;
        initiate()
      }, 3000);
    } else {
      const next = unsolved[Math.floor(Math.random() * unsolved.length)];
      next.state = 'current'
    }
  }
</script>

<div class="main">
  <h1>{teppich.title}</h1>

  <div class="buttons">
    <button onclick={back}>Zurück</button>
    <button onclick={initiate}>Mischen</button>
  </div>

  {#if showConfetti}
    <div class="conf">
      <ConfettiExplosion duration={3000} stageHeight={400} stageWidth={600} />
    </div>
  {/if}

  <div class="box entries" style="">
    {#each phrases as phrase}
      <div 
        class:marked={phrase.state === 'current'}
        class:solved={phrase.state === 'read'}
      >
        {phrase.phrase}
      </div>
    {/each}
  </div>

  <button class="full" onclick={mark}>
    {#if current}
      Nächster ({solved.length} von {phrases.length} geschafft)
    {:else}
      Start
    {/if}
  </button>
</div>

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
    border: 1px solid red;
    width: 10px;
    margin: 0 auto;
  }

  .entries {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
    gap: 0.8rem;
    height: 100%;
    width: 100%;
    overflow: auto;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: rgb(224, 224, 224);
      padding: 1.2rem;
      font-size: 1.5rem;
      border-radius: 0.3rem;

      &.marked {
        background-color: yellow;
        box-shadow: 0px 0px 2rem 0px #b0b0b0;
      }

      &.solved {
        opacity: 0.1;
      }
    }
  }

  @media (min-width: 600px) {
    .entries {
      grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    }
  }

  @media (min-width: 900px) {
    .entries {
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .entries {
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    }
  }
</style>

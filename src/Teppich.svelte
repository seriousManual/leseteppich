<script lang='ts'>
    import { tick } from "svelte";
    import type { TeppichData } from "./lib/data";
    import { shuffle } from "./lib/util";

    import { ConfettiExplosion } from 'svelte-confetti-explosion'

    const { teppich, back }: { teppich: TeppichData, back: () => void } = $props()

    let showConfetti = $state(false)
    let phrases = $state(shuffle(teppich.phrases))
    let availableForMarks = $state(teppich.phrases)
    let marked = $state<string | undefined>(undefined)

    function shufflePhrases() {
        phrases = shuffle(phrases)
        marked = undefined
    }

    async function mark(){
        const newMark = availableForMarks[Math.floor(Math.random() * availableForMarks.length)]
        availableForMarks = availableForMarks.filter(mark => mark !== newMark)
        marked = newMark

        if (availableForMarks.length === 0) {
            availableForMarks = phrases
            marked = undefined
            showConfetti = true

            setTimeout(() => {
                showConfetti = false
            }, 3000)
        }
    }
</script>

<div class="main">
    <h1>{teppich.title}</h1>

    <div class="buttons">
        <button onclick={back}>Zurück</button>
        <button onclick={shufflePhrases}>Mischen</button>
    </div>

    {#if showConfetti}
        <div class="conf">
            <ConfettiExplosion duration={3000} stageHeight={400} stageWidth={600} />
        </div>
    {/if}

    <div class='box entries' style="">
        {#each phrases as phrase}
            <div class="{phrase === marked ? 'marked' : ''}">{phrase}</div>
        {/each}
    </div>

    <button class="full" onclick={mark}>
        {#if marked}
            Nächster ({phrases.length - availableForMarks.length} von {phrases.length} geschafft)
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

    .entries div {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgb(224, 224, 224);
        padding: 1.2rem;
        font-size: 1.5rem;
        border-radius: 0.3rem;
    }

    .entries div.marked {
        background-color: yellow;
        box-shadow: 0px 0px 2rem 0px #B0B0B0;
    }
</style>
<script lang='ts'>
    import type { TeppichData } from "./lib/data";
    import { getMatrixByList, shuffle } from "./lib/util";

    const { teppich, back }: { teppich: TeppichData, back: () => void } = $props()

    let matrix = $derived(getMatrixByList(teppich.phrases.length))
    let phrases = $state(shuffle(teppich.phrases))
    let marked = $state<number | undefined>(undefined)

    function shufflePhrases() {
        phrases = shuffle(phrases)
        marked = undefined
    }

    function mark(){
        marked = Math.floor(Math.random() * phrases.length)
    }
</script>

<h1>{teppich.title}</h1>

<div class="buttons">
    <button onclick={back}>Zurueck</button>
    <button onclick={shufflePhrases}>Mischen</button>
</div>

<div class='box entries' style="">
    {#each phrases as phrase, i}
        <div class="{i === marked ? 'marked' : ''}">{phrase}</div>
    {/each}
</div>

<button class="full" onclick={mark}>
    Naechster
</button>

<style>
    .buttons {
        margin-bottom: 1rem;
    }

    .entries {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr)); /* Adjust 200px to your desired minimum size */
        gap: 0.8rem;
        height: 100%;
        width: 100%;
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
    }
</style>
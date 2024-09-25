<script lang='ts'>
    import type { TeppichData } from "./lib/data";
    import { getMatrixByList, shuffle } from "./lib/util";

    const { teppich, back }: { teppich: TeppichData, back: () => void } = $props()

    let matrix = $derived(getMatrixByList(teppich.phrases.length))
    let phrases = $state(shuffle(teppich.phrases))

    function shufflePhrases() {
        phrases = shuffle(phrases)
    }
</script>

<h1>{teppich.title}</h1>

<button onclick={back}>back</button>
<button onclick={shufflePhrases}>shuffle</button>

<div class='box entries' style="grid-template-columns: repeat({matrix.width}, 1fr); grid-template-rows: repeat({matrix.height}, 1fr)">
    {#each phrases as phrase}
        <div>{phrase}</div>
    {/each}
</div>

<style>
    .entries {
        display: grid;
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
</style>
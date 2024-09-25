<script lang="ts">
    import type { TeppichData } from "./lib/data";
    import Teppich from "./Teppich.svelte";

    interface Props {
        teppichs: TeppichData[]
        onTeppichSelect: (index: number) => void
    }

    const { teppichs, onTeppichSelect }: Props = $props()
</script>

<h1>Teppiche</h1>

<div class='box'>
    <ul>
        {#each teppichs as teppich, i}
                <li onclick={() => onTeppichSelect(i)}>
                    {teppich.title}
                </li>
        {/each}
    </ul>
</div>

<style>
    li {
        padding: 0.7rem;
        background-color: rgb(224, 224, 224);
        margin-bottom: 0.9rem;
        /* border: 1px solid #ccc; */
        border-radius: 0; /* No rounded corners for items */
        cursor: pointer;
    }

    li:last-child {
        margin-bottom: 0;
    }

    li:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
</style>
import dedupe from "dedupe"

export interface TeppichData {
    title: string
    phrases: string[]
}

const importedTeppichs: Record<string, TeppichData> = import.meta.glob('../../data/*.json', {eager: true}) 
const teppichs = Object.values(importedTeppichs)
    .map(entry => {
        const copy = { ...entry }
        copy.phrases = dedupe(copy.phrases)

        return copy
    })

export default teppichs
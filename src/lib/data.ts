import dedupe from "dedupe"

export type Phrase = string | string[]

export interface TeppichData {
  id: string
  title: string
  splitable: boolean
  phrases: Phrase[]
}

const importedTeppichs: Record<string, TeppichData> = import.meta.glob('../../data/*.json', {eager: true}) 
const teppichs = Object.values(importedTeppichs)
  .map(entry => {
    const copy = { ...entry }
    copy.phrases = dedupe(copy.phrases, (a: Phrase) => JSON.stringify(a))

    return copy
  })

export default teppichs
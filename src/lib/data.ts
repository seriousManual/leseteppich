import dedupe from "dedupe"

export type Phrase = string | string[]

export interface TeppichData {
  id: string
  title: string
  splitable: boolean
  skip: boolean
  phrases: Phrase[]
}

const importedTeppichs: Record<string, TeppichData> = import.meta.glob('../../data/*.json', {eager: true}) 
const teppichs = Object.values(importedTeppichs)
  .filter(entry => !entry.skip)
  .map(entry => {
    const copy = { ...entry }
    copy.phrases = dedupe(copy.phrases, (a: Phrase) => JSON.stringify(a))

    return copy
  })

teppichs.sort((a, b) => b.id.localeCompare(a.id))

export function getTeppichById(id: string) {
  return teppichs.find(t => t.id === id)
}

export default teppichs
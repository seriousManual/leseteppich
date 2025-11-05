import dedupe from "dedupe"

export type Phrase = string | string[]

export interface TeppichData {
  id: string
  title: string
  splitable: boolean
  skip: boolean
  phrases: Phrase[]
}

const importedTeppichs = import.meta.glob('../../data/*.json', {eager: true, import: 'default'}) as Record<string, TeppichData>
const teppichs = Object.values(importedTeppichs)
  .filter(entry => !entry.skip)
  .map(entry => {
    const copy = { ...entry }
    copy.phrases = dedupe(copy.phrases, (a: Phrase) => JSON.stringify(a))

    return copy
  })

teppichs.sort((a, b) => {
  // Extract numeric part from IDs like "l0001", "l0012", etc.
  const numA = parseInt(a.id.replace(/\D/g, ''), 10)
  const numB = parseInt(b.id.replace(/\D/g, ''), 10)
  return numA - numB
})

export function getTeppichById(id: string) {
  return teppichs.find(t => t.id === id)
}

export default teppichs
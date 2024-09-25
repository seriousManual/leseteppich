export interface TeppichData {
    title: string
    phrases: string[]
}

const importedTeppichs: Record<string, TeppichData> = import.meta.glob('../../data/*.json', {eager: true}) 
const teppichs = Object.values(importedTeppichs)

export default teppichs
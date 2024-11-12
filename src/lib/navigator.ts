import { navigate } from "svelte-routing"

import { getTeppichById } from "./data"

import tracking from "./tracking"

export function gotoTeppich(teppichId: string) {
  const url = `/teppich/${teppichId}`
  const teppich = getTeppichById(teppichId)

  tracking.trackPage(url, `Teppich - ${teppich?.title}`)
  navigate(url)
}

export function gotoOverview() { 
  const url = '/'
        
  tracking.trackPage(url, 'Teppiche')
  navigate(url)
}
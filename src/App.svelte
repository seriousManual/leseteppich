<script lang="ts">
  import { Router, Route, navigate } from "svelte-routing";

  import Teppiche from './Teppiche.svelte'
  import Timer from './Timer.svelte'
  import TeppichWrapper from "./TeppichWrapper.svelte";

  import teppichs, { getTeppichById } from './lib/data'
  import tracking from './lib/tracking'
</script>

<Timer />

<Router>
  <Route path="/">
    <Teppiche 
      teppichs={teppichs}
      onTeppichSelect={id => {
        const url = `/teppich/${id}`
        const teppich = getTeppichById(id)

        tracking.trackPage(url, `Teppich - ${teppich?.title}`)
        navigate(url)
      }}
    />
  </Route>

  <Route path="/teppich/:id" let:params>
    <TeppichWrapper
      teppich={teppichs.find(t => t.id === params.id)}
      back={() => {
        const url = '/'
        
        tracking.trackPage(url, 'Teppiche')
        navigate(url)
      }}
    />
  </Route>
</Router>


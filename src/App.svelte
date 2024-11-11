<script lang="ts">
  import { Router, Route, navigate } from "svelte-routing";

  import Teppiche from './Teppiche.svelte'
  import Timer from './Timer.svelte'
  import TeppichWrapper from "./TeppichWrapper.svelte";

  import teppichs from './lib/data'
  import tracking from './lib/tracking'
</script>

<Timer />

<Router>
  <Route path="/">
    <Teppiche 
      teppichs={teppichs}
      onTeppichSelect={id => {
        navigate(`/teppich/${id}`)
        tracking.trackTeppichCall(id)
      }}
    />
  </Route>

  <Route path="/teppich/:id" let:params>
    <TeppichWrapper
      teppich={teppichs.find(t => t.id === params.id)}
      back={() => navigate('/')}
    />
  </Route>
</Router>


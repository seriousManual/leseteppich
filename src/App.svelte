<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Teppiche from './Teppiche.svelte'
  import TeppichWrapper from "./TeppichWrapper.svelte";

  import teppichs from './lib/data'
  import { gotoOverview, gotoTeppich } from "./lib/navigator";

  const isDev = import.meta.env.DEV
</script>

{#if isDev}
  <div class="braten"></div>
{/if}

<Router>
  <Route path="/">
    <Teppiche 
      teppichs={teppichs}
      onTeppichSelect={gotoTeppich}
    />
  </Route>

  <Route path="/teppich/:id" let:params>
    <TeppichWrapper
      teppich={teppichs.find(t => t.id === params.id)}
      back={gotoOverview}
    />
  </Route>
</Router>

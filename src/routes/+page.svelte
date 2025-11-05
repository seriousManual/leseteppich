<script lang="ts">
  import Teppiche from '$lib/components/Teppiche.svelte';
  import teppichs from '../lib/data';
  import { goto } from '$app/navigation';

  function gotoTeppich(teppichId: string) {
    goto(`/teppich/${teppichId}`);
  }
</script>

<Teppiche
  teppichs={teppichs}
  onTeppichSelect={gotoTeppich}
/>


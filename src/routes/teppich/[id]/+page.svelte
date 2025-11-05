<script lang="ts">
  import TeppichWrapper from '$lib/components/teppich/TeppichWrapper.svelte';
  import teppichs from '../../../lib/data';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const teppichId = $derived($page.params.id);
  const teppich = $derived(teppichs.find(t => t.id === teppichId));

  function gotoOverview() {
    goto('/');
  }
</script>

<TeppichWrapper
  teppich={teppich}
  back={gotoOverview}
/>


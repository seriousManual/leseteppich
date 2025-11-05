/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'svelte-icons/md/*.svelte' {
  import { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}

declare module 'svelte-confetti-explosion' {
  import { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}


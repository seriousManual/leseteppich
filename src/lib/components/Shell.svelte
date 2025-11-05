<script lang="ts">
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte'
  import Timer from './teppich/Timer.svelte';

  interface Props {
    title: string
    children: any
    back?: () => void
    options?: any[]
    footer?: any
  }

  let { children, title, back, options, footer }: Props = $props()

  const devMode = import.meta.env.DEV;
</script>

<svelte:head>
  <title>{title}</title> 
</svelte:head>


<div class="outer">
  {#if devMode}
    <div class="browser-sim top"></div>
  {/if}

  <main>
    <div class="title">
      {#if back}
        <div class="icon back" onclick={back}>
          <MdArrowBack  />
        </div>
      {/if}

      {title}

      <div class="options">
        <Timer />
      </div>
    </div>

    <div class="content">
      {@render children()}
    </div>

    {#if footer}
      <div class="footer">
        {@render footer()}
      </div>
    {/if}
  </main>

  {#if devMode}
    <div class="browser-sim bottom"></div>
  {/if}
</div>

<style>
  .outer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  main {
    flex-grow: 1;
    background-color: #F5F8FF;
    overflow: hidden;

    margin: 1rem;

    display: flex;
    flex-direction: column;
    height: 100%;

    border-radius: 1.3rem;
    box-shadow: 0px 0px 2rem 0px #b0b0b0;

    .title {
      position: relative;
      background-color: #7382BF;
      color: #FBFCFC;
      padding: 1rem;
      font-size: 1.5rem;
      text-align: center;
    }

    .content {
      /* border: 1px solid red; */
      flex-grow: 1;
      padding: 1rem;
      overflow-y: auto;
    }

    .footer {
      height: 6rem;
      padding: 1rem;
    }
  }

  .title div {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  .back {
    width: 2.5rem;
    left: 1rem;
  }

  .options {
    display: flex;
    right: 1rem;
    gap: 0rem;
  }

  .browser-sim {
    background-color: black;
    height: 4rem;
  }

  @media (min-width: 600px) {
    main .title {
      font-size: 2rem;
    }
  }

  @media (min-width: 900px) {
    main .title {
      font-size: 3rem;
    }
  }
</style>
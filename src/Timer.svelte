<script lang='ts'>
  import MdWatchLater from 'svelte-icons/md/MdWatchLater.svelte'

  import tracking from './lib/tracking'
  import timerState from './lib/timer.svelte'
  import { formatTime } from './lib/util'

  const timer = timerState()
  let timeFormatted = $derived(formatTime(timer.time))

  function startTimer() {
    if (timer.timerState === 'activated') return

    timer.startTimer()
    tracking.trackTimerStart()
  }
</script>

<div class:activated={timer.timerState === 'activated'} class:finished={timer.timerState === 'finished'} onclick={startTimer}>
  {#if timer.timerState !== 'idle'}
    <span>{timeFormatted}</span>
  {:else}
    <MdWatchLater />
  {/if}
</div>

<style>
  div {
    width: 4.5rem;
    height: 3rem;
    border-right: 0;

    font-size: 1rem;
    
    display: flex;
    justify-content: center; /* Horizontally centers items */
    align-items: center;    /* Vertically centers items */

    white-space: nowrap;
    overflow: hidden;

    transition: width 0.5s;

    cursor: pointer;
    text-align: center;

    &.finished {
      animation: blink-animation 0.8s ease-in-out 0s 8 alternate;
    }
  }

  @keyframes blink-animation {
    0%,
    100% {
      background-color: red;
      color: white;
      border: 0.3rem solid red;
    }
    50% {
      background-color: white;
      color: black;
      border: 0.3rem solid white;
    }
  }

  @media (min-width: 600px) {
    div {
      font-size: 2rem;
    }
  }

  @media (min-width: 900px) {
    div {
      font-size: 3rem;
    }
  }
</style>

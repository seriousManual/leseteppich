<script lang="ts">
  const timerBase = 600

  let activated = $state(false)
  let finished = $state(false)
  let time = $state(0)
  let timeFormatted = $derived(formatTime(time))

  let timer: number | undefined = undefined

  function activation() {
    if (activated) {
      if (timer) clearInterval(timer)
      activated = false
    } else {
      activated = true
      time = timerBase;
      timer = setInterval(() => {
        time--;

        if (time === 0) {
          finished = true
          clearInterval(timer)

          setTimeout(() => {
            finished = false
            activated = false
          }, 4000)
        }
      }, 1000);
    }
  }

  function formatTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 60);
    const minutes = timeInSeconds - hours * 60;

    const hoursPadded = pad(hours);
    const minutesPadded = pad(minutes);

    return `${hoursPadded}:${minutesPadded}`;
  }

  function pad(n: number) {
    const s = String(n)
    return s.length === 1 ? `0${s}` : s;
  }
</script>

<div class:activated class:finished onclick={activation}>
  ⏱️
  {#if activated}
    <span>{timeFormatted}</span>
  {/if}
</div>

<style>
  div {
    width: 2rem;
    right: 0;
    top: 1rem;
    position: absolute;
    border: 0.3rem solid rgb(35, 35, 255);
    border-right: 0;
    padding: 0.2rem;
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;

    white-space: nowrap;
    overflow: hidden;

    transition: width 0.5s;

    cursor: pointer;

    &.activated {
      width: 5rem;
    }

    &.finished {
      animation: blink-animation 0.8s ease-in-out 0s 8 alternate;
    }
  }

  @keyframes blink-animation {
    0%,100% {
      background-color: red;
      color: white;
    }
    50% {
      background-color: white;
      color: black;
    }
  }
</style>

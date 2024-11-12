const timerBase = 600

let time = $state(timerBase)
let handle: number | undefined = $state(undefined)

type timerstate = 'idle' | 'activated' | 'finished'

function timerState() {
  function startTimer() {
    if (handle) return

    handle = setInterval(() => {
      time--

      if (time === 0) {
        clearInterval(handle)
        handle = undefined

        setTimeout(() => {
          time = timerBase
          handle = undefined
        }, 4000)
      }
    }, 1000)
  }

  function deriveTimerState(): timerstate {
    if (time === 0) return 'finished'
    if (handle !== undefined) return 'activated'
    return 'idle'
  }

  let timerState = $derived(deriveTimerState())

  return {
    get time() {
      return time
    },
    get timerState() {
      return timerState
    },
    startTimer
  }
}

export default timerState
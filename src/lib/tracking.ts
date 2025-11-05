import { track } from '@vercel/analytics';

const tracking = {
  trackStart(id: string) {
    track('teppich_start', { teppich_id: id });
  },

  trackFinish(id: string) {
    track('teppich_finish', { teppich_id: id });
  },

  trackTimerStart() {
    track('timer_start');
  },

  trackTimerFinished() {
    track('timer_finished');
  },
}

export default tracking;
const mm = _paq ?? { push: (values: any[]) => console.debug('tracking: ', values) }

const tracking = {
  trackTeppichCall(id: string) {
    mm.push(['trackEvent', 'navigate', 'teppich', id]);
  },

  trackMix(id: string) {
    mm.push(['trackEvent', 'teppich', 'mix', id]);
  },

  trackStart(id: string) {
    mm.push(['trackEvent', 'teppich', 'start', id]);
  },

  trackFinish(id: string) {
    mm.push(['trackEvent', 'teppich', 'finish', id]);
  },
}

export default tracking
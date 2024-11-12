const mm = _paq ?? { push: (values: any[]) => console.debug('tracking: ', values) }

const tracking = {
  trackMix(id: string) {
    mm.push(['trackEvent', 'teppich', 'mix', id])
  },

  trackStart(id: string) {
    mm.push(['trackEvent', 'teppich', 'start', id])
  },

  trackFinish(id: string) {
    mm.push(['trackEvent', 'teppich', 'finish', id])
  },

  trackTimerStart() {
    mm.push(['trackEvent', 'timer', 'start'])
  },

  trackTimerFinished() {
    mm.push(['trackEvent', 'timer', 'finished'])
  },

  trackPage(url: string, title: string) {
    mm.push(['setCustomUrl', url]);
    mm.push(['setDocumentTitle', title]);
    mm.push(['trackPageView']);
  }
}

export default tracking
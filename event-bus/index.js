export default class Evemitter {
  constructor() {
    this.events = {}
  }
  on(event, handler) {
    (this.events[event] = this.events[event] || []).push(handler)
  }
  once(event, handler) {
    const fn = (...data) => {
      this.off(event, fn)
      handler(...data)
    }
    this.on(event, handler)
  }
  off(event, handler) {
    if (event in this.events) {
      const handlers = this.events[event]
      const index = this.events[event].indexOf(handler)
      if (~index) handlers.splice(index, 1)
    }
  }
  trigger(event, ...data) {
    if (event in this.events) {
      this.events[event].forEach(handler => handler(...data))
    }
  }
}
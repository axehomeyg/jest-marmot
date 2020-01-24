/* istanbul ignore file */
// Some environments require this mock
// to not hang at the end of your jest runs.
// debugOpenHandles doesn't reveal the cause.
class MessageChannelMock {
  constructor(...args) {
    return {
      port1: this,
      port2: this
    }
  }

  set onmessage(value) { this.on('message', value) }

  on = (msg, callback) => (
    this.callbacksFor(msg).push(callback))

  callbacks = () => (this.onCallbacks || (this.onCallbacks = {}))

  callbacksFor = msg => this.callbacks()[msg] || (this.callbacks()[msg] = [])

  postMessage = (...msg) => this.run(this.callbacksFor('message'), ...msg)

  close = () => this.run(this.callbacksFor('close'))

  run = (callbacks, ...msg) => (
    (callbacks || [])
      .map(callback => callback(...msg)))
}

export const stubMessageChannel = () => ( 
  (window && !window.MessageChannel) &&
    (window.MessageChannel = MessageChannelMock))


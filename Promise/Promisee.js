class Promisee {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a function')
    }
    this.$status = 'PENDING'
    this.$chain = []
    const resolve = val => {
      if (this.$status !== 'PENDING') return
      if (val && typeof val.then === 'function') {
        return val.then(resolve, reject)
      }
      this.$status = 'FULFILLED'
      this.$internalVal = val
      for (const { onFulFilled } of this.$chain) {
        onFulFilled(val)
      }
      return val
    }
    const reject = err => {
      if (this.$status !== 'PENDING') return
      this.$status = 'REJECTED'
      this.$internalVal = err
      for (const { onRejected } of this.$chain) {
        onRejected(err)
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulFilled, onRejected) {
    return new Promisee((resolve, reject) => {
      const _onFulFilled = val => {
        try {
          resolve(onFulFilled(val))
        } catch (err) {
          reject(err)
        }
      }
      const _onRejected = err => {
        try {
          reject(onRejected(err))
        } catch (e) {
          reject(e)
        }
      }
      if (this.$status === 'FULFILLED') {
        _onFulFilled(this.$internalVal)
      } else if (this.$status === 'REJECTED') {
        _onRejected(this.$internalVal)
      } else {
        this.$chain.push({ onFulFilled: _onFulFilled, onRejected: _onRejected })
      }
    })
  }
}
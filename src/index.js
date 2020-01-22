const borc = require('borc')
const { decodeAddress, marshalBigInt } = require('./utils')

class Message {
  constructor({ to, from, nonce, value, method, gasPrice, gasLimit, params }) {
    if (typeof nonce !== 'number')
      throw new Error('No nonce provided or nonce is not a number')
    this.nonce = nonce

    // TODO: better validation
    if (!to) throw new Error('Invalid "to" address')
    this.to = to

    if (!from) throw new Error('Invalid "from" address')
    this.from = from

    if (!value) throw new Error('No value provided')
    this.value = value

    if (typeof method !== 'number') throw new Error('Invalid "method" passed')
    this.method = method

    if (!gasPrice) throw new Error('No gas price provided')
    this.gasPrice = gasPrice

    if (!gasLimit) throw new Error('No gas limit provided')
    this.gasLimit = gasLimit

    this.params = params
  }

  toObj = () => {
    if (typeof this.nonce !== 'number')
      throw new Error('Cannot encode message without a nonce')
    const message = {
      to: this.to,
      from: this.from,
      nonce: this.nonce,
      Value: this.value,
      method: this.method,
      gasPrice: this.gasPrice,
      gasLimit: this.gasLimit,
      params: this.params
    }
    return message
  }

  serialize = () =>
    new Promise(resolve => {
      const answer = []
      answer.push(decodeAddress(this.to))
      answer.push(decodeAddress(this.from))
      answer.push(this.nonce)
      answer.push(marshalBigInt(this.value))
      answer.push(marshalBigInt(this.gasPrice))
      answer.push(marshalBigInt(this.gasLimit))
      answer.push(this.method)

      if (this.params) {
        answer.push(this.params)
        return resolve(borc.encode(answer))
      }

      const emptyParamsHeader = new Buffer.alloc(1)
      emptyParamsHeader[0] = 64
      const cborWithEmptyParams = Buffer.concat([
        borc.encode(answer),
        emptyParamsHeader
      ])
      // Change the first byte since cbor is encoded w/o params
      cborWithEmptyParams[0] = 136

      return resolve(cborWithEmptyParams)
    })
}

module.exports = Message

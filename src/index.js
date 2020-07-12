const { newFromString, encode } = require('@openworklabs/filecoin-address')
const { BigNumber } = require('@openworklabs/filecoin-number')

let typeCheck

class Message {
  constructor({ to, from, nonce, value, gasPrice, gasLimit, method, params }) {
    typeCheck({ to, from, nonce, value, gasPrice, gasLimit, method, params })
    this.to = newFromString(to)
    this.from = newFromString(from)
    this.nonce = nonce
    this.value = new BigNumber(value)
    this.gasPrice = new BigNumber(gasPrice)
    this.gasLimit = gasLimit
    this.method = method
    this.params = params

    if (to[0] !== from[0])
      throw new Error('Addresses have different network prefixes')
    this.networkPrefix = from[0]
  }

  encode = () => {
    if (typeof this.nonce !== 'number')
      throw new Error('Cannot encode message without a nonce')
    const message = {
      To: encode(this.networkPrefix, this.to),
      From: encode(this.networkPrefix, this.from),
      Nonce: this.nonce,
      Value: this.value,
      GasPrice: this.gasPrice,
      GasLimit: this.gasLimit,
      Method: this.method,
      Params: this.params
    }
    return message
  }

  toString = () => {
    const message = {
      to: encode(this.networkPrefix, this.to),
      from: encode(this.networkPrefix, this.from),
      nonce: this.nonce,
      value: this.value.toString(),
      gasprice: this.gasPrice.toString(),
      gaslimit: this.gasLimit,
      method: this.method,
      params: this.params
    }

    return message
  }
}

typeCheck = ({ to, from, nonce, value, method, gasPrice, gasLimit }) => {
  if (!to) throw new Error('No to address provided')
  if (!from) throw new Error('No from address provided')

  if (!nonce && nonce !== 0) throw new Error('No nonce provided')
  if (typeof nonce !== 'number') throw new Error('Nonce is not a number')
  if (!(nonce <= Number.MAX_SAFE_INTEGER))
    throw new Error('Nonce must be smaller than Number.MAX_SAFE_INTEGER')

  if (!value) throw new Error('No value provided')

  if (!gasPrice) throw new Error('No gas price provided')

  if (!gasLimit) throw new Error('No gas limit provided')
  if (typeof gasLimit !== 'number') throw new Error('Gas limit is not a number')
  if (!(gasLimit <= Number.MAX_SAFE_INTEGER))
    throw new Error('Gas limit must be smaller than Number.MAX_SAFE_INTEGER')

  if (!method && method !== 0) throw new Error('No method provided')
  if (typeof method !== 'number') throw new Error('Method is not a number')
  if (!(method <= Number.MAX_SAFE_INTEGER))
    throw new Error('Method must be smaller than Number.MAX_SAFE_INTEGER')
}

module.exports = Message

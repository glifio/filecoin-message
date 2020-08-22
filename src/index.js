const { BigNumber } = require('@openworklabs/filecoin-number')
const { validateAddressString } = require('@openworklabs/filecoin-address')

let typeCheck

class Message {
  constructor({
    to,
    from,
    nonce,
    value,
    gasPremium = new BigNumber(0),
    gasFeeCap = new BigNumber(0),
    gasLimit = 0,
    method,
    params
  }) {
    typeCheck({
      to,
      from,
      nonce,
      value,
      gasPremium,
      gasFeeCap,
      gasLimit,
      method,
      params
    })
    this.to = to
    this.from = from
    this.nonce = nonce
    this.value = new BigNumber(value)
    this.gasPremium = new BigNumber(gasPremium)
    this.gasFeeCap = new BigNumber(gasFeeCap)
    this.gasLimit = gasLimit
    this.method = method
    this.params = params

    if (to[0] !== from[0])
      throw new Error('Addresses have different network prefixes')
    this.networkPrefix = from[0]
  }

  toLotusType = () => {
    if (typeof this.nonce !== 'number')
      throw new Error('Cannot encode message without a nonce')
    const message = {
      To: this.to,
      From: this.from,
      Nonce: this.nonce,
      Value: this.value,
      GasPremium: this.gasPremium,
      GasFeeCap: this.gasFeeCap,
      GasLimit: this.gasLimit,
      Method: this.method,
      Params: this.params
    }
    return message
  }

  toSerializeableType = () => {
    const message = {
      to: this.to,
      from: this.from,
      nonce: this.nonce,
      value: this.value.toString(),
      gaspremium: this.gasPremium.toString(),
      gaslimit: this.gasLimit,
      gasfeecap: this.gasFeeCap,
      method: this.method,
      params: this.params
    }

    return message
  }
}

typeCheck = ({ to, from, nonce, value, method, gasPremium, gasLimit }) => {
  if (!to) throw new Error('No to address provided')
  if (!from) throw new Error('No from address provided')

  if (!validateAddressString(to)) throw new Error('Invalid to address provided')
  if (!validateAddressString(from))
    throw new Error('Invalid from address provided')

  if (!nonce && nonce !== 0) throw new Error('No nonce provided')
  if (typeof nonce !== 'number') throw new Error('Nonce is not a number')
  if (!(nonce <= Number.MAX_SAFE_INTEGER))
    throw new Error('Nonce must be smaller than Number.MAX_SAFE_INTEGER')

  if (!value) throw new Error('No value provided')

  if (typeof gasLimit !== 'number') throw new Error('Gas limit is not a number')
  if (!(gasLimit <= Number.MAX_SAFE_INTEGER))
    throw new Error('Gas limit must be smaller than Number.MAX_SAFE_INTEGER')

  if (!method && method !== 0) throw new Error('No method provided')
  if (typeof method !== 'number') throw new Error('Method is not a number')
  if (!(method <= Number.MAX_SAFE_INTEGER))
    throw new Error('Method must be smaller than Number.MAX_SAFE_INTEGER')
}

module.exports = Message

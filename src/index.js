const borc = require('borc')
const { newFromString, encode } = require('@openworklabs/filecoin-address')
const BigNumber = require('bignumber.js')
const { marshalBigInt } = require('./utils')

let typeCheck

class Message {
  constructor({ to, from, nonce, value, gasPrice, gasLimit, method, params }) {
    typeCheck({ to, from, nonce, value, gasPrice, gasLimit, method, params })
    this.to = newFromString(to)
    this.from = newFromString(from)
    this.nonce = nonce
    this.value = value
    this.gasPrice = gasPrice
    this.gasLimit = gasLimit
    this.method = method
    this.params = params

    if (to[0] !== from[0])
      throw new Error('Addresses have different network prefixes')
    this.networkPrefix = from[0]
  }

  serialize = () =>
    new Promise(resolve => {
      const answer = []
      answer.push(this.to.str)
      answer.push(this.from.str)
      answer.push(this.nonce)
      answer.push(marshalBigInt(this.value))
      answer.push(marshalBigInt(this.gasPrice))
      answer.push(this.gasLimit)
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
}

typeCheck = ({ to, from, nonce, value, method, gasPrice, gasLimit }) => {
  if (typeof nonce !== 'number') throw new Error('Nonce is not a number')

  if (!to) throw new Error('No to address provided')
  if (!from) throw new Error('No from address provided')

  if (!nonce) throw new Error('No nonce provided')
  if (typeof nonce !== 'number') throw new Error('Nonce is not a number')
  if (nonce > Number.MAX_SAFE_INTEGER)
    throw new Error('Nonce must be smaller than Number.MAX_SAFE_INTEGER')

  if (!value) throw new Error('No value provided')
  if (!BigNumber.isBigNumber(value)) throw new Error('Value is not a BigNumber')

  if (!gasPrice) throw new Error('No gas price provided')
  if (!BigNumber.isBigNumber(gasPrice))
    throw new Error('Gas price is not a BigNumber')

  if (!gasLimit) throw new Error('No gas limit provided')
  if (typeof gasLimit !== 'number') throw new Error('Gas Limit is not a number')
  if (gasLimit > Number.MAX_SAFE_INTEGER)
    throw new Error('GasLimit must be smaller than Number.MAX_SAFE_INTEGER')

  if (!method) throw new Error('No "method" provider')
  if (typeof method !== 'number') throw new Error('Method is not a number')
  if (method > Number.MAX_SAFE_INTEGER)
    throw new Error('Method must be smaller than Number.MAX_SAFE_INTEGER')
}

module.exports = Message

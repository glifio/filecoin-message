const LotusRpcEngine = require('@openworklabs/lotus-jsonrpc-engine').default
const borc = require('borc')
const { decodeAddress, marshalBigInt } = require('./utils')

class Message {
  constructor({ To, From, Nonce, Value, Method, GasPrice, GasLimit, Params }) {
    this.jsonRpcEngine = new LotusRpcEngine({
      apiAddress: 'https://lotus-dev.temporal.cloud/rpc/v0'
    })

    this.Nonce = Nonce

    // TODO: better validation
    if (!To) throw new Error('Invalid "to" address')
    this.To = To

    if (!From) throw new Error('Invalid "from" address')
    this.From = From

    if (!Value) throw new Error('No value provided')
    this.Value = Value

    if (typeof Method !== 'number') throw new Error('Invalid "method" passed')
    this.Method = Method

    if (!GasPrice) throw new Error('No gas price provided')
    this.GasPrice = GasPrice

    if (!GasLimit) throw new Error('No gas limit provided')
    this.GasLimit = GasLimit

    this.Params = Params
  }

  generateNonce = async () => {
    this.Nonce = await this.jsonRpcEngine.request('MpoolGetNonce', this.From)
    return true
  }

  toObj = () => {
    if (typeof this.nonce !== 'number')
      throw new Error('Cannot encode message without a nonce')
    const message = {
      To: this.To,
      From: this.From,
      Nonce: this.Nonce,
      Value: this.Value,
      Method: this.Method,
      GasPrice: '3',
      GasLimit: '1000',
      Params: []
    }
    return message
  }

  serialize = () =>
    new Promise(resolve => {
      const answer = []
      answer.push(decodeAddress(this.To))
      answer.push(decodeAddress(this.From))
      answer.push(this.Nonce)
      answer.push(marshalBigInt(this.Value))
      answer.push(marshalBigInt(this.GasPrice))
      answer.push(marshalBigInt(this.GasLimit))
      answer.push(this.Method)

      if (this.Params) {
        answer.push(this.Params)
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

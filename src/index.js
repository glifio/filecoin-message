const LotusRpcEngine = require('@openworklabs/lotus-jsonrpc-engine')
const borc = require('borc')
const base32Func = require('./base32')

const base32 = base32Func('abcdefghijklmnopqrstuvwxyz234567')

const bigintToArray = v => {
  let tmp = BigInt(v).toString(16)
  // not sure why it is not padding and buffer does not like it
  if (tmp.length % 2 === 1) tmp = `0${tmp}`
  return Buffer.from(tmp, 'hex')
}

const decodeAddress = address => {
  const network = address.slice(0, 1)
  const protocol = address.slice(1, 2)
  const raw = address.substring(2, address.length)
  const payloadChecksum = new Buffer.from(base32.decode(raw))
  const { length } = payloadChecksum
  const payload = payloadChecksum.slice(0, length - 4)
  const checksum = payloadChecksum.slice(length - 4, length)
  const protocolByte = new Buffer.alloc(1)
  protocolByte[0] = protocol
  return Buffer.concat([protocolByte, payload])
}

const marshalBigInt = val => {
  const bigIntOnset = new Buffer.alloc(1)
  bigIntOnset[0] = 0
  const buf = bigintToArray(val)
  return Buffer.concat([bigIntOnset, Uint8Array.from(buf)])
}

class Message {
  constructor({ To, From, Nonce, Value, Method, GasPrice, GasLimit }) {
    this.jsonRpcEngine = new LotusRpcEngine({
      apiAddress: 'https://lotus-dev.temporal.cloud/rpc/v0',
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
  }

  generateNonce = async () => {
    this.Nonce = await this.jsonRpcEngine.request('MpoolGetNonce', this.From)
    return true
  }

  encode = () => {
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
      Params: [],
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
        emptyParamsHeader,
      ])
      // Change the first byte since cbor is encoded w/o params
      cborWithEmptyParams[0] = 136

      return resolve(cborWithEmptyParams)
    })
}

module.exports = Message

const borc = require('borc')
const base32 = require('./base32.js')('abcdefghijklmnopqrstuvwxyz234567')

function bigintToArray(v) {
  tmp = BigInt(v).toString(16)
  // not sure why it is not padding and buffer does not like it
  if (tmp.length % 2 === 1) tmp = '0' + tmp
  return Buffer.from(tmp, 'hex')
}

function decode(address) {
  const network = address.slice(0, 1)
  const protocol = address.slice(1, 2)
  const raw = address.substring(2, address.length)
  const payloadChecksum = new Buffer.from(base32.decode(raw))
  const length = payloadChecksum.length
  const payload = payloadChecksum.slice(0, length - 4)
  const checksum = payloadChecksum.slice(length - 4, length)
  const protocolByte = new Buffer.alloc(1)
  protocolByte[0] = protocol
  return Buffer.concat([protocolByte, payload])
}

function debug(answer) {
  const bytes = Uint8Array.from(borc.encode(answer))
  var debugBytes = ''
  for (var i = 0; i < bytes.byteLength; i++) {
    debugBytes = debugBytes.concat(bytes[i].toString())
    debugBytes = debugBytes.concat(' ')
  }
  return debugBytes
}

function debugWithoutEncoding(answer) {
  const bytes = Uint8Array.from(answer)
  var debugBytes = ''
  for (var i = 0; i < bytes.byteLength; i++) {
    debugBytes = debugBytes.concat(bytes[i].toString())
    debugBytes = debugBytes.concat(' ')
  }
  return debugBytes
}

function marshalBigInit(val) {
  const bigInitOnset = new Buffer.alloc(1)
  bigInitOnset[0] = 0
  const buf = bigintToArray(val)
  return Buffer.concat([bigInitOnset, Uint8Array.from(buf)])
}

function toCBOR(message) {
  let answer = []
  answer.push(decode(message.to))
  answer.push(decode(message.from))
  answer.push(message.nonce)
  answer.push(marshalBigInit(message.value))
  answer.push(marshalBigInit(message.gasprice))
  answer.push(marshalBigInit(message.gaslimit))
  answer.push(message.method)

  if (message.params) {
    answer.push(message.params)
    return borc.encode(answer)
  }

  const emptyParamsHeader = new Buffer.alloc(1)
  emptyParamsHeader[0] = 64
  const cborWithEmptyParams = Buffer.concat([
    borc.encode(answer),
    emptyParamsHeader
  ])
  // Change the first byte since cbor is encoded w/o params
  cborWithEmptyParams[0] = 136

  return cborWithEmptyParams
}

const test = toCBOR({
  description: 'Basic test case',
  to:
    't3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq',
  from:
    't3f6bifs7c7fuw6mkeycvez3kw3pmwpxbis6agv4563ctdvsqw4gfwq25a3qqiz7womw6xbir5uabgwykazd5a',
  nonce: 197,
  params: Uint8Array.from(
    Buffer.from('some bytes, idk. probably at least ten of them')
  ),
  value: '100000',
  gasprice: '1',
  gaslimit: '1',
  method: 0,
  encoded_tx: '',
  valid: true
})

console.log('test', debugWithoutEncoding(test))

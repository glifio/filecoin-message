const varint = require('varint')
const { blake2b } = require('blakejs')
const base32Function = require('./base32')

const base32 = base32Function('abcdefghijklmnopqrstuvwxyz234567')

const bigintToArray = v => {
  let tmp = BigInt(v).toString(16)
  // not sure why it is not padding and buffer does not like it
  if (tmp.length % 2 === 1) tmp = `0${tmp}`
  return Buffer.from(tmp, 'hex')
}

const getChecksum = ingest => {
  return blake2b(ingest, null, 4)
}

const validateChecksum = (ingest, expect) => {
  const digest = getChecksum(ingest)
  return Buffer.compare(Buffer.from(digest), expect)
}

const decodeAddress = address => {
  // TODO: add string checks as seen in Lotus
  const protocol = address.slice(1, 2)
  const protocolByte = new Buffer.alloc(1)
  protocolByte[0] = protocol
  const raw = address.substring(2, address.length)

  if (protocol === '0') {
    return Buffer.concat([
      protocolByte,
      Buffer.from(varint.encode(parseInt(raw)))
    ])
  }

  const payloadChecksum = new Buffer.from(base32.decode(raw))
  const { length } = payloadChecksum
  const payload = payloadChecksum.slice(0, length - 4)
  const checksum = payloadChecksum.slice(length - 4, length)
  if (validateChecksum(Buffer.concat([protocolByte, payload]), checksum)) {
    throw Error("Checksums don't match")
  }

  return Buffer.concat([protocolByte, payload])
}

const marshalBigInt = val => {
  const bigIntOnset = new Buffer.alloc(1)
  bigIntOnset[0] = 0
  return Buffer.concat([bigIntOnset, bigintToArray(val)])
}

module.exports = {
  bigintToArray,
  decodeAddress,
  marshalBigInt
}

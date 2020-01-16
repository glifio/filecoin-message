/* eslint-env mocha */
const { expect } = require('chai')
const {
  messageWithParams,
  messageWithParamsHexValue,
  messageWithoutParams,
  messageWithoutParamsHexValue,
  messageWithSecp256k1Addresses,
  messageWithSecp256k1AddressesHexValue
} = require('./constants')

describe('message', async () => {
  describe('serialize', async () => {
    it('should serialize message with params', async () => {
      const serialized = await messageWithParams.serialize()
      expect(serialized.toString('hex')).to.be.eql(messageWithParamsHexValue)
    })

    it('should serialize message without params', async () => {
      const serialized = await messageWithoutParams.serialize()
      expect(serialized.toString('hex')).to.be.eql(messageWithoutParamsHexValue)
    })

    it('should serialize message with secp256k1Addresses', async () => {
      const serialized = await messageWithSecp256k1Addresses.serialize()
      expect(serialized.toString('hex')).to.be.eql(
        messageWithSecp256k1AddressesHexValue
      )
    })
  })
})

/* eslint-env mocha */
const { expect } = require('chai')
const Message = require('../')
const {
  messageWithParams,
  messageWithParamsHexValue,
  messageWithoutParams,
  messageWithoutParamsHexValue,
  messageWithSecp256k1Addresses,
  messageWithSecp256k1AddressesHexValue,
  messageWithIDAddresses,
  messageWithIDAddressesHexValue,
  messageWithActorAddresses,
  messageWithActorHexValue
} = require('./constants')

// TODO: add tests for valid and invalid message construction

describe('message', () => {
  describe('serialize', () => {
    it('should serialize message with params', async () => {
      const serialized = await messageWithParams.serialize()
      expect(serialized.toString('hex')).to.be.eql(messageWithParamsHexValue)
    })

    it('should serialize message without params', async () => {
      const serialized = await messageWithoutParams.serialize()
      expect(serialized.toString('hex')).to.be.eql(messageWithoutParamsHexValue)
    })

    it('should serialize message with secp256k1 addresses', async () => {
      const serialized = await messageWithSecp256k1Addresses.serialize()
      expect(serialized.toString('hex')).to.be.eql(
        messageWithSecp256k1AddressesHexValue
      )
    })

    it('should serialize message with ID addresses', async () => {
      const serialized = await messageWithIDAddresses.serialize()
      expect(serialized.toString('hex')).to.be.eql(
        messageWithIDAddressesHexValue
      )
    })

    it('should serialize message with Actor addresses', async () => {
      const serialized = await messageWithActorAddresses.serialize()
      expect(serialized.toString('hex')).to.be.eql(messageWithActorHexValue)
    })
  })

  describe('constructor', () => {
    it('should throw an error when addresses with different networks are passed', () => {
      expect(
        () =>
          new Message({
            to:
              'f3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq',
            from:
              't3f6bifs7c7fuw6mkeycvez3kw3pmwpxbis6agv4563ctdvsqw4gfwq25a3qqiz7womw6xbir5uabgwykazd5a',
            nonce: 197,
            value: '100000',
            gasPrice: '1',
            gasLimit: '1',
            method: 0
          })
      ).to.throw()
    })
  })
})

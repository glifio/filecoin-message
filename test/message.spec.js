/* eslint-env mocha */
const { expect } = require('chai')
const Message = require('../')
const {
  messageObj,
  messageWithParams,
  messageWithParamsHexValue,
  messageWithoutParams,
  messageWithoutParamsHexValue,
  messageWithSecp256k1Addresses,
  messageWithSecp256k1AddressesHexValue,
  messageWithIDAddresses,
  messageWithIDAddressesHexValue,
  messageWithActorAddresses,
  messageWithActorHexValue,
  messageWithMethodZero,
  messageWithMethodZeroHexValue,
  messageWithNonceZero,
  messageWithNonceZeroHexValue
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

    it('should serialize message with nonce of 0', async () => {
      const serialized = await messageWithNonceZero.serialize()
      expect(serialized.toString('hex')).to.be.eql(messageWithNonceZeroHexValue)
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

    it('should serialize message with method 0', async () => {
      const serialized = await messageWithMethodZero.serialize()
      expect(serialized.toString('hex')).to.be.eql(
        messageWithMethodZeroHexValue
      )
    })
  })

  describe('constructor', () => {
    it('should throw an error when addresses with different networks are passed', () => {
      expect(
        () =>
          new Message({
            ...messageObj,
            to:
              'f3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).to.throw()
    })

    it('should throw an error when an invalid to address', () => {
      expect(
        () =>
          new Message({
            ...messageObj,
            to:
              't0kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).to.throw()
    })

    it('should throw an error when an invalid from address', () => {
      expect(
        () =>
          new Message({
            ...messageObj,
            from:
              't0kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).to.throw()
    })

    it('should throw an error when nonce is not a number', () => {
      expect(() => new Message({ ...messageObj, nonce: '1' })).to.throw()
    })

    it('should throw an error when nonce is too big', () => {
      expect(
        () => new Message({ ...messageObj, nonce: 18446744073709551616 })
      ).to.throw()
    })

    it('should throw an error when value is not a BigNumber', () => {
      expect(() => new Message({ ...messageObj, value: '1' })).to.throw()
    })

    it('should throw an error when gasPrice is not a BigNumber', () => {
      expect(() => new Message({ ...messageObj, gasPrice: '1' })).to.throw()
    })

    it('should throw an error when gasLimit is too big', () => {
      expect(
        () => new Message({ ...messageObj, method: 18446744073709551616 })
      ).to.throw()
    })

    it('should throw an error when method is not a number', () => {
      expect(() => new Message({ ...messageObj, method: '1' })).to.throw()
    })

    it('should throw an error when gasLimit is not a number', () => {
      expect(() => new Message({ ...messageObj, gasLimit: '1' })).to.throw()
    })

    it('should throw an error when gasLimit is too big', () => {
      expect(
        () => new Message({ ...messageObj, gasLimit: 18446744073709551616 })
      ).to.throw()
    })
  })
})

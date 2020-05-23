/**
 * @jest-environment node
 */
/* eslint-env mocha */
const { expect } = require('chai')
const Message = require('../')
const { messageObj, messageWithParams } = require('./constants')

// TODO: add tests for valid and invalid message construction
describe('message', () => {
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

    it('should throw an error when no value is passed', () => {
      const msg = { ...messageObj }
      delete msg.value
      expect(() => new Message(msg)).to.throw()
    })

    it('should throw an error no gasPrice is passed', () => {
      const msg = { ...messageObj }
      delete msg.gasPrice
      expect(() => new Message(msg)).to.throw()
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

  describe('toString', () => {
    it('should stringify the message in lowercase vals', () => {
      const message = new Message(messageObj)
      expect(message.toString()).to.deep.equal({
        to: 't03832874859695014541',
        from: 't1pyfq7dg6sq65acyomqvzvbgwni4zllglqffw5dy',
        nonce: 10,
        value: '11416382733294334924',
        gasprice: '52109833521870826202',
        gaslimit: 100,
        method: 102
      })

      // make sure params exist
      expect(!!messageWithParams.toString().params).to.equal(true)
    })
  })
})

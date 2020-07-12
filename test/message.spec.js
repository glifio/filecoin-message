const Message = require('..')
const { messageObj, messageWithParams } = require('./constants')

// TODO: add tests for valid and invalid message construction
describe('message', () => {
  describe('constructor', () => {
    test('should throw an error when addresses with different networks are passed', () => {
      expect(
        () =>
          new Message({
            ...messageObj,
            to:
              'f3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).toThrow()
    })

    test('should throw an error when an invalid to address', () => {
      expect(
        () =>
          new Message({
            ...messageObj,
            to:
              't0kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).toThrow()
    })

    test('should throw an error when an invalid from address', () => {
      expect(
        () =>
          new Message({
            ...messageObj,
            from:
              't0kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).toThrow()
    })

    test('should throw an error when nonce is not a number', () => {
      expect(() => new Message({ ...messageObj, nonce: '1' })).toThrow()
    })

    test('should throw an error when nonce is too big', () => {
      expect(
        () => new Message({ ...messageObj, nonce: 18446744073709551616 })
      ).toThrow()
    })

    test('should throw an error when no value is passed', () => {
      const msg = { ...messageObj }
      delete msg.value
      expect(() => new Message(msg)).toThrow()
    })

    test('should throw an error no gasPrice is passed', () => {
      const msg = { ...messageObj }
      delete msg.gasPrice
      expect(() => new Message(msg)).toThrow()
    })

    test('should throw an error when gasLimit is too big', () => {
      expect(
        () => new Message({ ...messageObj, method: 18446744073709551616 })
      ).toThrow()
    })

    test('should throw an error when method is not a number', () => {
      expect(() => new Message({ ...messageObj, method: '1' })).toThrow()
    })

    test('should throw an error when gasLimit is not a number', () => {
      expect(() => new Message({ ...messageObj, gasLimit: '1' })).toThrow()
    })

    test('should throw an error when gasLimit is too big', () => {
      expect(
        () => new Message({ ...messageObj, gasLimit: 18446744073709551616 })
      ).toThrow()
    })
  })

  describe('toString', () => {
    test('should stringify the message in lowercase vals', () => {
      const message = new Message(messageObj)
      expect(message.toString().to).toBe('t03832874859695014541')
      expect(message.toString().from).toBe(
        't1pyfq7dg6sq65acyomqvzvbgwni4zllglqffw5dy'
      )
      expect(message.toString().nonce).toBe(10)
      expect(message.toString().value).toBe('11416382733294334924')
      expect(message.toString().gasprice).toBe('52109833521870826202')
      expect(message.toString().gaslimit).toBe(100)
      expect(message.toString().method).toBe(102)
      expect(message.toString().params).toBeFalsy()
    })
  })
})

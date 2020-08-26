const { Message } = require('../src').default
const { BigNumber } = require('@openworklabs/filecoin-number')

const baseMessage = {
  to: 't03832874859695014541',
  from: 't1pyfq7dg6sq65acyomqvzvbgwni4zllglqffw5dy',
  nonce: 10,
  value: new BigNumber('11416382733294334924'),
  method: 0
}

const customizedGasMessage = {
  ...baseMessage,
  gasFeeCap: '1',
  gasPremium: '1',
  gasLimit: 123
}

// TODO: add tests for valid and invalid message construction
describe('message', () => {
  describe('constructor', () => {
    test('should throw an error when addresses with different networks are passed', () => {
      expect(
        () =>
          new Message({
            ...baseMessage,
            to:
              'f3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).toThrow()
    })

    test('should throw an error when an invalid to address is passed', () => {
      expect(
        () =>
          new Message({
            ...baseMessage,
            to:
              't0kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).toThrow()
    })

    test('should throw an error when an invalid from address is passed', () => {
      expect(
        () =>
          new Message({
            ...baseMessage,
            from:
              't0kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq'
          })
      ).toThrow()
    })

    test('should throw an error when nonce is not a number', () => {
      expect(() => new Message({ ...baseMessage, nonce: '1' })).toThrow()
    })

    test('should throw an error when nonce is too big', () => {
      expect(
        () => new Message({ ...baseMessage, nonce: 18446744073709551616 })
      ).toThrow()
    })

    test('should throw an error when no value is passed', () => {
      const msg = { ...baseMessage }
      delete msg.value
      expect(() => new Message(msg)).toThrow()
    })

    test('should throw an error when method is too big', () => {
      expect(
        () => new Message({ ...baseMessage, method: 18446744073709551616 })
      ).toThrow()
    })

    test('should throw an error when method is not a number', () => {
      expect(() => new Message({ ...baseMessage, method: '1' })).toThrow()
    })

    test('should throw an error when gasLimit is not a number', () => {
      expect(() => new Message({ ...baseMessage, gasLimit: '1' })).toThrow()
    })

    test('should throw an error when gasLimit is too big', () => {
      expect(
        () => new Message({ ...baseMessage, gasLimit: 18446744073709551616 })
      ).toThrow()
    })
  })

  describe('toSerializeableType', () => {
    test('should stringify the message in lowercase vals', () => {
      const message = new Message(customizedGasMessage)
      const serializeableMsg = message.toSerializeableType()
      expect(serializeableMsg.to).toBe(customizedGasMessage.to)
      expect(serializeableMsg.from).toBe(customizedGasMessage.from)
      expect(serializeableMsg.nonce).toBe(10)
      expect(serializeableMsg.value).toBe(customizedGasMessage.value.toString())
      expect(serializeableMsg.gaspremium).toBe(customizedGasMessage.gasPremium)
      expect(serializeableMsg.gaslimit).toBe(customizedGasMessage.gasLimit)
      expect(serializeableMsg.gasfeecap).toBe(customizedGasMessage.gasFeeCap)
      expect(serializeableMsg.method).toBe(customizedGasMessage.method)
      expect(serializeableMsg.params).toBeFalsy()
    })

    test('should add defaults to optional fields', () => {
      const message = new Message(baseMessage)
      const serializeableMsg = message.toSerializeableType()
      expect(serializeableMsg.to).toBe(baseMessage.to)
      expect(serializeableMsg.from).toBe(baseMessage.from)
      expect(serializeableMsg.nonce).toBe(10)
      expect(serializeableMsg.value).toBe(baseMessage.value.toString())
      expect(serializeableMsg.gaspremium).toBe('0')
      expect(serializeableMsg.gaslimit).toBe(0)
      expect(serializeableMsg.gasfeecap).toBe('0')
      expect(serializeableMsg.method).toBe(baseMessage.method)
      expect(serializeableMsg.params).toBeFalsy()
    })
  })
})

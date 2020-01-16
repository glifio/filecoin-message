/* eslint-env mocha */
const { expect } = require('chai')
const {
  messageWithParams,
  messageWithParamsHexValue,
  messageWithoutParams,
  messageWithoutParamsHexValue
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
  })
})

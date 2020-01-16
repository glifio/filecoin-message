/* eslint-env mocha */
const { expect } = require('chai')
const Message = require('../dist/index')

const messageObj = {
  To:
    't3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq',
  From:
    't3f6bifs7c7fuw6mkeycvez3kw3pmwpxbis6agv4563ctdvsqw4gfwq25a3qqiz7womw6xbir5uabgwykazd5a',
  Nonce: 197,
  Value: '100000',
  GasPrice: '1',
  GasLimit: '1',
  Method: 0,
}

const messageWithParams = new Message({
  ...messageObj,
  Params: Uint8Array.from(
    Buffer.from('some bytes, idk. probably at least ten of them'),
  ),
})
const messageWithParamsHexValue =
  '8858310352fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c64981855ad8681d0d86d1e91e00167939cb5831032f8282cbe2f9696f3144c0aa4ced56dbd967dc2897806af3bed8a63aca16e18b686ba0dc208cfece65bd70a23da0026b18c544000186a042000142000100582e736f6d652062797465732c2069646b2e2070726f6261626c79206174206c656173742074656e206f66207468656d'

const messageWithoutParams = new Message(messageObj)
const messageWithoutParamsHexValue =
  '8858310352fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c64981855ad8681d0d86d1e91e00167939cb5831032f8282cbe2f9696f3144c0aa4ced56dbd967dc2897806af3bed8a63aca16e18b686ba0dc208cfece65bd70a23da0026b18c544000186a04200014200010040'

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

const Message = require('../')

const messageObj = {
  to:
    't3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq',
  from:
    't3f6bifs7c7fuw6mkeycvez3kw3pmwpxbis6agv4563ctdvsqw4gfwq25a3qqiz7womw6xbir5uabgwykazd5a',
  nonce: 197,
  value: '100000',
  gasPrice: '1',
  gasLimit: '1',
  method: 0
}

const messageWithParams = new Message({
  ...messageObj,
  params: Uint8Array.from(
    Buffer.from('some bytes, idk. probably at least ten of them')
  )
})

const messageWithParamsHexValue =
  '8858310352fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c64981855ad8681d0d86d1e91e00167939cb5831032f8282cbe2f9696f3144c0aa4ced56dbd967dc2897806af3bed8a63aca16e18b686ba0dc208cfece65bd70a23da0026b18c544000186a042000142000100582e736f6d652062797465732c2069646b2e2070726f6261626c79206174206c656173742074656e206f66207468656d'

const messageWithoutParams = new Message(messageObj)

const messageWithoutParamsHexValue =
  '8858310352fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c64981855ad8681d0d86d1e91e00167939cb5831032f8282cbe2f9696f3144c0aa4ced56dbd967dc2897806af3bed8a63aca16e18b686ba0dc208cfece65bd70a23da0026b18c544000186a04200014200010040'

const messageWithSecp256k1Addresses = new Message({
  ...messageObj,
  to: 't16mpxjyeo7qcmmmo67nj6yfklqxsxv3mdic7mxwa',
  from: 't1ifyzcut6tnoxdjo3njwojhhwdlefbwzcngo272y'
})

const messageWithSecp256k1AddressesHexValue =
  '885501f31f74e08efc04c631defb53ec154b85e57aed835501417191527e9b5d71a5db6a6ce49cf61ac850db2218c544000186a04200014200010040'

const messageWithIDAddresses = new Message({
  ...messageObj,
  to: 't05234623',
  from: 't0603911192'
})

const messageWithIDAddressesHexValue =
  '884500bfbfbf02460098e8fb9f0218c544000186a04200014200010040'

const messageWithActorAddresses = new Message({
  ...messageObj,
  to: 't26mpxjyeo7qcmmmo67nj6yfklqxsxv3md7zizhzy',
  from: 't2ifyzcut6tnoxdjo3njwojhhwdlefbwzchm6b46i'
})

const messageWithActorHexValue =
  '885502f31f74e08efc04c631defb53ec154b85e57aed835502417191527e9b5d71a5db6a6ce49cf61ac850db2218c544000186a04200014200010040'

module.exports = {
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
}

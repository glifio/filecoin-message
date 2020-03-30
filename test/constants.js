const BigNumber = require('bignumber.js')
const Message = require('../')

const messageObj = {
  to: 't03832874859695014541',
  from: 't1pyfq7dg6sq65acyomqvzvbgwni4zllglqffw5dy',
  nonce: 10,
  value: new BigNumber('11416382733294334924'),
  gasPrice: new BigNumber('52109833521870826202'),
  gasLimit: 100,
  method: 102
}

const messageWithParams = new Message({
  ...messageObj,
  params: new Buffer.from('LvA/+JCxFtFmwcUKCHkWertTbleiNRccmRO2YU4c3/Q=')
})

const messageWithParamsHexValue =
  '884a00808496858aecc6983555017e0b0f8cde943dd00b0e642b9a84d66a3995accb0a49009e6f239bfde973cc4a0002d32b517f97da6ada18641866582c4c76412f2b4a43784674466d7763554b43486b5765727454626c65694e5263636d524f3259553463332f513d'

const messageWithoutParams = new Message(messageObj)

const messageWithoutParamsHexValue =
  '884a00808496858aecc6983555017e0b0f8cde943dd00b0e642b9a84d66a3995accb0a49009e6f239bfde973cc4a0002d32b517f97da6ada1864186640'

const messageWithSecp256k1Addresses = new Message({
  ...messageObj,
  to: 't16mpxjyeo7qcmmmo67nj6yfklqxsxv3mdic7mxwa',
  from: 't1ifyzcut6tnoxdjo3njwojhhwdlefbwzcngo272y'
})

const messageWithSecp256k1AddressesHexValue =
  '885501f31f74e08efc04c631defb53ec154b85e57aed835501417191527e9b5d71a5db6a6ce49cf61ac850db220a49009e6f239bfde973cc4a0002d32b517f97da6ada1864186640'

const messageWithIDAddresses = new Message({
  ...messageObj,
  to: 't05234623',
  from: 't0603911192'
})

const messageWithIDAddressesHexValue =
  '884500bfbfbf02460098e8fb9f020a49009e6f239bfde973cc4a0002d32b517f97da6ada1864186640'

const messageWithActorAddresses = new Message({
  ...messageObj,
  to: 't26mpxjyeo7qcmmmo67nj6yfklqxsxv3md7zizhzy',
  from: 't2ifyzcut6tnoxdjo3njwojhhwdlefbwzchm6b46i'
})

const messageWithActorHexValue =
  '885502f31f74e08efc04c631defb53ec154b85e57aed835502417191527e9b5d71a5db6a6ce49cf61ac850db220a49009e6f239bfde973cc4a0002d32b517f97da6ada1864186640'

module.exports = {
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
  messageWithActorHexValue
}

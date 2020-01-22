[![Travis CI](https://travis-ci.org/openworklabs/filecoin-message.svg?branch=primary)](https://travis-ci.org/openworklabs/filecoin-message)

# filecoin-message

## Usage

```js
const Message = require('@openworklabs/filecoin-message')

// all fields are required
const message = new Message({
  from: 't1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei',
  to: 't1t5gdjfb6jojpivbl5uek6vf6svlct7dph5q2jwa',
  value: '1000'
  method: 0,
  gasPrice: '1',
  gasLimit: '1000',
  nonce: 0
})

console.log(message.toObj())
/*
  {
    "To":"t1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei",
    "From":"t1t5gdjfb6jojpivbl5uek6vf6svlct7dph5q2jwa",
    "Nonce":0,
    "Value":"1000",
    "GasPrice":"3",
    "GasLimit":"1000",
    "Method":0,
    "Params":""
  }
*/

// serializes the message into its CBOR bytes
const serializedMsg = await message.serialize()
```

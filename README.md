# filecoin-message

[![Travis CI](https://travis-ci.org/openworklabs/filecoin-message.svg?branch=primary)](https://travis-ci.org/openworklabs/filecoin-message)

## Install

`npm i @openworklabs/filecoin-message`

## Usage

```js
const Message = require('@openworklabs/filecoin-message')

const message = new Message({
  from: 't1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei',
  to: 't1t5gdjfb6jojpivbl5uek6vf6svlct7dph5q2jwa',
  value: '1000'
  method: 0,
  gasPrice: '1',
  gasLimit: '1000',
  nonce: 0
})

const serialized = await message.serialize()

const encoded = message.encode()
```

## Test

`npm i`<br/>
`npm run test`

## License

This repository is dual-licensed under Apache 2.0 and MIT terms.

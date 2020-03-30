# filecoin-message

[![Travis CI](https://travis-ci.org/openworklabs/filecoin-message.svg?branch=primary)](https://travis-ci.org/openworklabs/filecoin-message)

## Install

`npm i @openworklabs/filecoin-message`

## Usage

```js
const Message = require('@openworklabs/filecoin-message')

const message = new Message({
  to: 't03832874859695014541',
  from: 't1pyfq7dg6sq65acyomqvzvbgwni4zllglqffw5dy',
  nonce: 1,
  value: new BigNumber('11416382733294334924'),
  gasPrice: new BigNumber('52109833521870826202'),
  gasLimit: 1000,
  method: 1002
})

const serialized = await message.serialize()

const encoded = message.encode()
```

## Test

`npm i`<br/>
`npm run test`

## License

This repository is dual-licensed under Apache 2.0 and MIT terms.

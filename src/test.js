import Message from './index'

const message = new Message({
  To:
    't3kl67ybzbqjsu6fr7l4hzuyq5okkwnr2ncabxytl3xmcapupcyzeydbk23bub2dmg2hur4aawpe44w3wptsvq',
  From:
    't3f6bifs7c7fuw6mkeycvez3kw3pmwpxbis6agv4563ctdvsqw4gfwq25a3qqiz7womw6xbir5uabgwykazd5a',
  Params: Uint8Array.from(
    Buffer.from('some bytes, idk. probably at least ten of them'),
  ),
  Nonce: 197,
  Value: '100000',
  GasPrice: '1',
  GasLimit: '1',
  Method: 0,
})

console.log('message', message)

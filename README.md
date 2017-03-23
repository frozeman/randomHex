randomHex
===

Will create a random bytes HEX string, in node.js and browsers with crypto.


```js
var randomHex = require('randomhex');

randomHex(16); // get 16 random bytes as HEX string (0x + 32 chars)
> "0xd59e72dbf8612798aa1674834c80894e"

randomHex(32, console.log); // get 32 random bytes as HEX string (0x + 64 chars)
> null "0x409de75fc727d81a7d9f59580130ce3e76124679eb5c4647eb18c40512450c29"

```

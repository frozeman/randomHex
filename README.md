randomHex
===

Will create a random bytes HEX string, in node.js and browsers with crypto.


```js
var randomHex = require('randomhex');
randomHex(16);// get 16 random bytes as HEX string (32 chars)
randomHex(16, function (err, hex) {
  // hex is 16 random bytes hex string
});
```

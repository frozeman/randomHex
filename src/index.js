function browser(size, cb) {
  // limit of Crypto.getRandomValues()
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  var MAX_BYTES = 65536;

  // Node supports requesting up to this number of bytes
  // https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
  var MAX_UINT32 = 4294967295;

  // phantomjs needs to throw
  if (typeof size !== 'number' || size > MAX_UINT32) {
    throw new RangeError('requested too many random bytes');
  }

  var bytes = new Uint8Array(size);

  // this is the max bytes crypto.getRandomValues
  if (size > MAX_BYTES) {
    // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
    for (var generated = 0; generated < size; generated += MAX_BYTES) {
      window.crypto.getRandomValues(bytes.subarray(generated, generated + MAX_BYTES));
    }
  } else {
    window.crypto.getRandomValues(bytes);
  }

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes);
    });
  }

  return bytes;
}

function randomBytes(n, cb) {
  var isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return require('crypto').randomBytes(n, cb);
  } else if (window && window.crypto && window.crypto.getRandomValues) {
    return browser(n, cb);
  } else {
    return new Error('Secure random number generation is not supported by this browser.\nUse Chrome or Firefox');
  }
}

function bytesToHex(bytes, prefix) {
  var hex = [];
  for (var i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  if (prefix) {
    return '0x' + hex.join('');
  }
  return hex.join('');
}

function randomHex(size, prefix, callback) {
  var isCallback = (typeof callback === 'function');

  if (size > 4294967295) {
    if (isCallback) {
      callback(new RangeError('Requested too many random bytes.'));
      return;
    } else {
      throw new RangeError('Requested too many random bytes.');
    }
  }

  if (isCallback) {
    randomBytes(size, function(err, resp) {
      if (!err) {
        callback(null, bytesToHex(resp, prefix));
        return;
      } else {
        callback(err);
        return;
      }
    });
  } else {
    return bytesToHex(randomBytes(size), prefix);
  }
}

module.exports = randomHex;

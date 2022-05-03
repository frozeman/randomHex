const assert = require('assert').strict;
const randomHex = require('./src');

describe('randomHex', function() {
  it('should generate random bytes with a specific length in sync manner', function() {
    assert.equal(randomHex(0, true).length, 2 + 0);
    assert.equal(randomHex(3, true).length, 2 + 6);
    assert.equal(randomHex(30, true).length, 2 + 60);
    assert.equal(randomHex(300, true).length, 2 + 600);
    assert.equal(randomHex(65537, true).length, 2 + 131074);
    assert.ok(/^0x[a-f0-9]+$/.test(randomHex(300, true)));
  });
  it('should generate random bytes with a specific length (0) with callback func', function(done) {
    randomHex(0, true, function (err, resp) {
      if (err) throw err;
      assert.equal(resp.length, 2 + 0);
      done();
    });
  });
  it('should generate random bytes with a specific length (6) with callback func', function(done) {
    randomHex(3, true, function (err, resp) {
      if (err) throw err;
      assert.equal(resp.length, 2 + 6);
      done();
    });
  });
  it('should generate random bytes with a specific length (60) with callback func', function(done) {
    randomHex(30, true, (err, resp) => {
      if (err) throw err;
      assert.equal(resp.length, 2 + 60);
      assert.ok(/^0x[a-f0-9]+$/.test(resp));
      done();
    });
  });
  it('should generate random bytes with a specific length (300) with callback func', function(done) {
    randomHex(300, true, (err, resp) => {
      if (err) throw err;
      assert.equal(resp.length, 2 + 600);
      done();
    });
  });
  it('should generate random bytes with a specific length (65537) with callback func', function(done) {
    randomHex(65537, true, (err, resp) => {
      if (err) throw err;
      assert.equal(resp.length, 2 + 131074);
      done();
    });
  });
  it('requesting to much throws in sync manner', function() {
    assert.throws(randomHex.bind(null, 4294967296));
  });
  it('requesting to much throws in async manner', function(done) {
    randomHex(4294967296, true, (err) => {
      assert.ok(err instanceof Error);
      done();
    });
  });
});

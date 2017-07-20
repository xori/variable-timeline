const Timeline = require('../')
const assert = require('assert');

describe('Basic', function() {
  const t = new Timeline([
    [0, 1],
    [1, 2],
    [2, 3]
  ])

  describe('asOf', function() {
    it('handles the end of the timeline', function() {
      assert.equal(t.asOf(2), 3)
    })

    it('handles the begining of a timeline', function() {
      assert.equal(t.asOf(0), 1)
    })

    it('handles after the timeline', function() {
      assert.equal(t.asOf(3), 3)
      assert.equal(t.asOf( ), 3)
    })
  });

  it('after', function() {
    assert.equal(t.after(1).length, 1)
  });

  it('before', function() {
    assert.equal(t.before(1).length, 1)
  });

  it('whenWas', function() {
    assert.equal(t.whenWas(1).length, 1)
    assert.equal(t.whenWas(1)[0], 0)
  });

  describe('set', function() {
    it('remains sorted after insert')
    it('inserts at current time')
    it('replaces whatever is there')
  });

  it('remove');

});

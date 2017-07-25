const Timeline = require('../')
const SortedMap = require('../SortedMap')
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
    it('inserts at current time', function() {
      let _t = new Timeline()
      _t.set(true)
      assert(Date.now() - _t.map.keys()[0] < 500)
    })
    it('replaces whatever is there', function() {
      let _t = new Timeline()
      _t.set(true,  1)
      _t.set(false, 1)
      assert.equal(_t.asOf(1), false)
    })
  });

  it('remove', function() {
    let _t = new Timeline()
    _t.set(true,  1)
    assert.equal(_t.remove(true), 1)
    assert.equal(_t.asOf(1), undefined)
  })

  it('can build a set of unique points', function() {
    let one = new Timeline([
      [0, 1],
      [1, 2],
      [3, 4]
    ])
    let two = new Timeline([
      [0, -1],
      [1, -2],
      [2, -3]
    ])
    assert.equal(
      Timeline.uniquePoints(one, two).size,
      4, "set not set correctly"
    )
  })

  describe('SortedMap', function() {
    it('can insert data' , function() {
      let s = new SortedMap
      s.set(1, 2)
      assert(s.get(1) === 2)
    })

    it('is sorted', function() {
      let s = new SortedMap
      s.set(5, 1)
      s.set(1, 1)
      s.set(3, 1)
      s.set(2, 1)
      s.set(0, 1)
      s.set(1, 1)
      let keys = s.keys()
      for (var i = 1; i < keys.length; i++) {
        assert(keys[i-1] < keys[i])
      }
    })
  })

});

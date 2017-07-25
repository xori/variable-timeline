const privates = new WeakMap()

class SortedMap extends Map {
  constructor(comparitor) {
    super()
    this.comparitor = comparitor || ((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      else return 0
    })

    const self = {
      keys: []
    }
    self.lessThan = ((a, b) => this.comparitor(a, b) === -1)
    self.equalTo  = ((a, b) => this.comparitor(a, b) === 0)
    privates.set(this, self)
  }

  set(key, value) {
    super.set(key, value)

    const self = privates.get(this)
    const keys = self.keys

    // credit where credit is due (@Daniel-Hug)
    // https://stackoverflow.com/a/21822316
    var low  = 0,
        high = keys.length;

    while (low < high) {
      var mid = low + high >>> 1;
      if (self.equalTo(keys[mid], key)) return; // if equal, alreay exists
      if (self.lessThan(keys[mid], key)) low = mid + 1;
      else high = mid;
    }

    keys.splice(low, 0, key)
  }

  delete(key) {
    const self = privates.get(this)
    const needle = self.keys.indexOf(key)
    if(needle === -1) return false
    super.delete(key)
    self.keys.splice(needle, 1)
    return true
  }

  keys() {
    const self = privates.get(this)
    return self.keys
  }

  entries() {
    const self = privates.get(this)
    return self.keys.map(key => [key, this.get(key)])
  }
}

module.exports = SortedMap

const SortedMap = require('./SortedMap')

function cleanTime(time) {
  return (time == undefined) ? +Date.now()
    : time instanceof Date ? +time : time;
}

class Timeline {
  constructor(entries) {
    this.map = new SortedMap()
    if(entries && entries.length > 0)
      entries.forEach(e => {
        this.map.set(e[0], e[1])
      })
  }

  asOf(time) {
    const key = cleanTime(time)
    const index = this.map.keys().filter(k => k <= key).pop()
    if(index != undefined) {
      return this.map.get(index)
    }
    return undefined
  } // Obj

  after(time) {
    const key = cleanTime(time)
    return this.map.keys()
      .filter(e => e > key)
      .map(e => this.map.get(e))
  } // Obj[]

  before(time) {
    const key = cleanTime(time)
    return this.map.keys()
      .filter(e => e < key)
      .map(e => this.map.get(e))
  } // Obj[]

  whenWas(obj) {
    return this.map.entries()
      .filter(e => e[1] === obj)
      .map(e => e[0])
  } // time[]

  /**
   * Add an object to the timeline at the given place. By default, now.
   * @param {Object} obj the value to store. This can be anything, Objects,
   *   Numbers, Dates or even functions.
   * @param {Number} time (optional)
   *   The sorted key. Note that you can toss in a Date type and it will be
   *   converted to a Number. By default, `+(Date.now())`
   * @return {Timeline} this instance
   */
  set(obj, time) {
    const key = cleanTime(time)
    this.map.set(key, obj)
    return this;
  }
  add(obj, time) { return this.set(obj, time) }

  remove(objOrFun)  {
    if (typeof objOrFun == "function") {
      let marked = this.map.entries().filter(objOrFun)
      for (var i = marked.length - 1; i >= 0; i--) {
        this.map.delete(marked[i][0])
      }
      return marked.length
    } else {
      return this.remove(([_, value]) => value === objOrFun)
    }
  }

  static uniquePoints(/* 1 - * Timeline Instances */) {
    return new Set(
      Array.from(arguments)
        .map(t => t.map.keys())
        .reduce((p, c) => p.concat(c), [])
    )
  }
}

module.exports = Timeline

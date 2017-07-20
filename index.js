function cleanTime(time) {
  return (time == undefined) ? +Date.now()
    : time instanceof Date ? +time : time;
}


class Timeline {
  constructor(entries) {
    this.entries = entries || []
    this.entries.sort((a,b) => a[0] - b[0])
  }

  asOf(time) {
    const key = cleanTime(time)
    let index = this.entries.length - 1
    while(index >= 0 && this.entries[index--][0] > key);
    return index < -1 ? undefined : this.entries[index + 1][1]
  } // Obj

  after(time) {
    const key = cleanTime(time)
    return this.entries.filter(e => e[0] > key).map(e => e[1])
  } // Obj[]

  before(time) {
    const key = cleanTime(time)
    return this.entries.filter(e => e[0] < key).map(e => e[1])
  } // Obj[]

  whenWas(obj) {
    return this.entries.filter(e => e[1] === obj).map(e => e[0])
  } // time

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
    // TODO actually insert directly into this structure, rather than re-sorting
    const key = cleanTime(time)
    this.entries = this.entries.filter(e => e[0] !== key)
    this.entries.push([key, obj])
    this.entries.sort((a,b) => a[0] - b[0])
    return this;
  }
  add(obj, time) { return this.set(obj, time) }

  remove(objOrFun)  {
    if (typeof objOrFun == "function") {
      let marked = this.entries.filter(objOrFun)
      for (var i = marked.length - 1; i >= 0; i--) {
        this.entries.splice(this.entries.indexOf(marked[i]), 1)
      }
      return marked.length > 0
    } else {
      return this.delete(([_, value]) => value === objOrFun)
    }
  }
}

module.exports = Timeline

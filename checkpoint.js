var Immutable = require('immutable')
class Store {
  constructor () {
    this.data = Immutable.Map({})
    this.checkpoints = {}
  }
  set (key, value) {
    this.data = this.data.set(key, Immutable.fromJS(value))
  }
  getAll () {
    return this.data.toJS()
  }
  get (key) {
    let retValue = this.data.get(key)
    retValue = retValue && retValue.toJS ? retValue.toJS() : retValue
    return retValue
  }
  delete (key) {
    this.data = this.data.delete(key)
  }
  checkpoint () {
    const key = Math.random()
    this.checkpoints[key] = this.data
    return key
  }
  restore (id) {
    this.data = this.checkpoints[id]
  }
}

let foo = new Store()

foo.set('bar', 'hello world')
foo.set('baz', 'hello world')
foo.set('bazz', { a: true })
console.log(foo.get('bar'))
console.log(foo.get('baz'))
console.log(foo.get('bazz'))
foo.delete('bazz')
console.log(foo.get('bazz'))
let cp = foo.checkpoint()
foo.set('bar', 'goodbye world')
console.log(foo.get('bar'))

foo.restore(cp)
console.log(foo.getAll())

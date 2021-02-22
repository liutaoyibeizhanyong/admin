export default class BaseEntity {
  constructor (params) {
    if (typeof params !== 'object') return 'params type is error, must be an object'
    const keys = Object.keys(params)
    keys.map(key => {
      this[key] = params[key]
    })
  }
}

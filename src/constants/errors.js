// Error definition object
const ERROR_DEF_OBJ = {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
}

// EAM Error
export function EAMError(message) {
  let instance = new Error(message)
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  return instance
}
EAMError.prototype = Object.create(Error.prototype, ERROR_DEF_OBJ)
Object.setPrototypeOf(EAMError, Error)

// Message Error
export function MessageError(message) {
  let instance = new Error(message)
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  return instance
}
MessageError.prototype = Object.create(Error.prototype, ERROR_DEF_OBJ)
Object.setPrototypeOf(MessageError, Error)

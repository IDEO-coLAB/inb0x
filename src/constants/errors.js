// // Error definition object
// const ERROR_DEF_OBJ = {
//   constructor: {
//     value: Error,
//     enumerable: false,
//     writable: true,
//     configurable: true
//   }
// }

// // Invalid Address Error
// export function AddressError(message='Invalid Ethereum Address') {
//   let instance = new Error(message)
//   Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
//   return instance
// }
// AddressError.prototype = Object.create(Error.prototype, ERROR_DEF_OBJ)
// Object.setPrototypeOf(AddressError, Error)

// // EAM Error
// export function EAMError(message='EAM criteria not found') {
//   let instance = new Error(message)
//   Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
//   return instance
// }
// EAMError.prototype = Object.create(Error.prototype, ERROR_DEF_OBJ)
// Object.setPrototypeOf(EAMError, Error)

// // Message Error
// export function MessageError(message='No messages match EAM criteria') {
//   let instance = new Error(message)
//   Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
//   return instance
// }
// MessageError.prototype = Object.create(Error.prototype, ERROR_DEF_OBJ)
// Object.setPrototypeOf(MessageError, Error)

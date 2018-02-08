import _ from 'lodash'

const ERROR = 'ERROR'
const INFO = 'INFO'

export const NOTIFICATION_TYPES = {
  [INFO]: INFO,
  [ERROR]: ERROR,
}

export class Notification {
  constructor ({ text=undefined, type=undefined }) {
    if (!_.isString(text) || _.isEmpty(text)) {
      throw new Error(`Notifications require a 'text' property`)
    }

    if (!_.has(NOTIFICATION_TYPES, type)) {
      throw new Error(`Notifications require a valid 'type' property`)
    }

    this.text = text
    this.type = type
  }
}

import _ from 'lodash'

// TODO: use exports from constants

const INFO = 'INFO'
const ERROR = 'ERROR'
const SUCCESS = 'SUCCESS'

export const NOTIFICATION_TYPES = {
  [INFO]: INFO,
  [ERROR]: ERROR,
  [SUCCESS]: SUCCESS,
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

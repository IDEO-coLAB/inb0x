import _ from 'lodash'

const ERROR = 'ERROR'
const INFO = 'INFO'

export const NOTIFICATION_TYPES = {
  [INFO]: INFO,
  [ERROR]: ERROR,
}

export class Notification {
  constructor ({ description, type, actions=undefined, onClose=undefined }) {
    if (!_.isString(description) || _.isEmpty(description)) {
      throw new Error(`Notifications require a 'description' property`)
    }

    if (!_.has(NOTIFICATION_TYPES, type)) {
      throw new Error(`Notifications require a valid 'type' property`)
    }

    if (actions && !_.isEmpty(actions)) {
      _.forEach(actions, ({ name, fn }) => {
        if (!_.isString(name) || !_.isFunction(fn)) {
          throw new Error(`Notification actions require a 'text' and  'fn' property`)
        }
      })
    }

    if (onClose && !_.isFunction(onClose)) {
      throw new Error(`Notification onClose must be a function`)
    }

    this.description = description
    this.type = type
    this.actions = actions
    this.onClose = onClose
  }
}

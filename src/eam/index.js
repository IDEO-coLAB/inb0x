import _ from 'lodash'

// TODO: UPDATE!!
const EAM_ENTRY_PROPERTY = 'mei'

export const isEAM = (definitionStr) => {
  let definition
  try {
    definition = JSON.parse(definitionStr)
  } catch (error) {}

  if (!definition || !_.has(definition, EAM_ENTRY_PROPERTY)) {
    return false
  }
  return true
}

export class EAM {
  constructor(definitionStr) {
    const definition = JSON.parse(definitionStr)
    // TODO: UPDATE!!
    this.valueThreshold = Number(definition.mei.eth_amt)
  }

  get threshold() {
    return this.valueThreshold
  }
}

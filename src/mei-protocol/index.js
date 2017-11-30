import _ from 'lodash'

const MEI_ENTRY_PROPERTY = 'mei'

export const isMEI = (definitionStr) => {
  let definition
  try {
    definition = JSON.parse(definitionStr)
  } catch (error) {}

  if (!definition || !_.has(definition, MEI_ENTRY_PROPERTY)) {
    return false
  }
  return true
}

export class MEI {
  constructor(definitionStr) {
    const definition = JSON.parse(definitionStr)
    this.valueThreshold = Number(definition.mei.eth_amt)
  }

  get threshold() {
    return this.valueThreshold
  }
}

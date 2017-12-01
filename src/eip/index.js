import _ from 'lodash'

const EIP_ENTRY_PROPERTY = 'mei' // change

export const isEIP = (definitionStr) => {
  let definition
  try {
    definition = JSON.parse(definitionStr)
  } catch (error) {}

  if (!definition || !_.has(definition, EIP_ENTRY_PROPERTY)) {
    return false
  }
  return true
}

export class EIP {
  constructor(definitionStr) {
    const definition = JSON.parse(definitionStr)
    this.valueThreshold = Number(definition.mei.eth_amt)
  }

  get threshold() {
    return this.valueThreshold
  }
}

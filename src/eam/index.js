import _ from 'lodash'
import web3 from 'web3'



// TODO: UPDATE!!
const EAM_ENTRY_PROPERTY = 'mei'


// This is sloppy while we're playing around
// TODO: SPEND TIME WITH THIS
export const isEAM = (eamJsonString) => {
  let definition
  try {
    definition = JSON.parse(eamJsonString)
  } catch (error) {
    console.log('bailing 1')
  }

  if (!definition || !_.has(definition, EAM_ENTRY_PROPERTY)) {
    return false
  }
  return true
}

export class EAM {
  constructor(eamJsonString) {
    const definition = JSON.parse(eamJsonString)
    // TODO: UPDATE!!
    this.valueThreshold = Number(definition.mei.eth_amt)
  }

  get threshold() {
    return this.valueThreshold
  }
}

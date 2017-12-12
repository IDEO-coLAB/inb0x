import Vue from 'Vue'
import web3 from 'web3'
import _ from 'lodash'

const handleUpdate = (el, binding) => {
  if (_.isUndefined(binding.value) || _.isNull(binding.value)) return
  const trimPrefix = true
  const charToShow = 6

  let addr = binding.value
  if (trimPrefix) {
    addr = binding.value.slice(2, endIdx)
  }

  const startIdx = 0
  const endIdx = addr.length-1
  console.log('======>', addr)

  const startStr = addr.slice(startIdx, charToShow)
  const endStr = addr.slice(endIdx-charToShow, endIdx)
  el.innerHTML = `${startStr}...${endStr}`
}

export default Vue.directive('address-truncate', {
  inserted (el, binding) {
    handleUpdate(el, binding)
  },
  componentUpdated (el, binding) {
    handleUpdate(el, binding)
  }
})

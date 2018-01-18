import Vue from 'Vue'
import web3 from 'web3'
import _ from 'lodash'

const handleUpdate = (el, binding) => {
  if (_.isUndefined(binding.value)) return
  const ascii = web3.utils.hexToAscii(binding.value)
  el.innerHTML = `${ascii}`
}

export default Vue.directive('wei-to-eth', {
  inserted (el, binding) {
    handleUpdate(el, binding)
  },
  componentUpdated (el, binding) {
    handleUpdate(el, binding)
  }
})

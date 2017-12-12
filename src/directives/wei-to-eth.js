import Vue from 'Vue'
import web3 from 'web3'
import _ from 'lodash'

const handleUpdate = (el, binding) => {
  if (_.isUndefined(binding.value)) return
  const eth = web3.utils.fromWei(binding.value)
  el.innerHTML = `${eth}`
}

export default Vue.directive('wei-to-eth', {
  inserted (el, binding) {
    handleUpdate(el, binding)
  },
  componentUpdated (el, binding) {
    handleUpdate(el, binding)
  }
})

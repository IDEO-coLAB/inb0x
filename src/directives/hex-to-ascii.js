import Vue from 'Vue'
import web3 from 'web3'
import _ from 'lodash'

const handleUpdate = (el, binding) => {
  if (_.isUndefined(binding.value)) return
  const ascii = web3.utils.hexToAscii(binding.value)
  if (ascii) {el.innerHTML = `${ascii}`}
  else {el.innerHTML = "**no text sent with message.**"}

}

export default Vue.directive('wei-to-eth', {
  inserted (el, binding) {
    handleUpdate(el, binding)
  },
  componentUpdated (el, binding) {
    handleUpdate(el, binding)
  }
})

const ETHERSCAN_URL_BASE = 'https://api.etherscan.io/api'
const ETHERSCAN_API_KEY = '18IQY7FVNVK3KFQN3RV5ZNT15SVPPFED9S'

const txFetchCount = 20

export const getTxUrlForAddress = (address) => {
  if (!address) return null
  return `${ETHERSCAN_URL_BASE}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${txFetchCount}&sort=desc&apiKey=${ETHERSCAN_API_KEY}`
}

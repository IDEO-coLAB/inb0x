const ETHERSCAN_URL_BASE = 'https://api.etherscan.io/api'
const ETHERSCAN_API_KEY = '18IQY7FVNVK3KFQN3RV5ZNT15SVPPFED9S'

export const getTxUrlForAddress = (address, page, txFetchCount) => {
  if (!address) return null
  return `${ETHERSCAN_URL_BASE}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${txFetchCount}&sort=desc&apiKey=${ETHERSCAN_API_KEY}`
}

export const etherPriceUrl = `${ETHERSCAN_URL_BASE}?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`

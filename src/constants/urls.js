export const getTokenFetchUrl = (address, page) => {
  // TODO/FIXME: Need pagination on the back end
  return `https://inb0x-backend.herokuapp.com/tokens/${address}`
}

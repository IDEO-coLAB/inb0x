const fs = require('fs')
const solc = require('solc')
const Web3 = require('web3')

// Ensure you have a testrpc instance running on port 8545 (default)
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

web3.eth.getAccounts()
  .then((accounts) => {
    const code = fs.readFileSync('src/ethereum/inb0x.sol').toString()
    const compiledCode = solc.compile(code)

    const byteCode = compiledCode.contracts[':Inbox'].bytecode
    const abiDefinition = JSON.parse(compiledCode.contracts[':Inbox'].interface)

    const EAMContract = new web3.eth.Contract(abiDefinition, {
      gas: 4700000,
      data: byteCode,
      from: accounts[0],
    })

    EAMContract.deploy()
      .send(function (error, transactionHash) {
        console.log('transactionHash', transactionHash)
      })
  })

const ccxt = require('ccxt')
const Balances = require('./Balances')
const Markets = require('./Markets')

module.exports = {
  auth: openSession,
  sandbox: openSandbox
}

function openSandbox (user, callback) {
  console.log('Opening new sandbox session...')
  const data = require('./fetchAccounts.stub.json').data
  callback(null, { flag: 'init sandbox', data: data })
}

function openSession (user, callback) {
  user.clients = {}
  console.log('Opening new session...')

  // loop thru exchange accounts
  for (const exchangeID in user.auth.accounts) {
    console.log('Found keys for ' + JSON.stringify(exchangeID))
    const keys = user.auth.accounts[exchangeID]
    // create new ccxt object
    /* eslint-disable new-cap */
    user.clients[exchangeID] = new ccxt[exchangeID](keys)
    // fetch available markets and related data
    Balances.parse(user.clients[exchangeID], exchangeID)
      .then((data) => { callback(null, data) })
    Markets.parse(user.clients[exchangeID], exchangeID)
      .then((data) => { callback(null, data) })
  }
  return user
}

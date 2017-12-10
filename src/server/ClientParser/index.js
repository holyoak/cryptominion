const chalk = require('chalk')
const openSession = require('./openSession')

// store client states
const Clients = {}

module.exports = {
  input: input
}

/**
 * parses websocket messages recieved from clients
 * @param  {data}       message       websocket message
 * @param  {Function}   callback      accessor function to return ws response
 * @return {none}                     Promise dependent event chain, return values break here
 */
function input (message, callback) {
  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection', chalk.red.bold(error.message))
    process.exit(0)
  })
  switch (message.flag) {
    case 'open session':
      const user = message.user
      Clients[user.id] = user
      if (user.auth.sandbox === false) {
        Clients[user.id] = openSession.auth(Clients[user.id], callback)
      } else {
        Clients[user.id] = openSession.sandbox(Clients[user.id], callback)
      }
      break
    default:
      const msg = '/server/ClientParser switch condition not met'
      console.log(msg)
      callback(msg)
      break
  }
}

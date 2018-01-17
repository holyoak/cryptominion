// const DataStreams = require('../DataStreams')
const parse = require('../ClientParser')

module.exports = {
  actions: actions,
  init: init
}

function init (app, socket) {
  console.log('Event bus initialized....')
  app.ws('/', (ws, req) => {
    ws.on('message', function (msg) {
      const m = JSON.parse(msg)
      parse.input(m, relayData)
    })
    function relayData (err, data) {
      if (err) {
        console.error(err)
        ws.send(JSON.stringify(err))
      }
      ws.send(JSON.stringify(data))
    }
  })
}

function actions (userID, exKey, data) {
  console.log('into actions')
  console.log('userID is ' + userID)
  console.log('exKey is ' + exKey)
  console.log('data is ' + data)
}

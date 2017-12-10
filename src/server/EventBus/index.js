// const DataStreams = require('../DataStreams')
const parse = require('../ClientParser')

module.exports = {
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

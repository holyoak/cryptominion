'use strict'

export default function (port, auth, config) {
  const socket = new WebSocket('ws://' + port + '/')
  socket.addEventListener('error', function (e) {
    console.log('Server socket error: ' + JSON.stringify(e))
  })
  socket.addEventListener('open', function (m) {
    const user = {
      flag: 'open session',
      user: {
        id: 1,
        assets: config.assets,
        auth: auth
      }
    }
    socket.send(JSON.stringify(user))
  })
  return socket
}

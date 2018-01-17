'use strict'

export default function (port, init) {
  const socket = new WebSocket('ws://' + port + '/')
  socket.addEventListener('error', function (e) {
    console.log('Server socket error: ' + JSON.stringify(e))
  })
  socket.addEventListener('open', function (m) {
    socket.send(JSON.stringify(init))
  })
  return socket
}

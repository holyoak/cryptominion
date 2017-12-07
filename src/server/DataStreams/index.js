'use strict'
const chalk = require('chalk')
const http = require('http')
// const url = require('url')
const WebSocket = require('ws')
const config = require('../config.json').dataStreams
const Gdax = require('./gdax')
const Polo = require('./poloniex')
const logging = process.argv[2] || false
const loggingOnOff = logging === true ? 'on' : 'off'
console.log(chalk.hex(config.color)('DataStream console ticker is ' + loggingOnOff))

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection (ws, req) {
  // const location = url.parse(req.url, true)
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  console.log(chalk.blue('connection received'))
  ws.on('message', function incoming (message) {
    // const m = JSON.parse(message)
    console.log('received: %s', message)
    // if (m.flag === 'open session')
  })
})

server.listen(config.port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(chalk.hex(config.color)(`Websocket server is listening on port: ${config.port}`))
})

// why does this work?
// Polo.init(wss, true)
// Gdax.init(wss, true)
//
// but this doesn't?
// Polo.init(wss, logging)
// Gdax.init(wss, logging)
//
// anyway....
Polo.init(wss)
Gdax.init(wss)

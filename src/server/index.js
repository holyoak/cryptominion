const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const config = require('./config')
const renderCoreHtml = require('./html')

const port = process.env.PORT || 8080

let app = express()
app.use(favicon('cryptominion.ico'))

app = require('./webpack').pack(app)

app.use(cookieParser())
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use('/static', express.static('./static'))

app.get('/', function (req, res) {
  if (req.cookies.nav) {
    config.initialState.nav = req.cookies.nav
  }
  res.status(200).send(renderCoreHtml(config))
})

// EventBus handles websocket connection to client
/* eslint-disable no-unused-vars */
const ws = require('express-ws')(app)
const EventBus = require('./EventBus')
EventBus.init(app, ws)

app.post('/', function (request, response) {
  const d = request.body
  const data = JSON.parse(Object.keys(d)[0])
  response.cookie('nav', data)
  console.log('Inserting cookie ')
  console.log('   ---> ' + JSON.stringify(data))
  response.send({devs: 'mmm tasty cookies'})
})

app.listen(port, function () {
  console.log('Server running on port ' + port)
})

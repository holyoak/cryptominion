'use strict'
const config = require('../config')
const dialog = require('./oak.dialog.html.js')
// Render Initial HTML
module.exports = function () {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta content="IE=edge" http-equiv="X-UA-Compatible">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>${config.appName}</title>
        <link rel="stylesheet" type="text/css" href="./static/app.css">
        <link rel="stylesheet" type="text/css" href="./static/oak.css">
        <link rel="stylesheet" type="text/css" href="./static/vue-material.css">
      </head>
      <body>
        ${dialog}
        <div id="app"></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(config.initialState)};
        </script>
        <script type="text/javascript" src="/app.js"></script>
      </body>
    </html>
  `
}

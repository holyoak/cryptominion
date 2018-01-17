'use strict'
const fs = require('fs')

module.exports = {
  logToFile: logToFile
}
/**
 * logToFile: writes simple data to files
 * @param  {} data            data to be logged
 * @param  {String} file      path to log file
 * @param  {String} preface   optional preface to log line(s)
 */
function logToFile (data, file, preface) {
  const message = JSON.stringify(data) + '\n'
  if (preface) message = preface + message
  fs.appendFile(file, message, (err) => {
    if (err) throw err
  })
}
// register global gui components

require('./Button')
require('./Checkbox')
require('./Input')
require('./Input/Number')
const utils = require('./utils')
const Dialog = require('./Dialog')

// document.body.addElement(dialog.html.js)
utils.dialog = Dialog
module.exports = utils

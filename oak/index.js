// register global gui components

require('./Button')
require('./Checkbox')
require('./Input')
const Dialog = require('./Dialog')

// document.body.addElement(dialog.html.js)

module.exports = {
  dialog: Dialog.show
}

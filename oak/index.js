// register global gui components

require('./Button')
require('./Checkbox')
const Dialog = require('./Dialog')

// document.body.addElement(dialog.html.js)

module.exports = {
  dialog: Dialog.show
}

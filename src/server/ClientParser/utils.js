'use strict'

module.exports = {
  strToFixed: strToFixed
}
/**
 * Convert string to .fixed() parameter
 *   by counting the chars after the decimal
 * @param  {String} str String input
 * @return {Number}     Number of chars after '.'
 */
function strToFixed (str) {
  const i = str.indexOf('.') + 1
  return str.slice(i).length
}

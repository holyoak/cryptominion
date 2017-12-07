const utils = [2, 5, 7, 10, 3]

const ask = utils.sort(function (a, b) {
  return Number(a) - Number(b)
})

console.log('ask is ' + ask)

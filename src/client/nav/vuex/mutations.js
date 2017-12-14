/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default {
  INIT_NAV (state, payload) {
    if (payload === null) {
      state.nav = {
        view: 'splash',
        upperDiv: 'splash',
        lowerDiv: 'accounts-view'
      }
    } else state.nav = payload
  },

  SET_NAV (state, payload) {
    state.nav = payload
    setCookies(payload)
  },

  SET_SOCKET (state, payload) {
    state.socket = payload
  }
}

function setCookies (data) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/', true)
  // Send the proper header information along with the request
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.send(JSON.stringify(data))
}

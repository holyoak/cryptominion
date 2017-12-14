/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default {
  CREATE_POSITION (state, payload) {
    const res = { flag: 'create position', data: payload }
    console.log('state is ' + JSON.stringify(state))
    state.nav.socket.send(JSON.stringify(res))
  }
}

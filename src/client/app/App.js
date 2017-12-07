'use strict'
import Vue from 'vue'
import actions from './actions'
import auth from '../../../userAuth.json'
import config from './userConfig.json'
import dataSocket from './socket'
import AccountsView from '../components/accounts/components/AccountsListView'
import FabNav from '../nav/Nav'
import Splash from '../components/splash/Splash'
import TickersView from '../components/tickers/components/TickersView'
import TraderView from '../components/trader/components/TraderView'

export default Vue.component('app', {

  data () {
    return {
      dataReady: false
    }
  },

  components: {
    AccountsView,
    FabNav,
    Splash,
    TickersView,
    TraderView
  },

  computed: {
    lower () { return this.$store.state.nav.nav.lowerDiv },
    upper () { return this.$store.state.nav.nav.upperDiv }
  },

  created () {
    let self = this
    const nav = window.__INITIAL_STATE__.nav
    console.log('window.state is ' + JSON.stringify(nav))
    self.$store.commit('INIT_NAV', nav)
// Is this the right pace to put the socket connection?
    self.dataStreams()
    const socket = dataSocket(window.location.host, auth, config)
    socket.addEventListener('message', function (msg) {
      const m = JSON.parse(msg.data)
      if (self.dataReady === false) {
        actions(self.$store, {
          flag: 'init state',
          data: { auth: auth }
        },
        function () {
          self.dataReady = true
          actions(self.$store, m)
        })
      } else {
        actions(self.$store, m)
      }
    })
  },

  methods: {
    dataStreams () {
      let self = this
      // the real data socket
      const socket = dataSocket('localhost:3200', {}, {})
      socket.addEventListener('message', function (msg) {
        const data = JSON.parse(msg.data)
        actions(self.$store, data)
      })
    }
  },

  template: require('../layout').desktop
})

'use strict'
import Vue from 'vue'
import actions from './actions'
import auth from '../../../userAuth.json'
import config from '../userConfig.json'
import dataSocket from './socket'
import AccountsView from '../components/accounts/components/AccountsListView'
import FabNav from '../nav/Nav'
import Splash from '../components/splash/Splash'
import TickersView from '../components/tickers/components/TickersView'
import TraderView from '../components/trader/components/TraderView'

export default Vue.component('app', {

  data () {
    return {
      dataReady: false,
      socket: false
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
    self.$store.commit('INIT_NAV', nav)
    // open dataStream socket client
    self.dataStreams()
    // open exchangeClient socket client
    const user = {
      flag: 'open session',
      user: {
        id: config.id,
        assets: config.assets,
        auth: auth
      }
    }
    const socket = dataSocket(window.location.host, user)
    self.$store.commit('SET_SOCKET', socket)
    socket.addEventListener('message', function (msg) {
      const m = JSON.parse(msg.data)
      if (self.dataReady === false) {
        actions(self.$store, {
          flag: 'init state',
          data: { auth: auth, config: config }
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
      const user = {
        flag: 'open session',
        user: {
          id: config.id
        }
      }
      // the dataStream socket client
      const socket = dataSocket('localhost:3200', user)
      socket.addEventListener('message', function (msg) {
        const data = JSON.parse(msg.data)
        actions(self.$store, data)
      })
    }
  },

  template: require('../layout').desktop
})

<template>
  <div id="accounts-list-view" class="lower">
    <div class="app-row wrap j-between spaced">
      <account-view
        v-for="account in accounts"
        :account="account"
        v-bind:key="account.key"
      ></account-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import accountView from './Account'

export default {
  name: 'accounts-view',

  components: {
    accountView
  },

  data () {
    return {}
  },

  methods: {
    ...mapActions([
      'loadAccounts'
    ])
  },

  computed: {
    ...mapState({
      'accounts': state => state.accounts.accounts
    })
  }
}
</script>

<style scoped>
#accounts-list-view{

}
.spaced{
  padding: 1em;
  background-color: grey;
}
</style>

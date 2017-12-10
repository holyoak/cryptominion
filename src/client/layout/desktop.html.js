module.exports =
`
  <div id="app">
    <div v-if="dataReady">
      <fab-nav></fab-nav>
      <div id="upper-pane">
        <component :is="upper"></component>
      </div>
      <div id="lower-pane">
        <component :is="lower"></component>
      </div>
    </div>
    <div v-if="!dataReady">
      Loading Data
    </div>
  </div>
  `

module.exports =
`
  <div id="app">
    <div id="modl_root" style="display: none; position: fixed; z-index: 9; left: 0px; top: 0px; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4);">
      <div id="oak_modal" style="height: 75%; height: 75vh; left: 12%; left: 12vh; top: 12%; top: 12vh; width: 75%; width: 75vw; display: flex; flex-flow: column nowrap; position: fixed;  border: .25em solid red;">
        <div id="modl_head" class="oak-bkgd1" style="height: 15%; text-align: center; padding: 1em;">Modal Header</div>
        <div id="modl_cont" class="oak-frgd1" style="overflow-x:hidden; overflow-y:auto; flex: 1 1 0%; padding: .25em; display: flex; flex-flow: column nowrap; overflow-x:hidden; overflow-y:auto;">Modal body</div>
        <div id="modl_foot" class="oak-bkgd1" style="height: 2em; padding: .5em; text-align: right;">Modal footer</div>
      </div>
    </div>
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

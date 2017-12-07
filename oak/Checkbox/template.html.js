module.exports =
`
<div class="oak-checkbox">
  <div v-if="checked" class="oak-checkbox-check"
    @click="toggleCheck">
    <img v-bind:src="checkedSVG">
  </div>
  <div v-if="!checked" class="oak-checkbox-check"
    @click="toggleCheck">
    <img v-bind:src="notCheckedSVG">
  </div>
</div>`

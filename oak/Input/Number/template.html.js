module.exports =
`
<div class="oak-input oak-number">
  <div class="oak-row oak-between oak-full oak-flex oak-faux-input" v-if="!showInput" @click="showUI">
    <div v-if="locLabel" style="text-align: left;">{{ label }}</div>
    <div class="oak-button" style="text-align: right;">
      {{locDisplay}}
    </div>
  </div>
  <div v-if="showInput" class="oak-row">
    <input @input="parse" @change="output" @blur="output"
      :placeholder="locPlaceholder"
      ref="ui"
      v-model="locValue">
  </div>
  <div v-if="NaN" class="oak-overlay oak-err oak-number">Must be a number!</div>
</div>`

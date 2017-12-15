module.exports =
`
<div class="oak-input oak-full">
  <div class="oak-row oak-between oak-button oak-faux-input"
    :style="activeStyle"
    v-if="!showInput" @click="showUI">
    <div v-if="locLabel" style="text-align: left;">{{ label }}</div>
    <div style="text-align: right;">
      {{locDisplay}}
    </div>
  </div>
  <div v-if="showInput" style="width: 90%;">
    <input @input="parse" @change="output" @blur="output"
      :placeholder="locPlaceholder"
      ref="ui"
      v-model="locValue">
  </div>
  <div v-if="notValid" class="oak-overlay oak-err">Must be a number!</div>
</div>`

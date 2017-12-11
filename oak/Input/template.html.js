module.exports =
`
<div class="oak-input">
    Some Input Component
  <div v-if="isNAN">Must be a number</div>
  <div v-if="!showInput" @click="showInput=true">{{localValue}}</div>
  <div v-if="showInput" class="app-row full-span left">{{value}}<input v-model="localValue"></div>

  <div @click="myEmit" class="oak-button">Emit</div>
</div>`

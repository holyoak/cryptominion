modules.export = `    <oak-modal v-if="showModal"
      @ok="emitPortions"
      @cancel="cancelPortions">
      <h3 slot="header">Split Position into Portions</h3>
      <div slot="content">
        <p>How many portions for the position?</p>
        <p><small>(min 3 max 10)</small></p>
        <input class="oak-input-number" min="3" max="10" type="number"   placeholder="Portions" v-model.number="localPortions.portions">
        <p>The range should start</p>
          <div class="app-col">
            around<oak-checkbox
            :checked="localPortions.around"
            v-on:click="localPortions.around=!localPortions.around">
            </oak-checkbox>
            {{rangeLabel}}<oak-checkbox
            :checked="!localPortions.around"
            v-on:click="localPortions.around=!localPortions.around">
            </oak-checkbox>
          </div>
        <p>the opening price of {{activePrice}} {{quoteName}} and span</p>
        <div v-if="!setRangePercent" class="app-row j-between">
          <div class="mini-button" @click="setRangePercent=true">%</div>
          <input class="oak-input-number" type="number" placeholder="Range" v-model.number="localPortions.range"> {{quoteName}}
        </div>
        <div v-if="setRangePercent" class="app-row j-between">
          <div class="mini-button" @click="setRangePercent=false">{{quoteName}}</div>
          <input class="oak-input-number" type="number" min="1" max="100" placeholder="Range" v-model.number="localPortions.rangePercent"> %
        </div>
      </div>
    </oak-modal>`

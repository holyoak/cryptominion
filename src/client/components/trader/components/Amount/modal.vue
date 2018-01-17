<template>
<div>
  <oak-modal v-if="showModal"
    @ok="accept"
    @cancel="cancel">
    <h3 slot="header">Enter percentage of   {{ balance }} {{ name }}</h3>
    <div slot="content">
      <input class="oak-input-number" size="3" min="1" max="100" type="mber" placeholder="Percent" v-model="percentage">
      </input> %
    </div>
  </oak-modal>
</div>
</template>

<script>

export default {

  props: ['balance', 'name', 'showModal', 'value'],

  data () { return { percentage: this.value } },

  methods: {
    accept () { this.$emit('accept', this.percentage) },
    cancel () { this.$emit('cancel') }
  }

}
</script>

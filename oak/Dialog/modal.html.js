module.exports = `
<!-- template for the oak-modal component -->
<script type="text/x-template" id="oak-modal-template">
  <transition name="oak-modal">
    <div class="oak-modal-mask">
      <div class="oak-modal-wrapper">
        <div class="oak-modal-container">

          <div class="oak-modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="oak-modal-body">
            <slot name="content">
              default body
            </slot>
          </div>

          <div class="oak-modal-footer">
            <slot name="footer">
              <button class="oak-modal-default-button" @click="$emit('cancel')">
                Cancel
              </button>
              <button class="oak-modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</script>`

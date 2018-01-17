'use strict'

export default {
  computed: {
    buttonTheme () {
      return {
        backgroundColor: this.theme.color,
        border: 'solid',
        borderColor: this.theme.accent
      }
    },
    numberTheme () {
      return {
        active: Object.assign({}, this.theme, { borderColor: 'yellow' }),
        complete: Object.assign({}, this.theme, { border: 'none' }),
        err: Object.assign({}, this.theme, { borderColor: 'red', backgroundColor: 'white' }),
        virgin: Object.assign({}, this.theme, { backgroundColor: 'white', color: this.theme.backgroundColor })
      }
    }
  }
}

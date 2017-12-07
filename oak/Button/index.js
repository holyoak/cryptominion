// register global gui components
import Vue from 'vue'
import config from '../config.json'
import { guid } from '../utils'
import getSVG from './button.svg'

Vue.component('oak-button', {
  template: require('./template.html'),
  props: [ 'cb' ],
  data () {
    return {
      dur: config.animDuration,
      DOMx: '',
      DOMy: ''
    }
  },
  computed: {

  },
  methods: {
    attachRipple (el, event) {
      el.ripls = el.ripls || 0
      console.log('into attachRipple')
      el.id = el.id || guid()
      el.style.position = 'relative'
      const container = document.createElement('div')
      container.id = el.id + '_butt' + el.ripls
      container.style.position = 'absolute'
      container.style.left = '0px'
      container.style.top = '0px'
      container.style.width = '100%'
      container.style.height = '100%'
      el.appendChild(container)
      this.injectHtml(el, event)
      el.ripls++
      setTimeout(function () {
        console.log('into remove ripple')
        el.removeChild(el.childNodes[1])
      }, (this.dur * 1000))
    },
    injectHtml (el, event) {
      const animID = el.id + '_anim' + el.ripls
      const circID = el.id + '_circ' + el.ripls
      const html = getSVG(animID, circID, this.dur)
      console.log(html)
      el.lastChild.innerHTML = html
      this.animate(el, event)
    },
    animate (el, event) {
      const rect = el.getBoundingClientRect()
      const x = parseInt(event.clientX - rect.left)
      const y = parseInt(event.clientY - rect.top)
      // the rippley scott logic to expand circle to far edge of rect
      const offsetX = Math.abs((rect.width / 2) - x)
      const offsetY = Math.abs((rect.height / 2) - y)
      const deltaX = (rect.width / 2) + offsetX
      const deltaY = (rect.height / 2) + offsetY
      let maxR = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      // convert for this instance of viewbox
      maxR = Math.floor(200 * maxR / rect.width)
      const cx = Math.floor(200 * x / rect.width)
      const cy = Math.floor(100 * y / rect.height)
      // set the circle
      const circ = document.getElementById(el.id + '_circ' + el.ripls)
      circ.setAttribute('cx', cx)
      circ.setAttribute('cy', cy)
      // set and start the animation
      const anim = document.getElementById(el.id + '_anim' + el.ripls)
      anim.setAttribute('values', '1;' + maxR + ';1')
      anim.beginElement()
    }
  },

  mounted: function () {
    const targ = this.$parent
    const attach = this.attachRipple
    console.log('oak button info')
    console.log(targ)
    targ.$el.addEventListener('click', function (event) {
      attach(targ, event)
    })
    const ref = this.$refs.oakButton
    this.DOMx = ref.getBoundingClientRect().left
    this.DOMy = ref.getBoundingClientRect().top
  }
})

'use strict'

export default function (id, cb){
  console.log('into material design button')
  var targ = document.getElementById(id)
  targ.addEventListener('click', function(event){
  	attachRipple(this, event)
  	cb && cb(targ)
  })
}

function attachRipple(el, event){
  var dur = 5
  el.ripls = el.ripls || 0

  console.log('into attachRipple')
  el.style.position = 'relative'
  var container = document.createElement('div')
  container.id = el.id+'_butt'+el.ripls
  container.style.position = 'absolute'
  container.style.left = '0px'
  container.style.top = '0px'
  container.style.width = '100%'
  container.style.height = '100%'
  el.appendChild(container)
  injectHtml(el, event, dur, animate)
  el.ripls++
  var trash = setTimeout( function(){
  	console.log('into remove ripple')
  	console.log('el.id is '+el.id)
  	el.removeChild(el.childNodes[1])
  },(dur*1000))
}

function animate(el, event){
  var rect = el.getBoundingClientRect()
  var x = parseInt(event.clientX-rect.left)
  var y = parseInt(event.clientY-rect.top)
  // the rippley scott logic to expand circle to far edge of rect
  var offsetX      = Math.abs( (rect.width / 2) - x )
  var offsetY      = Math.abs( (rect.height / 2) - y )
  var deltaX       = (rect.width / 2) + offsetX
  var deltaY       = (rect.height / 2) + offsetY
  var maxR  = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
  // convert for this instance of viewbox
  maxR = Math.floor(200*maxR/rect.width)
  var cx = Math.floor(200*x/rect.width)
  var cy = Math.floor(100*y/rect.height)

  // set the circle
  var circ = document.getElementById(el.id+'_circ'+el.ripls)
  circ.setAttribute('cx', cx)
  circ.setAttribute('cy', cy)

  // set and start the animation
  var anim = document.getElementById(el.id+'_anim'+el.ripls)
  anim.setAttribute('values', '1;'+maxR+';1')
  anim.beginElement()
}

function injectHtml(el, event, dur, cb){
	var html = require('./button.svg')
	html = html.replace('{{id_a}}', el.id+'_anim'+el.ripls)
	html = html.replace('{{dur}}', dur)
	html = html.replace('{{id_c}}', el.id+'_circ'+el.ripls)
	el.lastChild.innerHTML = html
	cb && cb(el, event)
}

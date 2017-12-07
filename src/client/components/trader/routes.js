import * as components from './components'

export default [
  {
    path: '/trade/:exchangeName/:marketID',
    component: components.TraderView,
    name: 'tradeView',
    props: true
  }
]

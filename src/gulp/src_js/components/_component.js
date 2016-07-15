'use strict'
var $ = require('jquery')
var Vue = require('vue')
var BaseMixin = require('mixin').BaseMixin

//
// カスタムフィルタ
//
// Vue.filter('mydate', function (value) {

//   value = value.split('<').join('&lt')
//   value = value.split('>').join('&gt')
//   value = value.split('\n').join('<br>')

//   return value
// })

//
// 下2桁で繰り上げ
//
Vue.filter('ceil', function(value) {
  return Math.ceil(value)
})

//
// 下2桁で繰り上げ
//
Vue.filter('ceil2', function(value) {
  return Math.ceil(value * 100) / 100
})

//
// カスタムフィルタ
//
Vue.filter('br', function(value) {

  value = value.split('<').join('&lt')
  value = value.split('>').join('&gt')
  value = value.split('\n').join('<br>')

  return value
})

//
// カスタムフィルタ
//
Vue.filter('mydate', function(value) {

  if (value.indexOf('_') === -1) return value

  var tmp = value.split('_')
  var ymd = tmp[0]
  var time = tmp[1]
  return ymd.slice(0, 4) + '.' + ymd.slice(4, 6) + '.' + ymd.slice(6, 8) + '&ensp' + time

})

//
// modalトランジションのフック
//
Vue.transition('modal', {
  afterEnter: function(el) {

  },
  afterLeave: function(el) {

  },

})

//
// コンポーネント
// サンプル
//
Vue.component('comp-sample', Vue.extend({

  //ミックスイン
  mixins: [BaseMixin],

  template: '#tmpl-comp-sample',

}))

//
// コンポーネント
// サンプル
//
Vue.component('modal', {
  template: '#modal-template',
  // template: '#compo-overlayyattemitai',
  props: {
    // show: {
    //   type: Boolean,
    //   required: true,
    //   twoWay: true    
    // }
    show: false
  }
})

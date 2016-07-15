'use strict'
var $ = require('jquery')
require('jquery-cookie')
var Vue = require('vue')
var BaseMixin = require('mixin').BaseMixin
var BaseOverlay = require('mixin-overlay').BaseOverlay
var mm = require('mm').mm
var util = require('util').util
var Notice = require('notice').Notice

//
// 「オーバレイ」コンポーネント
//
Vue.component('compo-overlay', Vue.extend({

  props: ['title'],
  mixins: [BaseMixin, BaseOverlay],
  template: '#compo-overlay',
  data: function() {
    return {

    }
  },
  computed: {

  },
  ready: function() {

    var me = this

  },
  methods: {

  },
  beforeDestroy: function() {
    // console.log('beforeDestroy オーバレイ')
    // $(window).off('keydown.overlay')
  },
  destroyed: function() {
    // console.log('破壊されます', this)
  }

}))

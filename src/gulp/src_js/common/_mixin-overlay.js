'use strict'
var $ = require('jquery')
var Vue = require('vue')
var mm = require('mm').mm
var velocity = require('velocity-animate')
var util = require('util').util

//
// オーバレイの共通メソッド
//
var BaseOverlay = {

  props: ['overlaytype'],
  data: function() {
    return {

    }
  },

  /*-----------------------*/
  // ready
  /*-----------------------*/
  ready: function() {
    var me = this
      /*-----------------------*/
      // エスケープクローズ
      /*-----------------------*/
    $(window).off('keydown.overlay').on('keydown.overlay', function(e) {
      if (e.keyCode === 27) {
        // console.log('エスケープクローズ', me.event_close)

        me.close()

      }
    })
  },

  /*-----------------------*/
  // methods
  /*-----------------------*/
  methods: {
    /*-----------------------*/
    // 閉じる
    /*-----------------------*/
    close: function() {

      this.$dispatch('overlay-close', this.overlaytype)
    },
  },

  beforeDestroy: function() {
    $(window).off('keydown.overlay')
  },
}

exports.BaseOverlay = BaseOverlay

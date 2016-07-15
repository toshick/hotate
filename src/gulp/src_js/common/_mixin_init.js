'use strict'
var $ = require('jquery')
var Vue = require('vue')
var mm = require('mm').mm
var velocity = require('velocity-animate')
var util = require('util').util
require('overlay')

//
// 全HTMLコントローラに共通のメソッドを実装
//
var InitMixin = {

  data: function() {
    return {
      overlay_logout: false,
    }

  },

  /*-----------------------*/
  // ready
  /*-----------------------*/
  ready: function() {

    var me = this
    this.myel = $(this.$el)

    /*-----------------------*/
    // ログイン状態が変更された
    /*-----------------------*/
    me.$on('logout', function() {
      me.startLogout(true)

    })
  },

  /*-----------------------*/
  // methods
  /*-----------------------*/
  methods: {
    /*-----------------------*/
    // ログアウト
    /*-----------------------*/
    startLogout: function(flg) {
      var me = this
      console.log('ログアウトするよ')
      this.overlay_logout = flg

    },
    /*-----------------------*/
    // ログアウト実行
    /*-----------------------*/
    logout: function() {
      var me = this
      mm.IF_auth().logout()
    }

    /*-----------------------*/
    // エスケープでオーバレイ閉じる
    /*-----------------------*/
    // setCloseOverlayWithEsc: function() {

    //   var me = this
    //   $(window).on('keydown.overlay', function(e) {
    //     if (e.keyCode === 27) {
    //       //me.closeOverlay()
    //       $(window).off('keydown.overlay')
    //     }
    //   })
    // },
  },

  /*-----------------------*/
  // 以下は禁止　エラーが起こる
  /*-----------------------*/
  // destroyed: {},
  // beforeDestroy: {},
}

exports.InitMixin = InitMixin

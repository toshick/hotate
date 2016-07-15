'use strict'
var $ = require('jquery')
var Vue = require('vue')
var mm = require('mm').mm
var velocity = require('velocity-animate')
var util = require('util').util

var STATE_EDIT = 1
var STATE_DELETE = 2
var STATE_NORMAL = 3

//
// 全ビューに共通のメソッドを実装
//
var BaseMixin = {

  data: function() {
    return {
      state: {
        editting: false,
        deleting: false,
        normal: true,
      },
    }

  },

  /*-----------------------*/
  // ready
  /*-----------------------*/
  ready: function() {

    var me = this
    this.myel = $(this.$el)

  },

  /*-----------------------*/
  // methods
  /*-----------------------*/
  methods: {

    /*-----------------------*/
    // ステート変更
    /*-----------------------*/
    changeState: function(state) {

      for (var item in this.state) {
        this.state[item] = false
      }
      if (state === STATE_NORMAL) {
        this.state.normal = true
      } else if (state === STATE_DELETE) {
        this.state.deleting = true
      } else if (state === STATE_EDIT) {
        this.state.editting = true
      }

    },
    /*-----------------------*/
    // ステート エディット
    /*-----------------------*/
    setEdit: function() {
      this.changeState(STATE_EDIT)
      this.setEditHook()
    },
    /*-----------------------*/
    // フック
    /*-----------------------*/
    setEditHook: function() {

    },
    /*-----------------------*/
    // ステート デリート
    /*-----------------------*/
    setDelete: function() {
      this.changeState(STATE_DELETE)
      this.setDeleteHook()
    },
    /*-----------------------*/
    // フック
    /*-----------------------*/
    setDeleteHook: function() {

    },
    /*-----------------------*/
    // ステート ノーマル
    /*-----------------------*/
    setNormal: function() {
      this.changeState(STATE_NORMAL)
      this.setNormalHook()
    },
    /*-----------------------*/
    // フック
    /*-----------------------*/
    setNormalHook: function() {

    },

  },

}

exports.BaseMixin = BaseMixin

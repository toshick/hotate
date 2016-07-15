'use strict'

var $ = require('jquery')
require('velocity-animate')
var Vue = require('vue')
var util = require('util').util
var BaseMixin = require('mixin').BaseMixin
var Promise = require('es6-promise').Promise

/* ----------------

  Notice

------------------*/
var Notice = function(param) {

  var me = this

  //パラメータコピー
  for (var item in param) {
    this[item] = param[item]
  }

  //DOMを追加
  this.myel = $($('#compo-notice').clone().html())
  $('body').append(this.myel)

  //アラート色
  if (this.alert) {
    this.myel.addClass('notice-alert')
  }

  this.$btnholder = this.myel.find('.notice_btnholder')
  this.$cont = this.myel.find('.notice_body')
  this.$cont.append(this.str)

  //open

  setTimeout(function() {
    me.open()
  }, 200)

  //エスケープにてクローズ
  if (this.withescclose) {
    $(window).on('keypress.notice', function(e) {
      if (e.keyCode === 27) {
        me.close()
      }
    })
  }

}

/*-----------------------*/
// prototype
/*-----------------------*/
Notice.prototype = {

  str: '',
  alert: false,
  autoclose: true,
  withescclose: false,
  duration: 4000,
  $btnholder: null,
  $cont: null,
  label_OK: null,

  /* -----------------------*/
  // open
  /* -----------------------*/
  open: function() {
    var me = this

    return new Promise(function(resolve) {

      if (me.autoclose) {
        /*-----------------------*/
        // 自動で閉じる
        /*-----------------------*/
        setTimeout(function() {
          me.close()
        }, me.duration)

      }

      me.myel.one(util.cssTransitionEnd, function() {
        resolve()
      })
      me.myel.addClass('notice-fadein')

    })

  },

  /*-----------------------*/
  // ok
  /*-----------------------*/
  ok: function() {
    this.$emit('ok')
  },

  /*-----------------------*/
  // close
  /*-----------------------*/
  close: function(data) {
    var me = this
    var el = this.el

    $(window).off('keypress.notice')

    return new Promise(function(resolve) {

      me.myel.one(util.cssTransitionEnd, function() {
        resolve()
        me.destroy()
      })
      me.myel.removeClass('notice-fadein')
    })
  },

  /*-----------------------*/
  //
  /*-----------------------*/
  addBtn: function(label) {
    var $btn = util.btn(label, 'btn').appendTo(this.$btnholder)
    return $btn
  },

  destroy: function() {

    $(window).off('keypress.notice')
    this.myel.off().remove()
  }

}

exports.Notice = Notice

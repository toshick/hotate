'use strict'

var $ = require('jquery')
var util = require('util')

/* -----------------------*/
//
// ScrollFadeIn
// @$target ターゲットのjQuryObject
// @fadeH 0から1にフェードする距離
// @startFadeY フェードを開始するスクロール座標
//
/* -----------------------*/
var _ScrollFadeIn = function($target, fadeH, startFadeY) {
  this.$target = $target
  this.fadeH = fadeH
  this.startFadeY = startFadeY
}
var P = _ScrollFadeIn.prototype
P.fadeIn = true //フェードインするかどうか。falseの場合フェードアウト

/*-----------------------*/
// onScroll
// スクロールの度にコールされる
/*-----------------------*/
P.onScroll = function(scrollTop) {

  //アルファ
  var alpha = (scrollTop - this.startFadeY) * (1 / this.fadeH)
  if (!this.fadeIn) alpha = (alpha - 1) * -1 // 0から1を1から0に反転
  alpha = Math.max(alpha, 0)
  alpha = Math.min(alpha, 1)
  this.$target.css({ opacity: alpha })

}

/* -----------------------*/
//
// jQueryを拡張
//
/* -----------------------*/
$.fn.extend({
  ScrollFadeIn: function($target, fadeH, startFadeY) {
    var f = new _ScrollFadeIn($target, fadeH, startFadeY)
    return f
  }
})

// ScrollFadeIn: function($target, fadeH, startFadeY) {
//     retun new ScrollFadeIn($target, fadeH, startFadeY)
//   }
exports.ScrollFadeIn = _ScrollFadeIn

'use strict'
var $ = require('jquery')

var util = require('util').util
var BaseMixin = require('mixin').BaseMixin
var InitMixin = require('mixin_init').InitMixin
var Vue = require('vue')



/* ------------------- */
//  開始
/* ------------------- */
$(function() {

  var $win = $(window)

  /*-----------------------*/
  // アプリ起動
  /*-----------------------*/
  var cont = new Vue({
    //ミックスイン
    mixins: [BaseMixin, InitMixin],

    el: 'body',
    data: {
      memberlist: [],
      mealcost:1500,
      alcoholcost:1000,

      beer: 8000,
    },
    computed: {
      notentlist: function(){
        if(!this.memberlist) return []

        return this.memberlist.filter(function(d){
          return !d.istent && !d.oneday
        })
      }
    },
    ready: function() {

      console.log('ホタテ')
      var memberlist = []
      memberlist.push({
        name: 'カヨン',
        istent: false
      })
      memberlist.push({
        name: 'テツ',
        istent: false
      })
      memberlist.push({
        name: 'センチ',
        istent: false
      })
      // memberlist.push({
      //   name: 'マービソ',
      //   istent: false,
      //   oneday: true
      // })
      memberlist.push({
        name: 'ドリーミー',
        istent: true
      })
      memberlist.push({
        name: 'せかいの',
        istent: true
      })
      memberlist.push({
        name: 'やなせ',
        istent: true
      })
      memberlist.push({
        name: 'セカンド',
        istent: true
      })
      memberlist.push({
        name: 'コンビーフ',
        istent: true
      })
      memberlist.push({
        name: 'ツマキチ',
        istent: true
      })
      memberlist.push({
        name: 'ユースケ',
        istent: true
      })
      memberlist.push({
        name: 'ちほ',
        istent: true
      })
      memberlist.push({
        name: 'ゆか',
        istent: false
      })
      memberlist.push({
        name: 'ジョン',
        istent: false
      })
      memberlist.push({
        name: 'ルル（せかいのさんの友達台湾人）',
        istent: true
      })
      memberlist.push({
        name: 'ヘナ（ルルさんの友達台湾人）',
        istent: true
      })

      this.memberlist = memberlist

    },
    methods: {

      testmethod: function() {
        console.log('ES6アローてすとめそっどです')

      }

    }

  })
})

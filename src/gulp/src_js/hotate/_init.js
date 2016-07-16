'use strict'
var $ = require('jquery')

var util = require('util').util
var BaseMixin = require('mixin').BaseMixin
var InitMixin = require('mixin_init').InitMixin
var Vue = require('vue')


// class Hello {
//   this.message = 'Hello! ES6'

//   say() {
//     console.log(this.message);
//   }
// }

// var hello = new Hello()
// hello.say()



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
      $tatematsu: null,
      $chunum: null,
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
        name: 'アベ',
        istent: true
      })
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

      /*-----------------------*/
      // アニメの参照
      /*-----------------------*/
      this.$tatematsu = $('.tatematsu_img-anime')
      this.$chunum = $('.chunum_img')

      /*-----------------------*/
      // タテマツアニメ
      /*-----------------------*/
      // setTimeout(()=>{
      //   this.animeTatematsu()
      // }, 4000)
      var me = this
      setTimeout(function(){
        me.animeTatematsu()
      }, 4000)

      /*-----------------------*/
      // チューナムアニメ
      /*-----------------------*/
      // setTimeout(()=>{
      //   //this.animeChunum()
      // }, 2000)
      
    },
    methods: {

      /*-----------------------*/
      // タテマツアニメ
      /*-----------------------*/
      animeTatematsu: function() {

        var me = this
        var anim = ['rubberBand', 'wobble'].shuffle().pop()
        // this.$tatematsu.animateCss(anim, () => {

        //   var rnd = (Math.random()*8000) + 1000
        //   setTimeout(()=>{
        //     this.animeTatematsu()
        //   }, rnd)
          
        // })

        this.$tatematsu.animateCss(anim, function() {

          var rnd = (Math.random()*8000) + 1000
          // setTimeout(()=>{
          //   this.animeTatematsu()
          // }, rnd)
          setTimeout(function(){
            me.animeTatematsu()
          }, rnd)
          
        })
      },

      /*-----------------------*/
      // チューナムアニメ
      /*-----------------------*/
      // animeChunum: function() {

      //   let anim = ['swing'].shuffle().pop()
      //   this.$chunum.animateCss(anim, () => {

      //     let rnd = (Math.random()*2000) + 400
      //     setTimeout(()=>{
      //       this.animeChunum()
      //     }, rnd)
          
      //   })
      // }

    }

  })
})

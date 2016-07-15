'use strict'
var $ = require('jquery')
require('jquery-cookie')
var Vue = require('vue')
var BaseMixin = require('mixin').BaseMixin
var mm = require('mm').mm
var util = require('util').util
var Notice = require('notice').Notice

//
// コンポーネント
// サンプル
//
Vue.component('compo-header', Vue.extend({

  //ミックスイン
  mixins: [BaseMixin],

  template: '#compo-header',

  data: function() {
    return {
      loginuser: null,
      state: {
        register: false,
        unregister: false,
      },
      mail: '',

    }
  },

  computed: {
    isadmin: function() {
      return mm.isadmin
    },
    userPoint: function() {
      return +this.loginuser.point
    },
    chunumCom: function() {
      if (!this.loginuser) {
        return '.....'
      }
      //チューナムコメント
      var aisatsu = ['Ola！', 'ハロー', 'ボアノイチ', 'ご機嫌いかが', 'まってたヨ', 'ヨーコソ', 'ボンジア', '毎日がエヴリデイ']
      return aisatsu.shuffle()[0]
    }
  },

  ready: function() {
    this.checkLogin()
  },

  methods: {
    /*-----------------------*/
    // checkLogin
    /*-----------------------*/
    checkLogin: function() {
      var me = this
        /*-----------------------*/
        // ログイン状態をチェック
        /*-----------------------*/
      mm.IF_checklogin(function(d) {
        if (d.loginuser) {
          console.log('ログインしてる')
            //me.loginedView(d.loginuser)
          me.loginuser = d.loginuser
          mm.trigger('login_changed', true)
        } else {
          console.log('ログインしてない')
          me.loginuser = null
          mm.trigger('login_changed', false)

          /*-----------------------*/
          // LSに保存されていればそれでログイン
          /*-----------------------*/
          var nowlogin = util.LS('nowlogin')
          console.log('nowlogin:', nowlogin)

          if (nowlogin) {
            console.log('LSに保存されているので自動ログイン')
            me.mail = nowlogin
            me.login(true)
          }
        }
        //me.trigger('ready')

      })

    },
    /*-----------------------*/
    // 
    /*-----------------------*/
    showRegisterForm: function() {

    },
    /*-----------------------*/
    // 
    /*-----------------------*/
    showDeleteRegisterForm: function(mydata) {

    },
    /*-----------------------*/
    // resetState
    /*-----------------------*/
    changeState: function(state) {

      for (var item in this.state) {
        if (item === state) {
          this.state[item] = true
        } else {
          this.state[item] = false
        }

      }

      console.log('this.state', this.state)
    },
    /*-----------------------*/
    // register
    /*-----------------------*/
    register: function() {
      this.changeState('register')
    },
    /*-----------------------*/
    // deleteregister
    /*-----------------------*/
    deleteregister: function() {},
    /*-----------------------*/
    // login
    /*-----------------------*/
    login: function(skipmsg) {
      var mail = this.mail
      var me = this

      if (!mail) return

      //ローディング開始
      util.showLoading(true)

      mm.IF_login(mail, function(d) {

        var notice = null
        if (d.error) {
          /*-----------------------*/
          // 失敗
          /*-----------------------*/
          notice = new Notice({
            data: {
              str: 'ログインに失敗じゃん',
              withescclose: true,
            }

            //el: '#notice',
          })

        } else {
          /*-----------------------*/
          // 成功
          /*-----------------------*/
          var username = d.loginuser.username
          var email = d.loginuser.email

          if (!skipmsg) {
            notice = new Notice({
              data: {
                str: 'ボアタルジ、「' + username + '」！',
                withescclose: true
              }
            })
          }

          //クッキーに保存
          $.cookie('loginmail', email, { expires: 7 })
          me.checkAdmin()

          //ユーザデータをセット
          me.loginuser = d.loginuser

        }

        //noticeをマウント
        if (notice) {
          notice.$mount().$appendTo('body')
        }

        //LSに保存
        util.LS('nowlogin', mail)

        //ローディング解除
        util.showLoading(false)

        mm.trigger('login_changed', true)
      })
    },
    /*-----------------------*/
    // ログアウト確認
    /*-----------------------*/
    logout: function() {
      var me = this
        /*-----------------------*/
        // Notice
        /*-----------------------*/
      var notice = new Notice({
        data: {
          str: this.loginuser.username + 'さん<br>ログアウトしますヨ！',
          withescclose: true,
          label_OK: 'OKだ'
        }
      })

      //noticeをマウント
      notice.$mount().$appendTo('body')

      notice.$once('ok', function() {

        me.logoutExe()
        notice.close()
      })

    },
    /*-----------------------*/
    // ログアウト実行
    /*-----------------------*/
    logoutExe: function() {
      var me = this
      mm.IF_logout(function() {

        //ユーザデータをセット
        me.loginuser = null

        //LSを削除
        util.LS('nowlogin', '')

        me.checkAdmin()
        mm.trigger('login_changed', false)

      })
    },
    /*-----------------------*/
    // アドミンかチェック
    /*-----------------------*/
    checkAdmin: function() {
      if (!mm.loginuser) {
        mm.isadmin = false
        return
      }
      var email = mm.loginuser.email
      if (email.indexOf('toshickjazz') != -1 || email.indexOf('katsumi@pivot.jp') != -1) {
        mm.isadmin = true
      } else {
        mm.isadmin = false
      }

    },
  },

  beforeDestroy: function() {
    console.log('beforeDestroy', this)
  },

  destroyed: function() {
    console.log('破壊されます', this)
  }

}))

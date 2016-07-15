'use strict'
var $ = require('jquery')
var util = require('util')
var Vue = require('vue')

/*-----------------------*/
//
// Model
//
/*-----------------------*/
var mm = new Vue({
  data: {
    mitsumoriitems: [],
    mitsumoritypes: [],
    pagelist: [],
    projectD: null,
    loginD: null,
  },
  init: function() {
    console.log('Vueによるmodel')

  },

  methods: {
    /*-----------------------*/
    // ページ移動
    /*-----------------------*/
    goHome: function() {
      location.href = '/home/'
    },
    /*-----------------------*/
    // ページ移動
    /*-----------------------*/
    goLogin: function() {
      location.href = '/login/'
    },
    /*-----------------------*/
    // ページ移動
    /*-----------------------*/
    goResult: function(project_id) {
      location.href = '/result/' + project_id + '/'
    },
    /*-----------------------*/
    // プロジェクトIDを取得
    /*-----------------------*/
    getProjectIDFromURL: function() {
      var project_id = document.URL.replace(/.+#([0-9]+).*$/, '$1')
        // var project_id = url.split('/').pop()
      return project_id
    },

    /*-----------------------*/
    // イメージURLを返却
    /*-----------------------*/
    getImgUrl: function(project_id, name) {
      var url = '/project/pageimg/' + project_id.keta(3) + '/' + name
      console.log('url', url)
      return url
    },
    /*-----------------------*/
    // ページデータを取得
    /*-----------------------*/
    getPageBlockData: function(page_id) {

      var pageD = mm.pagelist.find(function(d) {
        return (d.id === page_id)
      })

      return pageD
    },

    /*-----------------------*/
    // 認証関連
    /*-----------------------*/
    IF_auth: function() {
      var me = this
      return {
        /*-----------------------*/
        // 認証チェック
        /*-----------------------*/
        checkauthAndGo: function(callback) {
          // var url = '/entry.php/auth/checkauth/'
          // return me.IF('POST', url, null, function(ret) {
          //   if(ret.not_logined) me.goLogin()
          // })
          this.checkauth()
        },
        /*-----------------------*/
        // 認証チェック
        /*-----------------------*/
        checkauth: function(callback, nojump) {
          var url = '/entry.php/auth/checkauth/'
          return me.IF('POST', url, null, function(ret) {
            // if(ret.not_logined) me.goLogin()

            if (!ret.not_logined) {

              me.loginD = ret
            }

            var d = (ret.not_logined) ? false : ret
            if (callback) callback(d)
          })
        },
        /*-----------------------*/
        // 登録
        /*-----------------------*/
        register: function(param, callback) {
          var url = '/entry.php/auth/register/'
          return me.IF('POST', url, param, function(ret) {

            console.log('auth', ret)
            if (callback) callback(ret)
          })
        },
        /*-----------------------*/
        // ログイン
        /*-----------------------*/
        login: function(param, callback) {
          var url = '/entry.php/auth/login/'
          return me.IF('POST', url, param, function(ret) {

            console.log('ret', ret)
            if (callback) callback(ret)
          })
        },
        /*-----------------------*/
        // ログアウト
        /*-----------------------*/
        logout: function() {
          var param = null
          var url = '/entry.php/auth/logout/'
          return me.IF('POST', url, param, function(ret) {

            mm.goLogin()
          })
        }

      }

    },

    /*-----------------------*/
    // プロジェクト
    /*-----------------------*/
    IF_project: function() {
      return this.IF_basic('projects')

    },

    /*-----------------------*/
    // ページ
    /*-----------------------*/
    IF_page: function() {

      return this.IF_basic('pages')

    },

    /*-----------------------*/
    // 見積もりアイテム
    /*-----------------------*/
    IF_mitsumoriitem: function() {

      return this.IF_basic('mitsumoriitems')

    },

    /*-----------------------*/
    // 見積もりタイプ
    /*-----------------------*/
    IF_mitsumoritype: function() {

      return this.IF_basic('mitsumoritypes')

    },

    /*-----------------------*/
    // 見積もりタイプと見積もりアイテムの関連
    /*-----------------------*/
    IF_mitsumoritype_mitsumoriitem: function() {

      return this.IF_basic('mitsumoritype_mitsumoriitems')

    },

    /*-----------------------*/
    // ページと見積もりアイテムの関連
    /*-----------------------*/
    IF_page_mitsumoriitem: function() {

      return this.IF_basic('page_mitsumoriitems')

    },

    /*-----------------------*/
    // ページと見積もりタイプの関連
    /*-----------------------*/
    IF_page_mitsumoritype: function() {

      return this.IF_basic('page_mitsumoritypes')

    },

    /*-----------------------*/
    // イメージファイル
    /*-----------------------*/
    IF_imgfiles: function() {
      return this.IF_basic('imgfiles')
    },

    /*-----------------------*/
    // 
    /*-----------------------*/
    IF_basic: function(name) {

      var me = this
      return {
        list: function(param, callback) {
          var url = '/entry.php/' + name + '/'
          return me.IF('GET', url, param, function(ret) {
            if (callback) callback(ret)
          })
        },
        add: function(param, callback) {
          var url = '/entry.php/' + name + '/'
          return me.IF('POST', url, param, function(ret) {
            if (callback) callback(ret)
          })
        },
        one: function(id, param, callback) {
          var url = '/entry.php/' + name + '/' + id + '/'
          return me.IF('GET', url, param, function(ret) {
            if (callback) callback(ret)
          })
        },
        remove: function(id, callback) {
          var url = '/entry.php/' + name + '/' + id + '/'
          return me.IF('DELETE', url, null, function(ret) {
            if (callback) callback(ret)
          })
        },
        update: function(id, param, callback) {
          var url = '/entry.php/' + name + '/' + id + '/'
          return me.IF('PATCH', url, param, function(ret) {
            if (callback) callback(ret)
          })
        }
      }
    },

    /*-----------------------*/
    // ファイルアップロード
    /*-----------------------*/
    fileupload: function(param) {

      // var fd = new FormData(form)
      // 個別にパラメータ指定する場合は以下のようにする
      var fd = new FormData()
      for (var item in param) {
        fd.append(item, param[item])
      }

      // fd.append('imgfile', form.files[0])
      // fd.append('project_id', 3)

      // fd.append('imgfiles', {name:'iiiii', page_id:99, project_id:88})

      //トークン
      var token = $('meta[name="csrf-token"]').attr('content')

      return $.ajax('/entry.php/imgfiles/', {
        method: 'POST',
        processData: false,
        contentType: false,
        data: fd,
        dataType: 'json',
        headers: {
          'X-CSRF-Token': token,
        },
        success: function(json) {

        },
        error: function(json) {
          alert('エラーが発生しました')
        }
      })
    },

    /* -----------------------*/
    // IF
    /* -----------------------*/
    IF: function(type, url, param, callback) {

      //トークン
      var token = $('meta[name="csrf-token"]').attr('content')

      var me = this
      return $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: 'json',
        headers: {
          'X-CSRF-Token': token,
        },

        beforeSend: function(xhr) {
          //iPhone6にておこる412エラー対策
          // xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT')
        },
        xhrFields: {
          //     // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
          //     // This can be used to set the 'withCredentials' property.
          //     // Set the value to 'true' if you'd like to pass cookies to the server.
          //     // If this is enabled, your server must respond with the header
          //     // 'Access-Control-Allow-Credentials: true'.
          // withCredentials: true
        },
        // contentType: 'application/json',
        success: function(data) {
          if (callback) callback(data)
        }
      })
    },
    /*-----------------------*/
    // プロパティ監視
    /*-----------------------*/
    startWatch: function() {
      var me = this
      me.$watch('mitsumoriitems', function(newVal, oldVal) {
        console.log('mm.mitsumoriitems変更された')
        me.$dispatch('updated_mitsumoriitems')
      }, {
        deep: true
      })
    }
  }
  //methods

})

/*-----------------------*/
// 監視
/*-----------------------*/
// mm.$watch('mitsumoriitems', function(newVal, oldVal) {
//   console.log('mm.mitsumoriitems変更された')
//   mm.$dispatch('updated_mitsumoriitems')
// }, {
//   deep: true
// })

exports.mm = mm

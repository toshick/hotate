'use strict'

require('overridebuiltin')
var $ = require('jquery')
require('jquery-indicator')
  // var $ = require('jquery')

var velocity = require('velocity-animate')
var store = require('store')

var $win, $body, $overlay
  /* -------------------

      ユ-ティリティオブジェクトを生成

  ------------------- */
var Util = function() {
  $body = $('body')
}

/* ------------------- */
// プロトタイプ
/* ------------------- */
var P = Util.prototype

/*-----------------------*/
// モバイルかどうか
/*-----------------------*/
if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
  P.isMobile = true
} else {
  P.isMobile = false
}

/*-----------------------*/
// ファイルAPIに対応しているか
/*-----------------------*/
if (window.File && window.FileReader && window.FileList && window.Blob) {
  P.fileAPI = true
} else {
  P.fileAPI = false
}

/*-----------------------*/
// 開発モードか
/*-----------------------*/
if (document.URL.indexOf('toshick.com') === -1) {
  P.isDev = true
} else {
  P.isDev = false
}

/*-----------------------*/
// webアプリモードかどうか
/*-----------------------*/
P.isStandalone = window.navigator.standalone

/*-----------------------*/
// cssアニメ終了イベント
/*-----------------------*/
// P.cssAnimationEnd = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd'
P.cssTransitionEnd = 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend'

/* -----------------------*/
// モバイルサイズかどうか
/* -----------------------*/
P.isMobileNow = function() {
  if (!$win) $win = $(window)

  if ($win.width() <= 640) {
    return true
  }
  return false
}

/*-----------------------*/
// scrolltop
/*-----------------------*/
P.scrolltop = function($target, pos) {

  if (!$target) {
    $target = $('html,body')
  }
  if (!pos) {
    pos = 0
  }
  $target.stop(true, true).animate({
    scrollTop: pos
  }, 1000, 'easeInOutCubic')
}

/*-----------------------*/
// フルパスに変換
/*-----------------------*/
P.fullpath = function(url) {

  url = $('<a/>').attr('href', url).get(0).href
  url = url.replace(/([^:])\/\//g, '$1/')

  return url
}

/*-----------------------*/
// notice
/*-----------------------*/
// P.notice = function(str, autoclose, duration) {
//   var me = this

//   var notice = new Notice({
//     autoclose: autoclose,
//     duration: duration,
//     util: this,
//     str: str
//   })

//   return notice.open()

// }

/*-----------------------*/
// showLoading
/*-----------------------*/
P.showLoading = function(flg) {
  var dfd = $.Deferred()

  if (flg) {
    if ($overlay) return
    $overlay = this.node('overlay').appendTo($body)
    $overlay.activity({
      length: 4,
      width: 2,
      color: '#FFF'
    })

    dfd.resolve()

  } else {

    if (!$overlay) return

    /*-----------------------*/
    // velocity
    /*-----------------------*/
    $overlay.velocity({
      opacity: 0
    }, {
      duration: 400,
      complete: function() {
        $overlay.activity(false)
        $overlay.remove()
        $overlay = null
        dfd.resolve()
      }
    })
  }
  return dfd.promise()
}

/* -----------------------*/
// tmpl
/* -----------------------*/
P.tmpl = function(id) {

  if (id.indexOf('#') === -1) {
    id = '#' + id
  }
  //キャッシュされていればそれを返却
  if (this.tmpl && this.tmpl[id]) return this.tmpl[id].clone()

  var str = $(id).html()
  if (!str) {
    console.warn('tmplエラー id:' + id + ' みつからない')
  }
  str = str.replace(/<!\-\-.+?\-\->/g, '')

  if (!this.tmpl) this.tmpl = {}

  this.tmpl[id] = $(str)

  return this.tmpl[id].clone()
}

/* -----------------------*/
// btnを生成する
/* -----------------------*/
P.btn = function(label, klass) {

  var $btn = $('<a href="javascript:void(0)" class="btn">')
  $btn.append(label)
  if (klass) {
    $btn.addClass(klass)
  }
  return $btn
}

/* -----------------------*/
// ul
/* -----------------------*/
P.ul = function(klass) {

  return this.node(klass, 'ul')
}

/* -----------------------*/
// li
/* -----------------------*/
P.li = function(klass) {

  return this.node(klass, 'li')
}

/* -----------------------*/
// img
/* -----------------------*/
P.img = function(klass, url) {

  var $img = $('<img/>')
  if (klass) $img.addClass(klass)
  if (url) $img.attr('src', url)
  return $img
}

/* -----------------------*/
// div
/* -----------------------*/
P.div = function(attr) {
  return this.node(attr)
}

/* -----------------------*/
// p
/* -----------------------*/
P.p = function(attr) {
  return this.node(attr, 'p')
}

/* -----------------------*/
// nodeを生成する
/* -----------------------*/
P.node = function(attr, type) {

  if (!attr) attr = ''

  var $ret = null
  if (type) {
    $ret = $('<' + type + '/>')
  } else {
    $ret = $('<div/>')
  }

  if (attr.indexOf('#') != -1) {
    $ret.attr('id', attr.replace('#', ''))
  } else {
    $ret.addClass(attr)
  }

  return $ret
}

/*--------------------
    tooltip
-------------------- */
// P.tooltip = function($target, param, callback) {

//   var tooltip = new ToolTip({
//     $target: $target,
//     str: param.str,
//     delay: param.delay,
//     duration: param.duration,
//     marginX: param.marginX,
//     marginY: param.marginY
//   })

//   tooltip.on('removed', function() {
//     tooltip = null
//     if (callback) callback()
//   })
// }

/* ------------------- */
// 初期化ローディングを解除
/* ------------------- */
P.hideInitLoading = function(callback) {

  var $initloading = $('#initloading')
  if ($initloading.length === 0) {
    if (callback) callback()
    return
  }

  $initloading.fadeOut('fast', function() {

    $initloading.remove()
    $initloading = null
    if (callback) callback()
  })
}

/* ------------------- */
// 全体カバーローディング
/* ------------------- */
P.showCoverLoading = function(flg, callback) {
  var me = this
  if (flg) {
    if (me.$cover) {
      if (callback) callback()
      return
    }
    me.$cover = $('<div id="coverloading"/>').appendTo($('body'))
    me.$cover.on('touchstart', function() {
      return false
    })

    me.$cover.activity({
      length: 4,
      width: 2,
      color: '#FFF'
    })

    if (callback) callback()

  } else {
    if (!me.$cover) {
      if (callback) callback()
      return
    }

    me.$cover.fadeOut('fast', function() {
      me.$cover.activity(false)
      me.$cover.remove()
      me.$cover = null
      if (callback) callback()
    })
  }
}

/* ------------------------------------------
    IF
------------------------------------------ */
P.IF = function(url, param, callback) {

  $.ajax({
    type: 'POST',
    url: url,
    data: param,
    success: function(data, dataType) {
      if (callback) callback(data)
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //console.log('エラー' + textStatus)

      if (callback) callback(null, textStatus, errorThrown)
    }
  })

}

/**
 * ローカルストレージをリセット
 */
P.resetLS = function() {
  if (!store.enabled) {
    console.warn('ローカルストレージが使えません')
    return
  }
  store.clear()
}

/**
 * ローカルストレージ
 *
 * @param {Object} data
 */
P.LS = function(key, data) {

  if (!store.enabled) {
    console.warn('ローカルストレージが使えません')
    return
  }

  if (data) {
    store.set(key, data)
  } else if (data === '') {
    store.remove(key)
  } else {
    return store.get(key)
  }
  return null
}

/* ------------------------------------------
    ディ-プコピ-
------------------------------------------ */
P.deepCopy = function(obj) {
  return $.extend(true, {}, obj)
}

/* ------------------------------------------
    イメージをロ-ドしよう
------------------------------------------ */
P.loadImg = function(url, callback) {

  if (!url) return

  var imageObj = new Image()
  imageObj.onload = function() {
    if (callback) callback(imageObj)
  }
  imageObj.src = url
}

/* ------------------------------------------
    オブジェクトをコピ-
------------------------------------------ */
P.cloneObj = function(obj, deep) {

  if (deep) {
    return $.extend(true, {}, obj)
  } else {
    return $.extend({}, obj)
  }
}

/* ------------------------------------------
    dump
------------------------------------------ */
P.dump = function(data) {
  var str = ''
  for (var item in data) {
    str += item + '：' + data[item] + '\n'
  }
  console.log(str)
}

/*---------------------------------------
    getYobi_JP
--------------------------------------- */
P.getYobi_JP = function(num) {
  var yobiNameList = ['日', '月', '火', '水', '木', '金', '土']
  return yobiNameList[num]
}

/* ------------------------------------------
    makeDate
    「2016-03-13T12:16:36+0000」などのフォーマットの場合
    iphoneだと-があるとnew Dateに失敗するため、
    分割してnew Dateする
------------------------------------------ */
P.makeDate = function(time_str) {
  var tmp = time_str.split(/[- :T\+]/)
  return new Date(tmp[0], tmp[1] - 1, tmp[2], tmp[3], tmp[4], tmp[5])

}

/* ------------------------------------------
    今日のストリングを取得
------------------------------------------ */
P.getYMD = function(splitstr, dateObj) {
  if (!splitstr) splitstr = ''
  var d = (dateObj) ? dateObj : new Date()
  var datestr = d.getFullYear() + splitstr + (d.getMonth() + 1).keta(2) + splitstr + d.getDate().keta(2)
  return datestr
}

/* ------------------------------------------
    現在の日付ストリングを取得
------------------------------------------ */
P.getNowStrYMDM = function(splitstr) {
  if (!splitstr) splitstr = ''
  var d = new Date()
  var datestr = d.getFullYear() + splitstr + (d.getMonth() + 1).keta(2) + d.getDate().keta(2) + splitstr + d.getHours().keta(2) + d.getMinutes().keta(2)
  return datestr
}

/* ------------------------------------------
    現在の日付ストリングを取得
------------------------------------------ */
P.getDateStrFromDateYMDM = function(date, splitstr) {
  if (!splitstr) splitstr = ''
  var d = date
  var datestr = d.getFullYear() + splitstr + (d.getMonth() + 1).keta(2) + d.getDate().keta(2) + splitstr + d.getHours().keta(2) + d.getMinutes().keta(2)
  return datestr
}

/* ------------------------------------------
    日付ストリングからDateオブジェクトを取得
    例 20140623
------------------------------------------ */
P.getDateFromStr = function(datestr, splitstr) {

  if (!splitstr) splitstr = ''
  var d = new Date(datestr.slice(0, 4) + '/' + datestr.slice(4, 6) + '/' + datestr.slice(6, 8))

  return d
}

/* ------------------------------------------
    日付のストリングから日付のナンバ-を取得
------------------------------------------ */
P.getDateNumFromDateStr = function(str) {

  return this.replaceAll('/', '', str)
}

/* ------------------------------------------
    日付のストリング ドットタイプ
------------------------------------------ */
P.getDateStr_typeDot = function(str) {

  str = this.replaceAll('/', '.', str)
  str = this.replaceAll('_', '.', str)
  return str
}

/* ------------------------------------------
    日付のストリング 指定ストリングで分割
------------------------------------------ */
P.getDateStrWithSplit = function(datestr, split) {

  if (datestr.length !== 8) return datestr
  if (!split) split = ''
  var str = datestr.replace('[^0-9]', '')
  str = datestr.slice(0, 4) + split + datestr.slice(4, 6) + split + datestr.slice(6, 8)
  return str
}

/**
 * getDateDataFormMS
 * ミリセカンドから日付データオブジェクトを返却
 *
 * @param {int} miriSecond
 */
P.getDateDataFromMS = function(miriSecond) {
  var me = this

  var retObj = {}
  var dObj = new Date()
  dObj.setTime(miriSecond)
  retObj.y = dObj.getFullYear()
  retObj.m = dObj.getMonth() + 1
  retObj.d = dObj.getDate()
  retObj.day = dObj.getDay()
  retObj.miriSecond = miriSecond

  retObj.datestr = retObj.y + retObj.m.keta(2) + retObj.d.keta(2)

  return retObj
}

/**
 * getDateDataFromStr
 * 日付データオブジェクトを返却
 *
 * @param {Stirng} datestr 日付のストリング 20130401
 */
P.getDateDataFromStr = function(datestr) {
  var me = this

  var ms = (new Date(me.getDateStrWithSplit(datestr, '/')).getTime())
  return me.getDateDataFromMS(ms)
}

/**
 * 20151103_17:04:15 などの日付ストリングを表示用に変換
 */
P.dateFromToshickCom = function(datestr) {
  var me = this
  if (!datestr || datestr.indexOf('_') === -1) return ''
  var ret = ''
  var tmp = datestr.split('_')
  var str1 = tmp[0]
  var str2 = tmp[1]
  var y = +str1.slice(0, 4)
  var m = +str1.slice(4, 6) - 1
  var d = +str1.slice(6, 8)
  var hour = +str2.slice(0, 2)
  var minute = +str2.slice(3, 5)
  var second = +str2.slice(6, 8)
    //console.log('月',m)
    //console.log('hour', hour, 'minute', minute, 'second', second)
  var myd = new Date(y, m, d, hour, minute, second)
    //console.log('myd', datestr, myd)
  return myd
}

/* ------------------------------------------
    strWithBR
------------------------------------------ */
P.strWithBR = function(str) {

  if (str) str = str.split('\n').join('<br />')

  //txt = txt.split('&amplt').join('<')
  //txt = txt.split('&ampgt').join('>')

  return str
}

/* ------------------------------------------
    strWithNOBR
------------------------------------------ */
P.strWithNOBR = function(str) {

  var txt = ''
  if (str.indexOf('<br />') != -1) {
    txt = str.split('<br />').join('\n')

  } else if (str.indexOf('<br>') != -1) {
    txt = str.split('<br>').join('\n')

  } else {
    txt = str
  }

  //txt = txt.split('<').join('&amplt')
  //txt = txt.split('>').join('&ampgt')

  return txt
}

/* ------------------------------------------
 クエリ-をオブジェクトとして取得
------------------------------------------ */
P.getQueryObj = function(url) {

  var obj = {}
  var tmp
  url = (url) ? url : document.URL
  var query = url.split('?')[1]
  if (!query) return obj

  if (query.indexOf('&') == -1) {
    tmp = query.split('=')
    obj[tmp[0]] = tmp[1]
  } else {

    var ary = query.split('&')

    for (var i = 0; i < ary.length; i++) {
      tmp = ary[i].split('=')
      var key = tmp[0]
      var value = tmp[1]
      obj[key] = value
    }

  }
  return obj
}

/* ------------------------------------------
    getUnixTime
------------------------------------------ */
P.getUnixTime = function() {
  return ~~(new Date / 1000)
}

/* -------------------
    保存してある時間ストリングからmsを算出
    例：2014_0714_2045
    ------------------- */
P.ms_fromstr = function(timestr) {

  var me = this

  var tmp = timestr.split('_')
  var year = parseInt(tmp[0], 10)
  var month = parseInt(tmp[1].slice(0, 2), 10) - 1
  var date = parseInt(tmp[1].slice(2, 4), 10)
  var hour = parseInt(tmp[2].slice(0, 2), 10)
  var min = parseInt(tmp[2].slice(2, 4), 10)
  var mydate = new Date(year, month, date, hour, min)

  return mydate.getTime()
}

/* ------------------------------------------
    makeDebugBtn
------------------------------------------ */
P.makeDebugBtn = function() {

  var $btn = this.btn('かいはつ').appendTo($('body'))
  $btn.css({
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '4px',
    'background': '#FFF',
    'border': 'solid 1px #FF0000'
  })
  return $btn

}

/* ------------------------------------------
    fadeIn
------------------------------------------ */
P.fadeIn = function(el, callback) {

  el.velocity({
    opacity: 1
  }, {
    duration: 400,
    complete: function() {
      if (callback) callback()
    }
  })

  // $.velocity([{
  //   el: el,
  //   option: {
  //     duration: 400
  //   },
  //   property: {
  //     opacity: 1
  //   }
  // }], function() {

  //   if (callback) callback()
  // })
}

/* ------------------------------------------
    fadeOut
------------------------------------------ */
P.fadeOut = function(el, callback) {

  el.velocity({
    opacity: 0
  }, {
    duration: 400,
    complete: function() {
      if (callback) callback()
    }
  })

}

/*-------------------------

    $.fn.extend

------------------------*/
$.fn.extend({
  /* -----------------------*/
  // isVisible
  /* -----------------------*/
  isVisible: function() {

    return (this.css('display') !== 'none')

  },

  /* -----------------------*/
  // スマホ用クリック
  //
  /* -----------------------*/
  onSpClick: function($itemOrCallback, callback, preventtap, preventdefault) {

    var me = this
      //明示的にtrueでない場合、連続タップ可能
    if (preventtap !== true) {
      preventtap = false
    }
    //明示的にfalseでない場合、バブリング禁止
    if (preventdefault !== false) {
      preventdefault = true
    }
    if (typeof callback === 'boolean') {
      preventtap = callback
    }

    var $target = $itemOrCallback
    if (typeof $itemOrCallback === 'function') {
      callback = $itemOrCallback
      $target = null
    }

    var movieVal = 3

    this.touchStartX = 0
    this.touchStartY = 0
    this.touchMoveX = 0
    this.touchMoveY = 0
    this.on({
      'touchstart': function(e) {

        var $self = $(e.currentTarget)

        $self.data('isTouch', true)
          // console.log('タッチ開始')

        var touches = e.originalEvent.touches[0]

        $self.data('touchStartX', touches.pageX)
        $self.data('touchStartY', touches.pageY)
        $self.data('touchMoveX', 0)
        $self.data('touchMoveY', 0)

        $self.addClass('hover')

        //タッチが可能な場合はクリックはオフ
        me.off('click')
          // return false
      },
      'touchmove': function(e) {

        var $self = $(e.currentTarget)
        var touches = e.originalEvent.changedTouches[0]
        var touchMoveX = touches.pageX
        var touchMoveY = touches.pageY
        var touchStartX = $self.data('touchStartX')
        var touchStartY = $self.data('touchStartY')
        $self.data('touchMoveX', touchMoveX)
        $self.data('touchMoveY', touchMoveY)

        var moviedX = Math.abs(touchMoveX - touchStartX)
        var moviedY = Math.abs(touchMoveY - touchStartY)

        if (moviedX > movieVal || moviedY > movieVal) {

          $self.data('isTouch', false)
          $self.removeClass('hover')
            // console.log('タッチキャンセル  moviedX:', moviedX, 'moviedY', moviedY)
        }
      },
      'touchend': function(e) {

        var $self = $(e.currentTarget)
        $self.removeClass('hover')

        if ($self.data('isTouch')) {

          if (preventtap) {
            $self.addClass('preventtap') //連続タップ禁止
          }
          callback = $.proxy(callback, e.currentTarget)
          if (callback) callback(e.currentTarget)

          if (preventdefault) {
            return false
          }

        } else {
          // alert('isTouchがないよ')
        }

        $self.data('isTouch', false)

      },
      'mouseover': function(e) {
        var $self = $(e.currentTarget)
        $self.addClass('hover')
      },
      'mouseout': function(e) {
        var $self = $(e.currentTarget)
        $self.removeClass('hover')
      },
      'click': function(e) {
        var $self = $(e.currentTarget)

        // $self.addClass('hover')

        if (preventtap) {
          $self.addClass('preventtap') //連続タップ禁止
        }
        callback = $.proxy(callback, e.currentTarget)
        if (callback) callback(this)

        if (preventdefault) {
          return false
        }
        // return false
      }
    }, $target)

    return this

  },

  /*-----------------------*/
  // スマホ用クリック解除
  /*-----------------------*/
  offSpClick: function(target) {

    if (!target) target = null

    this.off('touchstart', target)
    this.off('touchmove', target)
    this.off('touchend', target)
    this.off('click', target)
    this.off()

    return this
  },

})

exports.util = new Util()

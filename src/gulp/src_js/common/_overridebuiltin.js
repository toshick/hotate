'use strict'

/*-----------------------*/
// ビルトインクラスを拡張
/*-----------------------*/
;(function() {

  var Ar = Array.prototype
  var St = String.prototype
  var Nm = Number.prototype

  /* ------------------------------------------
  配列にシャッフル機能を追加
  ------------------------------------------ */
  Ar.shuffle = function() {
    var i = this.length
    while (i) {
      var j = Math.floor(Math.random() * i)
      var t = this[--i]
      this[i] = this[j]
      this[j] = t
    }
    return this
  }

  /* ------------------------------------------
  配列にユニ-ク機能を追加
  ------------------------------------------ */
  Ar.unique = function() {
    var storage = {}
    var uniqueArray = []
    var i, value, l
    for (i = 0, l = this.length; i < l; i++) {
      value = this[i]
      if (!(value in storage)) {
        storage[value] = true
        uniqueArray.push(value)
      }
    }
    return uniqueArray

  }

  /* ------------------------------------------
  連想配列をキーでソート
  ------------------------------------------ */
  Ar.asort = function(key) {

    var ary = this.concat()
    ary.sort(function(b1, b2) {
      return b1[key] > b2[key] ? 1 : -1
    })

    return ary

  }

  /* ------------------------------------------
  トリム
  ------------------------------------------ */
  if (!String.prototype.trim) {
    St.trim = function() {
      return this.replace(/^\s+|\s+$/g, '')
    }
  }

  /* ------------------------------------------
  ナンバーへ変換
  ------------------------------------------ */
  St.toInt = function() {

    var str = this + ''
    return parseInt(str, 10)
  }

  /* ------------------------------------------
   存在するか
  ------------------------------------------ */
  St.strExist = function(find) {

    var str = this + ''
    if (String(str).indexOf(find) == -1) return false

    return true
  }

  /* ------------------------------------------
   全部置換
  ------------------------------------------ */
  St.replaceAll = function(find, newstr) {

    var str = this + ''
    if (String(str).indexOf(find) == -1) return str
    var tmp = str.split(find)
    str = tmp.join(newstr)
    return str
  }

  /* ------------------------------------------
  桁をそろえる
  ------------------------------------------ */
  St.keta = function(ketanum) {

    var str = this + ''
    while (str.length < ketanum) {
      str = '0' + str
    }
    return str
  }

  /* ------------------------------------------
  HTMLに吐き出すときのエスケ-プ処理を入れよう
  ------------------------------------------ */
  St.htmlEscape = function() {

    var str = this + ''

    str = str.replaceAll('</script>', '')
    str = str.replaceAll('<', '&lt')
    str = str.replaceAll('>', '&gt')
    str = str.replaceAll('\'', '&quot')
    str = str.replaceAll('\\', '&#39')
    str = str.replaceAll('\'', '&apos')
    str = str.replaceAll('\'', '&quot')

    return str
  }

  /* ------------------------------------------
  エスケ-プしてから改行を変換だ
  ------------------------------------------ */
  St.strFromHTML = function() {

    var str = this + ''
    str = str.noBR()
    str = str.htmlEscape()

    return str
  }

  /*-----------------------*/
  // エスケ-プしてから改行を変換だ
  /*-----------------------*/
  St.strToHTML = function() {
    var str = this + ''

    str = str.htmlEscape()
    str = str.withBR()

    return str
  }

  /* ------------------------------------------
  改行削除
  ------------------------------------------ */
  St.delKaigyo = function() {

    var str = this + ''
    str = str.replace(/\r\n|\r|\n/gi, '<br>')

    return str
  }

  /*---------------------------------------
  basename
  --------------------------------------- */
  St.basename = function() {
    var str = this + ''
    var tmp = str.split('/')
    var name = tmp[tmp.length - 1]
    return name
  }

  /*---------------------------------------
  dirname
  --------------------------------------- */
  St.dirname = function() {
    var str = this + ''
    var tmp = str.split('/')
    tmp.pop()
    return tmp.join('/')
  }

  /*---------------------------------------
  removeDomain
  --------------------------------------- */
  St.removeDomain = function() {

    return this.replace(/http.+?\/.+?\/(.+)/, '/$1')
  }

  /* ------------------------------------------
  brを改行に変換
  ------------------------------------------ */
  St.noBR = function() {

    var str = this + ''
    str = str.split('<br>').join('\n')
    return str
  }

  /* ------------------------------------------
  改行をbrに変換
  ------------------------------------------ */
  St.withBR = function() {

    var str = this + ''
    str = str.split('\n').join('<br>')
    return str
  }

  /* ------------------------------------------
  整数に変換
  ------------------------------------------ */
  St.int = function() {
    return parseInt(this, 10)
  }

  /* ------------------------------------------
  桁をそろえてストリングに変換
  ------------------------------------------ */
  Nm.keta = function(ketanum) {

    var str = this + ''
    while (str.length < ketanum) {
      str = '0' + str
    }
    return str
  }

  /* ------------------------------------------
  ラジアンに変換
  ------------------------------------------ */
  Nm.radian = function() {

    return this * Math.PI / 180
  }

  /* ------------------------------------------
   ナンバーへ変換
  （ナンバーオブジェクトにかけてもエラーにならないようにする）
  ------------------------------------------ */
  Nm.int = function() {
    return this + 0
  }
})()
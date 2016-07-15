var sqlite3 = require('sqlite3').verbose()

var path = require('path')
var url = path.resolve(path.join(__dirname, '../../../laravel_moricho/database/database.sqlite'))
var db = new sqlite3.Database(url)


console.log(process.argv)
var tblname = process.argv[2]
if(!tblname){
  console.log('テーブル名が不明です')
  return
}



// serialize関数を使うと、
// それぞれの行が実行されたら、次の行が実行される。
// parallel関数を用いることで、平行実行もできる。
db.serialize(function() {

  // テーブルを作成する。
  // db.run("CREATE TABLE team (info TEXT)")

  // データを登録する。
  // var stmt = db.prepare("INSERT INTO team VALUES (?)")
  // for (var i = 0 i < 10 i++)
  //   stmt.run("team " + i)
  // stmt.finalize()

  // データを更新する。
  // var stmt2 = db.prepare("UPDATE team SET info = ? WHERE info = ?")
  // for (var i = 0 i < 10 i+=3)
  //   stmt2.run("team 10" + i, "team " + i)
  // stmt2.finalize()

  //参照する。
  // 参照用関数は他にもあるが、今回は取得したものを1件ずつ扱うeach関数を利用する。
  // 引数(row)のプロパティに、SELECT句で指定した要素があるので、
  // たとえば「row.info」といったアクセスで値を取り出せる。
  // db.each("SELECT rowid AS id, info FROM team", function (err, row) {
  //   console.log(row.id + " : " + row.info)
  // })

  //コンソールをクリア
  // console.clear()

  // var tbls = ['users','post', 'postcomment', 'event', 'eventpost', 'event_post', 'good']
  // var tbls = ['point']
  // var tbls = ['userq']
  // var tbls = ['inform']
  var tbls = [tblname]
  
  // var tbls = ['event']
  tbls.forEach(function(tbl) {
    //カラム情報を出力
    var colums = []
    db.each('PRAGMA table_info('+tbl+')', function(err, row) {
      // console.log(row.name)
      colums.push(row.name)
    }, function(err, count) {

      printValidation(tbl, colums)
      printUpdateQuery(tbl, colums)
    })

  })

})

/*-----------------------*/
// ララベルのバリデーション用
/*-----------------------*/
function printValidation(tbl, colums) {

  console.log('\nララベルのバリデーション用（'+tbl+'）')
  console.log('  $validator = Validator::make($p, [')
  colums.forEach(function(d) {
    if(d === 'id') return
    if(d === 'created_at') return
    if(d === 'updated_at') return
      
    console.log('    "' + d + '" => "",')
  })
  console.log('  ])')
}
/*-----------------------*/
// ララベルのテーブル更新用
/*-----------------------*/
function printUpdateQuery(tbl, colums) {

  console.log('\nララベルのテーブル更新用（'+tbl+'）')
  colums.forEach(function(d) {
    if(d === 'id') return
    if(d === 'created_at') return
    if(d === 'updated_at') return

    console.log('  if ($object->'+d+' !== null) {')
    console.log('    $this->'+d+' = $object->'+d+';')
    console.log('  }')
  })

      
    
}

// DBを閉じる。
db.close()

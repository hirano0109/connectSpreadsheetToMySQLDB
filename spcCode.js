//スクリプトエディタ
function connectToMySQL() {
  var conn = Jdbc.getConnection("jdbc:mysql://host/database", "user", "password");
  return conn;
}

// MySQLとスプレッドシートを接続する
function getDataFromMySQL() {
  var conn = connectToMySQL();
  var stmt = conn.createStatement();
  var results = stmt.executeQuery("SELECT * FROM tablename");
  var metaData = results.getMetaData();
  var numCols = metaData.getColumnCount();

  var sheet = SpreadsheetApp.getActive().getSheetByName("Sheet1");
  var cell = sheet.getRange("A1");

  var headers = [];
  for (var i = 1; i <= numCols; i++) {
    headers.push(metaData.getColumnName(i));
  }
  cell.offset(0, 0, 1, headers.length).setValues([headers]);

  var rows = [];
  while (results.next()) {
    var row = [];
    for (var i = 1; i <= numCols; i++) {
      row.push(results.getString(i));
    }
    rows.push(row);
  }
  cell.offset(1, 0, rows.length, numCols).setValues(rows);

  results.close();
  stmt.close();
  conn.close();
}


//other
function getDataFromMySQL() {
  // 接続情報を設定する
  var connection = Jdbc.getConnection("jdbc:mysql://ホスト名/データベース名", "ユーザー名", "パスワード");

  // クエリを実行する
  var query = "SELECT * FROM テーブル名";
  var stmt = connection.createStatement();
  var results = stmt.executeQuery(query);

  // スプレッドシートに書き込む
  var sheet = SpreadsheetApp.getActive().getSheetByName("Sheet1");
  var numRows = sheet.getLastRow();
  var numCols = sheet.getLastColumn();
  var row = [];
  while (results.next()) {
    for (var i = 1; i <= numCols; i++) {
      row.push(results.getString(i));
    }
    sheet.appendRow(row);
    row = [];
  }

  // 接続を閉じる
  results.close();
  stmt.close();
  connection.close();
}

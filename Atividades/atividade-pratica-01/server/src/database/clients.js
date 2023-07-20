var mysql = require('mysql');

var con = mysql.createConnection({
  host: "br686.hostgator.com.br",
  user: "donac936_rafael",
  password: "Brasil2014",
  database: "donac936_testeRafael"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var express = require("express");
var router = express.Router();
var connection = require("../database.js");
require("dotenv").config();

var sql = require("mssql");
var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("SELECT TOP 10 * FROM QB_Vch_header", function (err, recordset) {
      if (err) {
        req.flash("error", err);
        res.render("datas", { quickData: '' });
      } else {
        res.send(recordset);
        // var jstr = JSON.stringify(recordset)
        // console.log(jstr);
        // res.render("datas", { quickData: recordset.recordset });
      }
    });
  });
});

module.exports = router;

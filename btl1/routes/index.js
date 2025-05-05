var express = require('express');
var router = express.Router();
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'long2811@',
  database: 'hoctienganhonline1'
})
connection.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from hoc_vien', (err, rows, fields) => {
      if (err) throw err
      res.json({data:rows});
    })
    
    connection.end()
    
});

module.exports = router;

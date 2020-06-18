const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maupiti1!',
  database: 'homer'
});

module.exports = connection;
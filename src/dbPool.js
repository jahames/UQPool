const sql = require('mysql')

var pool = sql.createPool({
connectionLimit : 100,
host: 'local',
user : 'root',
password : 'test',
database : 'dbPool'
});

module.exports = pool;

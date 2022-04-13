const sql = require('mysql2')

var pool = sql.createPool({
	connectionLimit: 100,
	host: "localhost",
	user: "root",
	password: "WilsonLOVE",
	database: "UQPool",
	multipleStatements: true,
});

module.exports = pool;

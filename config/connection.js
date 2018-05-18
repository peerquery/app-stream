
'use strict'

var mysql = require('mysql');
var dotvenv = require('dotenv').config();

var pool = mysql.createPool({
	connectionLimit: process.env.DB_CONNECTIONLIMIT,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	multipleStatements: process.env.DB_MULTIPLESTATEMENETS
});

module.exports = pool;

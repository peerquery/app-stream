
'use strict'

var util = require('util');
var dotvenv = require('dotenv').config();
var pool = require('./../config/connection');
var db_creator = require('./../sql/db-creator');
var sp_creator = require('./../sql/sp-creator');

pool.query = util.promisify(pool.query) // Magic happens here.

	
module.exports = async function (app) {
	
	console.log("  * db manager initiated");
	
	try {
		//create tables if they do not already exist
		await pool.query(db_creator.create_db).then(results => {
			console.log("    > db tables and views ready");
		});
	} catch(err) {
		if (err) { console.log(err.message); return };
	}
	
	
		
	try {
		//drop if exist; create the sp for engines
		await pool.query(sp_creator.engine_sp).then(results => {
			console.log("    > engine procedures ready");
		});
	} catch(err) {
		if (err) { console.log(err.message); return };
	}
	
		
	try {
		//drop if exist; create sp for apis
		await pool.query(sp_creator.api_sp).then(results => {
			console.log("    > api procedures ready");
		});
	} catch(err) {
		if (err) { console.log(err.message); return };
	}
	
	return 'OK';
	
};

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = async function(app) {


//return post by author
	
app.get('/api/filter/author/:author', async (req, res) => {
	
	try {
		var data = req.params.author;
		
		var sql = "CALL filter_by_author(?)";
		
		var results = await pool.query(sql, data);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//return posts by category
	
app.get('/api/filter/category/:category', async (req, res) => {
	
	try {
		var data = req.params.category;
		
		var sql = "CALL filter_by_category(?)";
		
		var results = await pool.query(sql, data);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


}


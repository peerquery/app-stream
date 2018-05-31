

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = async function(app) {


//count posts for ? days
	
app.get('/api/stats/count/posts/:days', async (req, res) => {
	
	try {
		var days = req.params.days;
		
		if (days > 100) days = 100;
		
		var sql = "CALL count_posts(?)";
		
		var results = await pool.query(sql, days);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//count comments for ? days
	
app.get('/api/stats/count/comments/:days', async (req, res) => {
	
	try {
		var days = req.params.days;
		
		if (days > 100) days = 100;
		
		var sql = "CALL count_comments(?)";
		
		var results = await pool.query(sql, days);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//count comments and replies for ? days
	
app.get('/api/stats/count/replies/:days', async (req, res) => {
	
	try {
		var days = req.params.days;
		
		if (days > 100) days = 100;
		
		var sql = "CALL count_replies(?)";
		
		var results = await pool.query(sql, days);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


}


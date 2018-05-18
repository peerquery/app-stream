

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = function(app) {


//count posts for ? days
	
app.get('/api/stats/count/posts/:days', (req, res) => {
	
	try {
		var days = req.params.days;
		
		if (days > 100) days = 100;
		
		var sql = "CALL count_posts(?)";
		
		pool.query(sql, days, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}
	
})


//count comments for ? days
	
app.get('/api/stats/count/comments/:days', (req, res) => {
	
	try {
		var days = req.params.days;
		
		if (days > 100) days = 100;
		
		var sql = "CALL count_comments(?)";
		
		pool.query(sql, days, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}
	
})


//count comments and replies for ? days
	
app.get('/api/stats/count/replies/:days', (req, res) => {
	
	try {
		var days = req.params.days;
		
		if (days > 100) days = 100;
		
		var sql = "CALL count_replies(?)";
		
		pool.query(sql, days, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}
	
})


}


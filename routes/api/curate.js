

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = function(app) {
	
//fetch latest ? posts
	
app.get('/api/curate/:num', (req, res) => {
	
try {
		var num = req.params.num;
		
		if (num > 100) num = 100;
		
		var sql = "CALL curate(?)";
		
		pool.query(sql, num, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}

})


//fetch latest ? comments
	
app.get('/api/curate/comments/:num', (req, res) => {
	
try {
		var num = req.params.num;
		
		if (num > 100) num = 100;
		
		var sql = "CALL curate_comments(?)";
		
		pool.query(sql, num, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}

})


//fetch latest ? comments and replies
	
app.get('/api/curate/replies/:num', (req, res) => {
	
try {
		var num = req.params.num;
		
		if (num > 100) num = 100;
		
		var sql = "CALL curate_replies(?)";
		
		pool.query(sql, num, function (error, results, fields) {
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


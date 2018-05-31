

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = async function(app) {
	
//fetch latest ? posts
	
app.get('/api/curate/:num', async (req, res) => {
	
	try {
		var num = req.params.num;
		
		if (num > 100) num = 100;
		
		var sql = "CALL curate(?)";
		
		var results = await pool.query(sql, num);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}

})


//fetch latest ? comments
	
app.get('/api/curate/comments/:num', async (req, res) => {
	
	try {
		var num = req.params.num;
		
		if (num > 100) num = 100;
		
		var sql = "CALL curate_comments(?)";
		
		var results = await pool.query(sql, num);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}

})


//fetch latest ? comments and replies
	
app.get('/api/curate/replies/:num', async (req, res) => {
	
	try {
		var num = req.params.num;
		
		if (num > 100) num = 100;
		
		var sql = "CALL curate_replies(?)";
		
		var results = await pool.query(sql, num);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}

})



}


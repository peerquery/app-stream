

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = async function(app) {


//check if url is comment or post

app.get('/api/fetch/type/@:author/:permlink', async (req, res) => {
	
	try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL url_type(?, @type)";
		
		var results = await pool.query(sql, url);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//fetch content(post or comment) of url

app.get('/api/fetch/@:author/:permlink', async (req, res) => {
	
	try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL fetch_url(?)";
		
		var results = await pool.query(sql, url);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//fetch content for post by url

app.get('/api/fetch/post/@:author/:permlink', async (req, res) => {
	
	try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL fetch_post(?)";
		
		var results = await pool.query(sql, url);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//fetch content for comment by url

app.get('/api/fetch/comment/@:author/:permlink', async (req, res) => {
	
	try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL fetch_comment(?)";
		
		var results = await pool.query(sql, url);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})



}




'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = function(app) {


//check if url is comment or post

app.get('/api/fetch/type/@:author/:permlink', (req, res) => {
	
try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL url_type(?, @type)";
		
		pool.query(sql, url, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}
	
})


//fetch content(post or comment) of url

app.get('/api/fetch/@:author/:permlink', (req, res) => {
	
try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL fetch_url(?)";
		
		pool.query(sql, url, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}
	
})


//fetch content for post by url

app.get('/api/fetch/post/@:author/:permlink', (req, res) => {
	
try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL fetch_post(?)";
		
		pool.query(sql, url, function (error, results, fields) {
			if (error) { console.log(error.message); return } ;
			res.json(results[0]);
			//console.log('Query successful.');
		});
			
	}
	catch(err) {
		console.log(err.message);
	}
	
})


//fetch content for comment by url

app.get('/api/fetch/comment/@:author/:permlink', (req, res) => {
	
try {
		var url = '/@' + req.params.author + '/' + req.params.permlink;
		
		var sql = "CALL fetch_comment(?)";
		
		pool.query(sql, url, function (error, results, fields) {
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


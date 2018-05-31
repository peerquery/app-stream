
'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');


module.exports = async function(app) {


//find text in post titles
	
app.get('/api/search/title/:text', async (req, res) => {
	
	try {
		var text = req.params.text;
		
		var sql = "CALL search_by_title(?)";
		
		var results = await pool.query(sql, text);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//find all post by author with text in post titles
	
app.get('/api/search/author/:author/:text', async (req, res) => {
	
	try {
		var data = [ req.params.author, req.params.text];
		
		var sql = "CALL search_by_author(?,?)";
		
		var results = await pool.query(sql, data);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//find all posts from category with text in post titles
	
app.get('/api/search/category/:category/:text', async (req, res) => {
	
	try {
		var data = [ req.params.category, req.params.text];
		
		var sql = "CALL search_by_category(?,?)";
		
		var results = await pool.query(sql, data);
			res.json(results[0]);
			//console.log('Query successful.');
			
	}
	catch(err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	
})


//find all posts by an author from a category with text in post titles
	
app.get('/api/search/category/author/:category/:author/:text', async (req, res) => {
	
	try {
		var data = [ req.params.category,  req.params.author, req.params.text];
		
		var sql = "CALL search_by_category_and_author(?,?,?)";
		
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


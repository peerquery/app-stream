

'use strict';

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var pool = require('./../../config/connection');
var config = require('./../../config/config');


module.exports = function(app) {
	
	
//api guide
	
app.get('/api', (req, res) => {
	
	res.status(200).send("Welcome to the api homepage of : <em>" + config.app_name + "</em>. " +
		"Below are the API configurations you might be interested in: <br/>" +
		"------------------------------------------------------------ <br/>" +
		"api_status: " + config.api_state + "<br/>" +
		"api_version: " + config.api_version + "<br/>" +
		"api_mode: " + config.api_mode + "<br/>" +
		"api_guides: " + config.api_guide + "<br/>" +
		"api routes include: <em>/fetch</em>, <em>/stats</em>, <em>/curate</em>, <em>/search</em>, <em>/filter</em>"
		
	);
})


//fetch guide
	
app.get('/api/fetch', (req, res) => {
	
	res.status(200).send("API guide for <em>/fetch</em> route<br/><br/>" +
	"Below are the supported calls for the <em>/fetch</em> API route<br/>" +
	"------------------------------------------------------------ <br/>" +
	"<em>/api/fetch/type/@:author/:permlink</em> - check if <em>url</em> is comment or post <br/>" +
	"<em>/api/fetch/@:author/:permlink</em> - fetch content(post or comment) of <em>url</em> <br/>" +
	"<em>/api/fetch/post/@:author/:permlink</em> - fetch content for post by <em>url</em> <br/>" +
	"<em>/api/fetch/comment/@:author/:permlink</em> - fetch content for comment by <em>url</em> <br/>" +
	"------------------------------------------------------------ <br/>" +
	"*<em>url</em> is the same as /@author/permlink<br/>" +
	"*<em>example: if the following post exist in your DB then you can do:</em> /api/fetch/@dzivenu/introducing-peer-query-steem-powered-queries-quiz-polls-contests-gigs-proposals-and-more<br/>" +
	"*<em>return to main API home page at ./api</em>"
	);
	
})


//curate guide
	
app.get('/api/curate', (req, res) => {
	
	res.status(200).send("API guide for <em>/curate</em> route<br/><br/>" +
	"Below are the supported calls for the <em>/curate</em> API route<br/>" +
	"------------------------------------------------------------ <br/>" +
	"<em>/api/curate/:num</em> - fetch latest ? posts <br/>" +
	"<em>/api/curate/comments/:num</em> - fetch latest ? comments <br/>" +
	"<em>/api/curate/replies/:num</em> - fetch latest ? comments and replies <br/>" +
	"------------------------------------------------------------ <br/>" +
	"*<em>num</em> is number of posts to be returned, maximum is set to 100<br/>" +
	"*<em>example: to get latest 20 posts for curation do: /api/curate/20<br/>" +
	"*<em>return to main API home page at ./api</em>"
	);
	
})


//stats guide
	
app.get('/api/stats', (req, res) => {
	
	res.status(200).send("API guide for <em>/stats</em> route<br/><br/>" +
	"Below are the supported calls for the <em>/stats</em> API route<br/>" +
	"------------------------------------------------------------ <br/>" +
	"<em>/api/stats/count/posts/:days</em> - count posts for ? days <br/>" +
	"<em>/api/stats/count/comments/:days</em> - count comments for ? days <br/>" +
	"<em>/api/stats/count/replies/:days</em> - count comments and replies for ? days <br/>" +
	"------------------------------------------------------------ <br/>" +
	"*<em>days</em> is number of days, maximum is set to 100<br/>" +
	"*<em>example: for count of all posts for the month, do:</em> /api/stats/count/30<br/>" +
	"*<em>return to main API home page at ./api</em>"
	);
	
});


//search guide
	
app.get('/api/search', (req, res) => {
	
	res.status(200).send("API guide for <em>/search</em> route<br/><br/>" +
	"Below are the supported calls for the <em>/search</em> API route<br/>" +
	"------------------------------------------------------------ <br/>" +
	"<em>/api/search/title/:text</em> - find <em>text</em> in post titles<br/>" +
	"<em>/api/search/author/:author/:text</em> - find post by author with <em>text</em> in post titles<br/>" +
	"<em>/api/search/category/:category/:text</em> - find posts from category with <em>text</em> in post titles<br/>" +
	"<em>/api/search/category/author/:category/:author/:text</em> - find posts by an author from a category with target <em>text</em> in post titles<br/>" +
	"------------------------------------------------------------ <br/>" +
	"*<em>text</em> is search term you want to search. Max length should be 512, and max rows returned is 20<br/>" +
	"*<em>example: search for all posts by author @stoodkev in dev category whose title contain 'SteemJS', do:</em> /api/search/category/author/dev/stoodkev/SteemJS<br/>" +
	"*<em>return to main API home page at ./api</em>"
	);
	
})


//filter guide
	
app.get('/api/filter', (req, res) => {
	
	res.status(200).send("API guide for <em>/filter</em> route<br/><br/>" +
	"Below are the supported calls for the <em>/filter</em> API route<br/>" +
	"------------------------------------------------------------ <br/>" +
	"<em>/api/filter/author/:author</em> - return recent posts from this author<br/>" +
	"<em>/api/filter/category/:category</em> - return recent posts from this category<br/>" +
	"------------------------------------------------------------ <br/>" +
	"Max results returns are 20<br/>" +
	"*<em>example: Return (20)recent posts from the author @steemitblog </em> /api/filter/author/steemitdev<br/>" +
	"*<em>return to main API home page at ./api</em>"
	);
	
})


}


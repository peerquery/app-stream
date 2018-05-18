
'use strict'

var cors = function(req, res, next) {
	
	var allowedOrigins = ['lvh.me', 'localhost'];	//be sure to the absolute URL/IP of all sites you expect to use the API here. change to -> allowedOrigins = "*"; to allow all clients
	var origin = req.headers.origin || req.headers.host;
	
	if(allowedOrigins == '*' || allowedOrigins.indexOf(origin) > -1){
		
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	
		// Disable caching so we'll always get fresh results.
		res.setHeader('Cache-Control', 'no-cache');
	
		// Allow cookies over CORS
		res.header('Access-Control-Allow-Credentials', true);
	
		return next();
	
	} else {
		
		res.header('Access-Control-Allow-Origin', allowedOrigins[0]);
		res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	
		// Disable caching so we'll always get fresh results.
		res.setHeader('Cache-Control', 'no-cache');
	
		// Allow cookies over CORS
		res.header('Access-Control-Allow-Credentials', true);
	
		res.sendStatus(403);
		
	}
	
}

/*

//this is the absolutely unrestricted version to grant all types of access to all types of origins - for advanced use only. edit as use as fit after deleting the above version

var cors = function(req, res, next) {

	var cors = function(req, res, next) {
	
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH');
		res.header('Access-Control-Allow-Headers', 'origin, x-http-method-override, accept, content-type, authorization, x-pingother, if-match, if-modified-since, if-none-match, if-unmodified-since, x-requested-with');
		res.header('Access-Control-Expose-Headers', 'tag, link, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes');
	
		return next();
		
	}
	
}

*/

	
module.exports = cors;

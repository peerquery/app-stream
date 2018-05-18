
'use strict'

//npm modules
var express = require('express');
var path = require('path');
var subdomain = require('express-subdomain');
var dotvenv = require('dotenv').config();
var morgan = require('morgan');
var util = require('util');

//local modules
var config = require('../config/config');
var app = require('../src/app/' + config.streamer_app);
var logger = require('../src/logger/logger');
var fetch_api = require('../routes/api/fetch');
var guide_api = require('../routes/api/guide');
var stats_api = require('../routes/api/stats');
var curate_api = require('../routes/api/curate');
var cors = require('../config/cors');
var robots = require('../routes/robots/robots');

module.exports = async function () {
	
	//server
	var server = express();
	server.set('trust proxy', true); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
	server.use(cors); // activate cors
	robots(server); //activate robots.txt file route
	if (config.subdomain !== '') server.use(subdomain(config.subdomain, express.Router() ));


	//app
	if (config.app_state == 'on') app();
    
	if (config.api_state == 'on') {
		curate_api(server);
		fetch_api(server);
		stats_api(server);
		if(config.guide_api == 'on') guide_api(server);
	};


	// defaults
	server.use(express.static(path.join(__dirname, '../public')));
	
	
	//note that morgan is not configured to log IP addresses!
	server.use(morgan('combined', {stream: logger}));


	server.get('/', (req, res) => {
		res.status(200).json({ status: "OK" , server_time: new Date().toJSON(), app_version: config.app_version, api_state: config.api_state, api_version: config.api_version, api_guide: config.guide_api, app_owner: config.app_owner, app_admin: config.app_admin, app_state: config.app_state, streamer_app: config.streamer_app, engine: config.db_engine, uptime: process.uptime(), steem_rpc: process.env.STEEM_RPC});
	})


	//custom server error handler function
	server.use(function(err, req, res, next) {
		console.log('process err (500) : \n' + err);
		res.status(500).send("Sorry, something broken on our side. We're fixing it!");
	});

	
	//custom file not found error handler function
	server.use(function(req, res, next) {
		console.log('files not found (404) err');
		res.status(404).send("Sorry, file not found");
	});

	
	var port = process.env.PORT;
	
	
	server.listen(port, (err) => {
    
		if (err) {
			return console.log('Something bad happened', err)
		}

		console.log(`   *** Server is listening on ${port}***`)
	
	});


};
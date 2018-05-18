
'use strict'

var db_manager = require('./sql/db-manager');
var init = require('./src/server');
var config = require('./config/config');

console.log("* app_stream setup activated\n");


if (config.db_setup == 'true') {
	
	db_manager().then(function (status) {
	
		if (status == "OK") {
		
			console.log("\n    * db_manager successfully sets up db\n");
			console.log("  * server is being activated with configs: \n");
			console.log(config);
			console.log("\n");
		
			init();
		
			console.log('\n   ** good job, system is ready and fully functional! \n');
		
		}
	
	}).catch(function (err) {
	
		console.log("Sorry, an err occurred during db set up. check the corresponding err message for more info");
	
		console.log(err);
	
	});
	
} else {
	
	console.log("\n    * db_manager not activated\n");
	console.log("  * proceeding to activate server with configs: \n");
	console.log(config);
	console.log("\n");
	
	init();
	
	console.log('\n   ** good job, system is ready and fully functional! \n');
	
}


//handle uncauth errors - when the Steem API goes down

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', reason.stack || reason)
	console.log('  ** re-activating the server');
	// log crash if you want
	init();
})


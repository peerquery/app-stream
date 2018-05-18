
'use strict'

var target_app = require('./../../config/config').target;
	
module.exports = async function (json_metadata) {
	
	function parse_app(json_metadata) {
		
		try {
			
			return JSON.parse(json_metadata).app;
		
		} catch(err) {
			
			//console.log(err); // error handling
			//err message silenced because it not technically an 'error' - added a 'json_metadata' field to a post is optional for the post creator/client 
			
		}
		
	}
	
	var app = await parse_app(json_metadata);
	
	if( app.indexOf(target_app + "/") !== -1 ) {
		
		return 'OK';
		
	} else {
		
		return 'FALSE';
		
	}
	
};

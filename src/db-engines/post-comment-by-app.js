
'use strict'

//config
var config = require('./../../config/config');
var pool = require('./../../config/connection');
var app_test = require('./../../src/app-match/' + config.app_match);

module.exports = function (op, tx_id, block, timestamp) {
	
	//post handler
	
	if (op[1]['parent_author'] === "") {  // check if its a post - not a comment
	
		app_test(op[1]["json_metadata"]).then(function (status) {
	
			if (status == "OK") {
				
				post()
		
			}
	
		}).catch(function (err) {
	
			//console.log("Sorry, an err occurred during app match");
			//console.log(err);
			//err message silenced because it not technically an 'error' - added a 'json_metadata' field to a post is optional for the post creator/client 
	
		});
		
		function post() {
			try {
				
					var sql = "CALL new_post(?,?,?,?,?,?,?,?,?,?)";
					
					var details =  [ tx_id, block, op[1]["author"], op[1]["permlink"], op[1]["parent_permlink"], op[1]["title"], op[1]["body"], ("/@" + op[1]["author"] + "/" + op[1]["permlink"]), timestamp, op[1]["json_metadata"] ];
					
					pool.query(sql, details, function (error, results, fields) {
						if (error) { console.log(error.message); return } ;
							//console.log('New post successfully added.');
					});
					
				}
				catch(err) {
					console.log(err.message);
			}
			
		}

    }
	
	//comment handler
	
	else if (op[1]['parent_author'] !== "") {  // check if its a comment
        
		try {
				var sql = "CALL new_comment(?,?,?,?,?,?,?,?,?,?,?, @status)";
				
				var details =  [ tx_id, block, op[1]["author"], op[1]["permlink"], op[1]["parent_author"], op[1]["parent_permlink"], ("/@" + op[1]["parent_author"] + "/" + op[1]["parent_permlink"]), op[1]["body"], ("/@" + op[1]["author"] + "/" + op[1]["permlink"]), timestamp, op[1]["json_metadata"] ];
					
				pool.query(sql, details, function (error, results, fields) {
					if (error) { console.log(error.message); return } ;
						/*
						if (results[0][0].status == 'true') console.log('New comment successfully added.');
						else if (results[0][0].status == 'false') console.log('New comment not added.');
						else if (results[0][0].status == null) console.log('Failed processing comment');
						*/
				});
				
			}
			catch(err) {
				console.log(err.message);
		}

    }
	
};
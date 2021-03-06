
'use strict'

//config
var pool = require('./../../config/connection');
var target_author = require('./../../config/config').target;

module.exports = function (op, tx_id, block, timestamp) {
	
	//post handler
	
	if (op[1]['parent_author'] === "") {  // check if its a post - not a comment
                
		if (op[1]["author"] == target_author) { // checks for target author
		
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
				var sql = "CALL new_reply(?,?,?,?,?,?,?,?,?,?,?, @status)";
				
				var details =  [ tx_id, block, op[1]["author"], op[1]["permlink"], op[1]["parent_author"], op[1]["parent_permlink"], ("/@" + op[1]["parent_author"] + "/" + op[1]["parent_permlink"]), op[1]["body"], ("/@" + op[1]["author"] + "/" + op[1]["permlink"]), timestamp, op[1]["json_metadata"] ];
				
				pool.query(sql, details, function (error, results, fields) {
					if (error) { console.log(error.message); return } ;
						/*
						if (results[0][0].status == 'comment') console.log('New comment successfully added as comment.');
						else if (results[0][0].status == 'reply') console.log('New comment added as reply.');
						else if (results[0][0].status == 'none') console.log('New comment not added.');
						else if (results[0][0].status == null) console.log('Failed processing comment');
						*/
				});
					
			}
			catch(err) {
				console.log(err.message);
		}
	
    }
	
};
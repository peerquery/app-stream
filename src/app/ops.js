
'use strict'

module.exports = function (app) {
	

var dsteem = require('dsteem');
var dotvenv = require('dotenv');
var source_app = require('./../../config/config').source_app;
const steem = new dsteem.Client(process.env.STEEM_RPC);
	
//config
var db_engine = require('./../../config/config').db_engine;

//engine
var engine = require('./../../src/db-engines/' + db_engine);
 
// create a new readable stream with all operations, we use the 'latest' mode since
// we don't care about reversed block that much
// and this will make it react faster to the votes of it's master
//const stream = client.blockchain.getOperationsStream({mode: dsteem.BlockchainMode.Latest});
const stream = steem.blockchain.getOperationsStream({});

//console.log("Starting parser for Ops streamer");
	
// the stream will emit one data event for every operation that happens on the steemit blockchain
stream.on('data', (operation) => {
	
	var type = operation.op[0];
	var op = operation.op;
	var tx_id = operation.trx_id;
	var block = operation.block;
	var timestamp = operation.timestamp;
	var json_metadata = op[1]["json_metadata"];
	
	if(json_metadata) {
		
		//handler for no source_app post/comment
		if(type = 'comment' && source_app == '') engine(op, tx_id, block, timestamp);
	
		//handler for source_app post/comment
		else if(type = 'comment' && source_app !== '') {
			
			try {
					var post_app = JSON.parse(json_metadata).app
				}
			catch(err) {
				//console.log(err.message);
				//err message silenced because it not technically an 'error' - added a 'json_metadata' field to a post is optional for the post creator/client 
			}
			
			if(post_app == source_app)  engine(op, tx_id, block, timestamp);
			
		}
	
		//handler for vote
		//else if(type = 'vote') ...
	
	}
	
})


};

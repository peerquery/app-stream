
'use strict'

module.exports = function (app) {
	

var dsteem = require('dsteem');
var es = require('event-stream');
var dotvenv = require('dotenv');
var source_app = require('./../../config/config').source_app;
	
//config
var db_engine = require('./../../config/config').db_engine;

//engine
var engine = require('./../../src/db-engines/' + db_engine);
 
const steem = new dsteem.Client(process.env.STEEM_RPC);

/**
 * From a block number, gets it and parses the informations within it to store them on the blockchain
 * @param {int} blocknb - block number to parse.
 */
async function parseBlock(blocknb) {
    //console.log(blocknb);
    const block = await steem.database.getBlock(blocknb);
    const tx = block['transactions'];

    for (let i = 0; i < tx.length; i++) { // iterate over each transaction
        for (let y = 0; y < tx[i]['operations'].length; y++) { // iterate over each operation of each transaction
				
			var type = tx[i]['operations'][y][0];
			var op = tx[i]['operations'][y];
			var tx_id = tx[i]['transaction_id'];
			var block = tx[i]['ref_block_num'] + "/" + tx[i]['ref_block_prefix'];
			var timestamp = tx[i]['expiration'];
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
				
				
			}
			
		}
    }


}


/**
 * Main function tp start the stream
 * @param {int} from - Block from which to start streaming, most rpc nodes won't stream more than 100 blocks in one go so be careful
 */
async function main(from) {
    //console.log("Starting parser for Block streamer");

    let stream = null;

    if (from) {
        stream = steem.blockchain.getBlockNumberStream({from: lastblock});
    }
    else
        stream = steem.blockchain.getBlockNumberStream();

    stream.pipe(es.map(function (block, callback) {
        callback(null, parseBlock(block))
    }));

}


main();

};

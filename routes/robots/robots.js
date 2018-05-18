
'use strict'

//prevent all bots from indexing our site by default; edit as fit

module.exports = function(app) {
	
	app.get('/robots.txt', (req, res) => {
	
		res.send(
			'User-agent: *' +
			'\nDisallow: /' 
		)
	})
	

}
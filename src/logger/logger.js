
'use strict'

var express = require('express');
var path = require('path');
var fs = require('fs');
var rfs = require('rotating-file-stream');
	
var logDirectory = path.join(__dirname, './../../logs');
	
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
	
// create a rotating write stream
var accessLogStream = rfs('access.log', {
	interval: '1d', // rotate daily
	path: logDirectory
})

module.exports = accessLogStream;

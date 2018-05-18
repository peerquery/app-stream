
'use strict'

var fs = require('fs');

exports.create_db = fs.readFileSync('./sql/tables.sql').toString();

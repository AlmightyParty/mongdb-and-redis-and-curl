'use strict';

let mongoose = require('../lib/db');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	'name': String,
	'pwd': String
});
//模型
module.exports = mongoose.model('User', userSchema, 'user');// 
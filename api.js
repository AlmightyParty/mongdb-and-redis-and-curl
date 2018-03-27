'use strict';

let jwt = require('jsonwebtoken');
let config = process.env.NODE_ENV === 'pro' 
				? require('./config/config')
				: require('./config/development')

let redis = require('./lib/redis');
let myJwt = require('./lib/jwt');

let User = require('./model/user');

module.exports = (router) => {

	//生成token
	router.post('/v1/token', (req, res) => {
		
		let data = req.body; //接收值
		console.log('data-->' + JSON.stringify(data));

		//如果没有传name和pwd，系统默认为test
		//该demo主要目的是做示例，没有对输入数据做相应处理，请忽略
		//名字和密码
		var obj = {
			'name': data && data.name ? data.name : 'test',
			'pwd': data && data.pwd ? data.pwd : 'test'
		};
		//保存
		User.create(obj, (err, result) => {
			if(err) throw err;
			console.log('result-->' + JSON.stringify(result));

			let userId = result._id.toString();
			//保存token到redis，并设置过期时间，以{userId: token}方式保存
			//系统默认token有效期为2h，用户也可通过传expireIn设置token过期时间
			let expireIn = data && data.expireIn ? Number(data.expireIn) : 2*60*60;

			//保存成功，生成token
			let token = jwt.sign({ 'userId': userId, 'expireIn': expireIn }, config.secret);
      // key 是userID  
      // 这个没有放在session里面只是 可以将sessino
			redis.set(userId, token, (e, ret) => {
				if(e) throw e;
				redis.expire(userId, expireIn); //设置过期时间  只要设置了过期时间 token 会自带过期时间 decode时候
				res.json({
					code: 200, 
					data: {
						'user': result,
						'token': token
					}, 
					msg: 'success'
				});
			});
		});
	});

	//获取所有用户
	router.get('/v1/users', myJwt.verify, (req, res) => {
   // 这是从mongon 里面获取的
		User.find( (err, list) => {
			if(err) throw err;
			console.log('user list-->' + JSON.stringify(list));
			res.json({
				code: 200,
				data: list,
				msg: 'success'
			});
		});
	});

	//根据userId删除用户
	router.del('/v1/users/:userId', myJwt.verify, (req, res) => {
		var userId = req.params.userId;
		console.log('userId-->' + userId);

		User.remove({'_id': userId}, (err, result) => {
			if(err) throw err;
			console.log('result-->' + result);
			res.json({
				code: 200,
				data: {},
				msg: 'success'
			});
		});
	});

	//根据userId查询用户
	router.get('/v1/users/:userId', myJwt.verify, (req, res) => {
		var userId = req.params.userId;
		console.log('userId-->' + userId);

		User.findOne({'_id': userId}, (err, result) => {
			if(err) throw err;
			console.log('result-->' + result);
			res.json({
				code: 200,
				data: result,
				msg: 'success'
			});
		});
	});

	//修改用户
	// router.put('/v1/users/:userId', myJwt.verify, (req, res) => {
	// 	var data = req.body;
	// 	console.log('data-->' + JSON.stringify(data));

	// 	User.update({'_id': userId},
	// 		{'$set': {}}
	// 	 (err, result) => {
	// 		if(err) throw err;
	// 		console.log('result-->' + result);
	// 		res.json({
	// 			code: 200,
	// 			data: result,
	// 			msg: 'success'
	// 		});
	// 	});
	// });
}
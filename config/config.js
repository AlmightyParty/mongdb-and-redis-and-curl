'use strict';

//生产环境使用
module.exports = {
	//mongo连接信息
	mongoConfig: {
		"host": "127.0.0.1",
		"port": 27017,
        "database": "rest_test"
	},
	//redis连接信息
	redisConfig: {
		"host": "127.0.0.1",
        "port": 6379
	},
	//jwt secret key
	secret: 'node_rest_jwt_redis'
}
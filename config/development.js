'use strict';

//开发环境使用
module.exports = {
	//mongo连接信息
	mongoConfig: {
		"host": "47.94.95.52",
        "database": "rest_test"
	},
	//redis连接信息
	redisConfig: {
		"host": "47.94.95.52",
        "port": 6379
	},
	//jwt secret key
	secret: 'node_rest_jwt_redis'
}
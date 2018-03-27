
// // console.log(client.get('xxx'))
// const data = client.get("xxx", function (err, reply) {
// 	console.log(err); // => 'The connection has already been closed.'
// 	console.log(reply)
// 	return reply
// });
// console.log(data);
(async ()=>{
	let redis = require('redis');
	const config={
		host:'127.0.0.1',
		port:6379
	}
	let client = redis.createClient(config.port, config.host);
	client.set('xxx', 'ccccc', (e, ret) => {
		console.log(ret)
	})
	const getredis = ()=>{
		return new Promise((resovle,reject)=>{
			client.get("xxx", function (err, reply) {
				resovle(reply)
			});
		})
	}
	const data = await getredis()
	 // console.log('data',data);
	client.exists('cc', function(e, ret){
		console.log('ret',ret)///1就是存在 0 是不存在
	})
})()
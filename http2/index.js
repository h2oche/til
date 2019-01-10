'use strict';

let fs = require('fs'),
		http2 = require('http2');

let options = {
	key: fs.readFileSync(__dirname + '/server.pem'),
	cert: fs.readFileSync(__dirname + '/server.crt')
};

http2.createServer(options, (req, res) => {
	let stream = res.push('/main.js', {
		request: {
			accept: '*/\*'
		},
		response: {
			'content-type': 'application/javascript'
		}
	})
	.end('console.log("hello world!");');

	res.writeHead(200);
	res.end('<script src="/main.js"></script>');
}).listen(3000);
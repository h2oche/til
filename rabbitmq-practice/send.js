var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (_err, _conn) => {
	_conn.createChannel((_err , _ch) => {
		var q = 'hello';

		_ch.assertQueue(q, {durable: false});
		_ch.sendToQueue(q, new Buffer('Hello RabbitMQ'));
		console.log('[x] sent Hello RabbitMQ');
	});

	setTimeout(() => {
		console.log('process terminated');

		_conn.close();
		process.exit(0);
	}, 1000);
});


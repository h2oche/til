var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (_err, _conn) => {
	_conn.createChannel((_err , _ch) => {
		var q = 'hello';

		_ch.assertQueue(q, {durable: false});

		console.log(`[*] Waiting for messages in #{q}..`);
		_ch.consume(q, (_msg) => {
			console.log(_msg);
		}, {noAck: true});
	});
});
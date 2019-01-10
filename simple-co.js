'use strict';

// implement co library (https://github.com/tj/co)

module.exports = co;

var co = function(_gen) {
	//check if _gen is generator
	if(typeof _gen !== 'function') {
		return;
	}

	var temp = _gen();

	var next = (_val) => {
		return new Promise((_res, _rej) => {
			var genNext = temp.next(_val);
			var prom = genNext.value;

			prom
			.then((_val) => {
				if(genNext.done) {
					return _res(_val);
				} else {
					return next(_val);
				}
			})
			.catch((_err) => {
				console.error(_err);
			});
		});
	};

	next();
};

var testAsyncFunc = function() {
	return new Promise((_res, _rej)=> {
		setTimeout(() => {
			console.log('testAsyncFunc');
			_res('test1');
		}, 3000);
	});
};

var testAsyncFunc2 = function() {
	return new Promise((_res, _rej)=> {
		setTimeout(() => {
			console.log('testAsyncFunc2');
			_res('test2');
		}, 1000);
	});
};

co(function* () {
	var test1 = yield testAsyncFunc();
	var test2 = yield testAsyncFunc2();

	console.log(test1, test2);

	return Promise.resolve(test1 + test2);
});
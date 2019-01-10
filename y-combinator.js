'use strict';
const assert = require('assert');

// implement applicative-order Y combinator in javascript !!
// Y combinator : takes a function that isn't recursive and return recursive verison of it

// step 0
// common recursion
var fac0 = (_num)=> {
	if(_num <= 0) {
		return 1;
	}

	return _num * fac0(_num - 1);
};

assert(fac0(5) === 120, 'step 0 error : expected to be 120');
assert(fac0(7) === 5040, 'step 0 error : expected to be 5040');

//step 1
var fac1 = (_num, _fac)=> {
	if(_num <= 0) {
		return 1;
	}

	return _num * _fac(_num - 1, _fac);
};

assert(fac1(5, fac1) === 120, 'step 1 error : expected to be 120');
assert(fac1(7, fac1) === 5040, 'step 1 error : expected to be 5040');

//step 2
var almostFac = (_completeFacFunc)=> {
	return (_num)=> {
		if(_num <= 0) {
			return 1;
		}

		return _num * _completeFacFunc(_num - 1);
	}
};

var y_beta = (_func)=> {
	return (_x)=> {
		return _func(y_beta(_func))(_x);
	};
};

var fac2 = y_beta(almostFac);

assert(fac2(5) === 120, 'step 2 error : expected to be 120');
assert(fac2(7) === 5040, 'step 2 error: expected to be 5040');

//step 3
var part_fac = (_self)=> {
	return _num=> {
		if(_num <= 0) {
			return 1;
		}

		return _num * _self(_self)(_num - 1);
	};
};

var fac3 = part_fac(part_fac);

assert(fac3(5) === 120, 'step 3 error : expected to be 120');
assert(fac3(7) === 5040, 'step 3 error: expected to be 5040');

//step 4
var fac4 = (_self=> {
	return (_perfectFac => {
		return almostFac(_perfectFac);
	})(_num=> {
		return _self(_self)(_num);
	});
})(_self=> {
	return (_perfectFac => {
		return almostFac(_perfectFac);
	})(_num=> {
		return _self(_self)(_num);
	});
});

assert(fac4(5) === 120, 'step 4 error : expected to be 120');
assert(fac4(7) === 5040, 'step 4 error: expected to be 5040');

//step 5
var y_1 = _func => {
	return (_self => {
		return _func(_num=> {
			return _self(_self)(_num);
		})
	})(_self => {
		return _func(_num=> {
			return _self(_self)(_num);
		});
	});
};

var y = _func => {
	return (_x => {
		return _x(_x);
	})(_x => {
		return _func(_num=> {
			return _x(_x)(_num);
		})
	});
};

var fac5 = y(almostFac);

assert(fac5(5) === 120, 'step 5 error : expected to be 120');
assert(fac5(7) === 5040, 'step 5 error: expected to be 5040');



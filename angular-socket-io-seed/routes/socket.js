/*
 * Serve content over a socket
 */
var userNames = (function() {
	var names = {};

	var claim = function(_name) {
		if(!_name || userNames[_name]) {
			return false;
		} else {
			userNames[_name] = true;
			return true;
		}
	};

	var getGuestName = function() {
		var name, nextUserId = 1;

		do {
			name = 'Guest ' + nextUserId;
			nextUserId += 1;
		} while(!claim(name));

		return name;
	};

	var get = function() {
		var res = [];
		for(user in userNames) {
			res.push(user);
		}
		return res;
	};

	var free = function(_name) {
		if(userNames[_name]) {
			delete userNames[_name];
		}
	};

	return {
		claim: claim,
		free: free,
		get: get,
		getGuestName: getGuestName
	};
})();

module.exports = function (socket) {
  var name = userNames.getGuestName();

  socket.emit('init', {
  	name: name,
  	users: userNames.get()
  });

  socket.broadcast.emit('user:join', {
  	name: name
  });

  socket.on('send:message', function(_data) {
  	socket.broadcast.emit('send:message', {
  		user: name,
  		text: _data.message
  	});
  });

  socket.on('change:name', function(_data, _fn) {
  	if(userNames.claim(_data.name)) {
  		var oldName = name;
  		userNames.free(oldName);

  		name = _data.name;

  		socket.broadcast.emit('change:name', {
  			oldName: oldName,
  			newName: name
  		});

  		_fn(true);
  	} else {
  		_fn(false);
  	}
  });

  socket.on('disconnect', function() {
  	socket.broadcast.emit('user:left', {
  		name: name
  	});
  	userNames.free(name);
  });
};

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  factory('socket', function ($rootScope) {
  	var socket = io.connect();
  	return {
  		on: function(_eventName, _cb) {
  			socket.on(_eventName, function() {
  				var args = arguments;
  				$rootScope.$apply(function() {
  					_cb.apply(socket, args);
  				});
  			});
  		},
  		emit: function(_eventName, _data, _cb) {
  			socket.emit(_eventName, _data, function() {
  				var args = arguments;
  				$rootScope.$apply(function() {
  					if(_cb) {
  						_cb.apply(socket, args);
  					}
  				});
  			});
  		}
  	};
  }).
  value('version', '0.1');

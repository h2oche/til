'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    $scope.messages = [];
    $scope.users = [];

    socket.on('init', function(_data) {
      console.log(_data);

      $scope.name = _data.name;
      $scope.users = _data.users;
    });

    socket.on('send:message', function(_message) {
      $scope.messages.push(_message);
    });

    socket.on('change:name', function(_data) {
      changeName(_data.oldName, _data.newName);
    });

    socket.on('user:join', function(_data) {
      $scope.messages.push({
        user: 'chatroom',
        text: 'User ' + _data.name + ' has joined'
      });
      $scope.users.push(_data.name);
    });

    socket.on('user:left', function(_data) {
      $scope.messages.push({
        user: 'chatroom',
        text: 'User ' + _data.name + ' has left.'
      });

      var i, user;
      for(i = 0; i < $scope.users.length; i += 1) {
        user = $scope.users[i];
        if(user === _data.name) {
          $scope.users.splice(i, 1);
          break;
        }
      }
    });

    var changeName = function(_oldName, _newName) {
      var i;
      for(i = 0 ; i < $scope.users.length; i += 1) {
        if($scope.users[i] === _oldName) {
          $scope.users[i] = _newName;
        }
      }

      $scope.messages.push({
        user: 'chatroom',
        text: 'User ' + _oldName + ' is now known as ' + _newName + '.'
      });
    };

    $scope.changeName = function() {
      socket.emit('change:name', {
        name: $scope.newName
      }, function(_result) {
        if(!_result) {
          window.alert('There was an error changing your name');
        } else {
          changeName($scope.name, $scope.newName);

          $scope.name = $scope.newName;
          $scope.newName = '';
        }
      });
    };

    $scope.sendMessage = function() {
      socket.emit('send:message', {
        message: $scope.message
      });

      $scope.messages.push({
        user: $scope.name,
        text: $scope.message
      });

      $scope.message = '';
    };
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });

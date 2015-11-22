angular.module('islaApp')
  .controller('RoomController', ['$scope','$cookies','$http','Room',
    function ($scope, $cookies, $http, Room) {
      'use strict';
      $scope.comments = [];

      Room.connect();

      Room.receive().then(null, null, function(comment){
        showComment(comment);
      });

      function showComment(comment){
        var existingComment = false;
        for(var index = 0; index < $scope.comments.length; index++){
          if($scope.comments[index].sessionId === comment.sessionId){
            existingComment = true;
            $scope.comments[index] = comment;
          }
        }
        if(!existingComment){
          $scope.comments.push(comment);
        }
      }
    }]);

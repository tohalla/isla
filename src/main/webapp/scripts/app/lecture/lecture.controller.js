angular.module('islaApp')
  .controller('LectureController', ['$scope','$cookies','$http','Lecture',
    function ($scope, $cookies, $http, Lecture) {
      'use strict';
      $scope.comments = [];
      Lecture.receive().then(null, null, function(comment){
        showComment(comment);
      });

      function showComment(comment){
        var existingComment = false;
        for(var index = 0; index < $scope.comments.length; index++){
          if($scope.comments[index].sessionId = comment.sessionId){
            existingComment = true;
            scope.comments[index] = comment;
          }
        }
        if(!existingComment){
          $scope.comments.push(comment);
        }
      }
    }]);

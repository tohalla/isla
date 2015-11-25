'use strict';

angular.module('islaApp')
  .controller('CommentDetailController', function ($scope, $rootScope, $stateParams, entity, commentService, User, Lecture) {
    $scope.comment = entity;
    $scope.load = function (id) {
      commentService.get({id: id}, function(result) {
        $scope.comment = result;
      });
    };
    $rootScope.$on('islaApp:commentUpdate', function(event, result) {
      $scope.comment = result;
    });
  });

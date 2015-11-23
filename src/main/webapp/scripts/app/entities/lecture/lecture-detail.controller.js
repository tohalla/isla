'use strict';

angular.module('islaApp')
  .controller('LectureDetailController', function ($scope, $rootScope, $stateParams, entity, Lecture, Comment) {
    $scope.lecture = entity;
    $scope.load = function (id) {
      Lecture.get({id: id}, function(result) {
        $scope.lecture = result;
      });
    };
    $rootScope.$on('islaApp:lectureUpdate', function(event, result) {
      $scope.lecture = result;
    });
  });

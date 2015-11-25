'use strict';

angular.module('islaApp').controller('LectureDialogController',
  ['$scope', '$stateParams', '$modalInstance', 'entity', 'Lecture', 'commentService',
    function($scope, $stateParams, $modalInstance, entity, Lecture, commentService) {

    $scope.lecture = entity;
    $scope.comments = commentService.query();
    $scope.load = function(id) {
      Lecture.get({id : id}, function(result) {
        $scope.lecture = result;
      });
    };

    var onSaveFinished = function (result) {
      $scope.$emit('islaApp:lectureUpdate', result);
      $modalInstance.close(result);
    };

    $scope.save = function () {
      if ($scope.lecture.id !== null) {
        Lecture.update($scope.lecture, onSaveFinished);
      } else {
        Lecture.save($scope.lecture, onSaveFinished);
      }
    };

    $scope.clear = function() {
      $modalInstance.dismiss('cancel');
    };
}]);

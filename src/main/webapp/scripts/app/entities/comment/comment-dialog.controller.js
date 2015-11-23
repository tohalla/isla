'use strict';

angular.module('islaApp').controller('CommentDialogController',
  ['$scope', '$stateParams', '$modalInstance', 'entity', 'commentService', 'User', 'Lecture',
    function($scope, $stateParams, $modalInstance, entity, commentService, User, Lecture) {

    $scope.comment = entity;
    $scope.users = User.query();
    $scope.lectures = Lecture.query();
    $scope.load = function(id) {
      commentService.get({id : id}, function(result) {
        $scope.comment = result;
      });
    };

    var onSaveFinished = function (result) {
      $scope.$emit('islaApp:commentUpdate', result);
      $modalInstance.close(result);
    };

    $scope.save = function () {
      if ($scope.comment.id !== null) {
        commentService.update($scope.comment, onSaveFinished);
      } else {
        commentService.save($scope.comment, onSaveFinished);
      }
    };

    $scope.clear = function() {
      $modalInstance.dismiss('cancel');
    };
}]);

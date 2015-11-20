'use strict';

angular.module('islaApp').controller('LectureDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Lecture', 'Comment',
        function($scope, $stateParams, $modalInstance, entity, Lecture, Comment) {

        $scope.lecture = entity;
        $scope.comments = Comment.query();
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
            if ($scope.lecture.id != null) {
                Lecture.update($scope.lecture, onSaveFinished);
            } else {
                Lecture.save($scope.lecture, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

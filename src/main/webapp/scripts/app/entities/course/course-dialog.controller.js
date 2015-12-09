'use strict';

angular.module('islaApp').controller('CourseDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Course', 'Lecture',
        function($scope, $stateParams, $modalInstance, entity, Course, Lecture) {

        $scope.course = entity;
        $scope.lectures = Lecture.query();
        $scope.load = function(id) {
            Course.get({id : id}, function(result) {
                $scope.course = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('islaApp:courseUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.course.id != null) {
                Course.update($scope.course, onSaveFinished);
            } else {
                Course.save($scope.course, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

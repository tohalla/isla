'use strict';

angular.module('islaApp')
    .controller('CourseDetailController', function ($scope, $rootScope, $stateParams, entity, Course, Lecture) {
        $scope.course = entity;
        $scope.load = function (id) {
            Course.get({id: id}, function(result) {
                $scope.course = result;
            });
        };
        $rootScope.$on('islaApp:courseUpdate', function(event, result) {
            $scope.course = result;
        });
    });

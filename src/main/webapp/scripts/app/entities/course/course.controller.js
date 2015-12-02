'use strict';

angular.module('islaApp')
    .controller('CourseController', function ($scope, Course, CourseSearch) {
        $scope.courses = [];
        $scope.loadAll = function() {
            Course.query(function(result) {
               $scope.courses = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Course.get({id: id}, function(result) {
                $scope.course = result;
                $('#deleteCourseConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Course.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCourseConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            CourseSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.courses = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.course = {
                course_name: null,
                course_description: null,
                id: null
            };
        };
    });

'use strict';

angular.module('islaApp')
    .controller('LectureController', function ($scope, Lecture, LectureSearch) {
        $scope.lectures = [];
        $scope.loadAll = function() {
            Lecture.query(function(result) {
               $scope.lectures = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Lecture.get({id: id}, function(result) {
                $scope.lecture = result;
                $('#deleteLectureConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Lecture.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteLectureConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            LectureSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.lectures = result;
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
            $scope.lecture = {createdAt: null, startsAt: null, closesAt: null, description: null, id: null};
        };
    });

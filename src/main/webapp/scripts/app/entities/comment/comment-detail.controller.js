'use strict';

angular.module('islaApp')
    .controller('CommentDetailController', function ($scope, $rootScope, $stateParams, entity, Comment, User, Lecture) {
        $scope.comment = entity;
        $scope.load = function (id) {
            Comment.get({id: id}, function(result) {
                $scope.comment = result;
            });
        };
        $rootScope.$on('islaApp:commentUpdate', function(event, result) {
            $scope.comment = result;
        });
    });

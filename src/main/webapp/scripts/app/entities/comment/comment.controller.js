(function(){
  'use strict';

  angular.module('islaApp')
    .controller('CommentController', CommentController);

  CommentController.$inject = [
    '$scope',
    'commentService',
    'CommentSearch',
    'ParseLinks'
  ];

  function CommentController($scope, commentService, CommentSearch) {
    $scope.comments = [];
    $scope.page = 0;

    $scope.loadAll = function() {
      commentService.query({page: $scope.page, size: 20}, function(result){
        $scope.comments = result;
      });
    };

    $scope.reset = function() {
      $scope.page = 0;
      $scope.comments = [];
      $scope.loadAll();
    };

    $scope.loadPage = function(page) {
      $scope.page = page;
      $scope.loadAll();
    };

    $scope.loadAll();

    $scope.delete = function (id) {
      commentService.get({id: id}, function(result) {
        $scope.comment = result;
        $('#deleteCommentConfirmation').modal('show');
      });
    };

    $scope.confirmDelete = function (id) {
      commentService.delete({id: id},
      function () {
        $scope.reset();
        $('#deleteCommentConfirmation').modal('hide');
        $scope.clear();
      });
    };

    $scope.search = function () {
      CommentSearch.query({query: $scope.searchQuery}, function(result) {
      $scope.comments = result;
      }, function(response) {
        if(response.status === 404) {
          $scope.loadAll();
        }
      });
    };

    $scope.refresh = function () {
      $scope.reset();
      $scope.clear();
    };

    $scope.clear = function () {
      $scope.comment = {createdAt: null, content: null, id: null};
    };
  }
})();

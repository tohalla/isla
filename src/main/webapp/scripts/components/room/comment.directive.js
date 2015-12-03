(function(){
  'use strict';
  angular.module('islaApp')
    .directive('islaComment', islaComment);

  function islaComment() {
    var directive = {
      scope: {
        commentId: '@',
        score: '@'
      },
      restrict: 'E',
      transclude: true,
      templateUrl: 'scripts/components/room/comment.directive.html',
      controller: commentController,
      controllerAs: 'vm'
    };

    commentController.$inject = ['$scope','$cookies','roomService'];
    function commentController($scope, $cookies, roomService){
      /*jshint validthis: true */
      var vm = this;
      vm.likeComment = likeComment;
      vm.allowLike = allowLike;

      function likeComment(){
        roomService.likeComment($scope.commentId);
      }
      function allowLike(){
        var contains = roomService.comments[$scope.commentId]
                                    .likes.indexOf($cookies.get('hazelcast.sessionId')) >= 0;
        return !contains;
      }
    }
    return directive;
  }
})();

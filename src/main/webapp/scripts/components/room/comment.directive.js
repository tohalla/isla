(function() {
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
      controllerAs: 'comment'
    };
    function commentController($scope, $cookies, roomService) {
      var vm = this;
      vm.likeComment = likeComment;
      vm.allowLike = allowLike;
      vm.deleteComment = deleteComment;
      vm.markCommentAsRead = markCommentAsRead;
      vm.allowModeratorActions = allowModeratorActions;
      vm.isRead = isRead;

      function likeComment() {
        roomService.likeComment($scope.commentId);
      }

      function deleteComment() {
        roomService.deleteComment($scope.commentId);
      }

      function markCommentAsRead() {
        roomService.markCommentAsRead($scope.commentId);
      }

      function isRead() {
        return roomService.comments[$scope.commentId].read;
      }

      function allowLike() {
        return !(roomService.comments[$scope.commentId]
          .likes.indexOf($cookies.get('hazelcast.sessionId')) >= 0) && !roomService.comments[$scope.commentId].read;
      }

      function allowModeratorActions() {
        return roomService.moderator;
      }
    }
    return directive;
  }
})();

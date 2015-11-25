(function(){
  'use strict';

  angular.module('islaApp')
    .directive('islaComment', islaComment);

  function islaComment() {
    var directive = {
      $scope: {} ,
      restrict: 'E',
      templateUrl: 'scripts/components/room/comment.directive.html',
      controller: commentController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
  commentController.$inject = ['roomService'];
  function commentController(roomService){
    var vm = this;
    vm.sendComment = sendComment;

    function sendComment(){
      roomService.sendComment({'content':vm.commentText});
      vm.commentText = '';
    }
  }
})();

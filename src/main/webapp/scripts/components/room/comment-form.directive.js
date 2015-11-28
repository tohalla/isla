(function(){
  'use strict';

  angular.module('islaApp')
    .directive('islaCommentForm', islaCommentForm);

  function islaCommentForm() {
    var directive = {
      $scope: {} ,
      restrict: 'E',
      transclude: true,
      templateUrl: 'scripts/components/room/comment-form.directive.html',
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

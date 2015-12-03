(function(){
  'use strict';

  angular.module('islaApp')
    .directive('islaCommentForm', islaCommentForm);

  function islaCommentForm() {
    var directive = {
      scope: {} ,
      restrict: 'E',
      templateUrl: 'scripts/components/room/comment-form.directive.html',
      controller: commentFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
  commentFormController.$inject = ['roomService'];
  function commentFormController(roomService){
    /*jshint validthis: true */
    var vm = this;
    vm.sendComment = sendComment;

    function sendComment(){
      roomService.sendComment({'content':vm.commentText});
      vm.commentText = '';
    }
  }
})();

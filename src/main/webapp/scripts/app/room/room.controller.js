(function(){
  'use strict';
  angular.module('islaApp')
    .controller('RoomController', RoomController);

  RoomController.$inject = [
    '$scope',
    '$cookies',
    '$http',
    'roomService',
    'commentService'
  ];

  function RoomController($scope, $cookies, $http, roomService, commentService) {
    var vm = this;

    vm.comments = [];

    vm.sendComment = sendComment;
    vm.showComment = showComment;

    loadComments();

    roomService.receive().then(null, null, function(comment){
      showComment(comment);
    });

    function showComment(comment){
      vm.comments.push(comment);
    }
    function sendComment(){
      roomService.sendComment({'content':vm.commentText});
      vm.commentText = '';
    }
    function loadComments(){
      commentService.getComments();
    }
  }

}());

(function(){
  'use strict';
  angular.module('islaApp')
    .controller('RoomController', RoomController);

  RoomController.$inject = [
    '$scope',
    '$cookies',
    '$http',
    'roomService',
    'commentService',
    'Lecture'
  ];

  function RoomController(
    $scope,
    $cookies,
    $http,
    roomService
  ){
    var vm = this;

    $scope.$watch(roomService.getComments(), function(){
      vm.comments = roomService.comments;
    });
    vm.sendComment = sendComment;
    vm.showComment = showComment;


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
  }

}());

(function(){
  'use strict';
  angular.module('islaApp')
    .controller('RoomController', RoomController);

  RoomController.$inject = [
    '$scope',
    '$cookies',
    '$http',
    'roomService',
    'Lecture'
  ];

  function RoomController(
    $scope,
    $cookies,
    $http,
    roomService
  ){
    var vm = this;

    vm.sendComment = sendComment;
    vm.showComment = showComment;

    $scope.$watch(roomService.comments, function(){
      vm.comments = roomService.comments;
    });

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

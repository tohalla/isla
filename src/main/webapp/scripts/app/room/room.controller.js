(function(){
  'use strict';
  angular.module('islaApp')
    .controller('RoomController', RoomController);

  RoomController.$inject = [
    '$scope',
    '$cookies',
    '$http',
    'roomService'
  ];

  function RoomController(
    $scope,
    $cookies,
    $http,
    roomService
  ){
    var vm = this;

    vm.sendComment = sendComment;

    $scope.$watch(roomService.comments, function(){
      vm.comments = roomService.comments;
    });

    function sendComment(){
      roomService.sendComment({'content':vm.commentText});
      vm.commentText = '';
    }
  }

}());

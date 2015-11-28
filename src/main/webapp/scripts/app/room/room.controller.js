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

    $scope.$watch(roomService.comments, function(){
      vm.comments = roomService.comments;
    });

    vm.likeComment = function(){
      if($cookies.get('hazelcast.sessionId') !== null){
      }//add error handling..
    };
  }

}());

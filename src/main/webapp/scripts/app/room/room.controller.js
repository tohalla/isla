(function() {
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
  ) {
    var vm = this;

    $scope.$watch(
      function() {
        return roomService.comments;
      },
      function() {
        vm.comments = roomService.comments;
      }
    );
  }
})();

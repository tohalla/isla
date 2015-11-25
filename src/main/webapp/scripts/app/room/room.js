(function(){
  'use strict';
  angular.module('islaApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('room',{
    parent: 'site',
    url: '/room/{lectureId}',
    data: {
      authorities: []
    },
    views: {
      'content@': {
        templateUrl: 'scripts/app/room/room.html',
        controller: 'RoomController',
        controllerAs: 'room'
      }
    },resolve: {
      mainTranslatePartialLoader:
      function($translate, $translatePartialLoader){
        $translatePartialLoader.addPart('room');
        return $translate.refresh();
      },
    },
    onEnter: function($stateParams, $q, roomService, AlertService){
      roomService.initialize($stateParams.lectureId)
        .then(
          function(){
            return roomService.connect();
          },
          function(error){
            AlertService.error(error.msg, error.params);
            return $q.reject();
          }
        )
        .then(function(){
          roomService.subscribe();
          roomService.loadComments();
        });
    },
    onExit: function(roomService){
      roomService.unsubscribe();
      roomService.disconnect();
    }
    });
  }]);
}());

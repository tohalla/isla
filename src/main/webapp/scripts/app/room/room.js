(function(){
  'use strict';
  angular.module('islaApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('room',{
    parent: 'site',
    url: '/room',
    data: {
      authorities: []
    },
    views: {
      'content@': {
      templateUrl: 'scripts/app/room/room.html',
      controller: 'RoomController',
      controllerAs: 'room'
      }
    },resolve: { /* @ngInject */
      mainTranslatePartialLoader:
      function($translate, $translatePartialLoader){
        $translatePartialLoader.addPart('room');
        return $translate.refresh();
      }
    },
    onEnter: function(roomService){
      roomService.connect().then(roomService.subscribe());
    },
    onExit: function(roomService){
      roomService.unsubscribe();
      roomService.disconnect();
    }
    });
  }]);
}());

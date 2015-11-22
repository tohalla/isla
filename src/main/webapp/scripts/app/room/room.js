angular.module('islaApp')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';
    $stateProvider.state('room',{
      parent: 'site',
      url: '/room',
      data: {
          authorities: []
      },
      views: {
        'content@': {
          templateUrl: 'scripts/app/room/room.html',
          controller: 'RoomController'
        }
      },resolve: {
        mainTranslatePartialLoader: ['$translate', '$translatePartialLoader',
          function($translate, $translatePartialLoader){
            $translatePartialLoader.addPart('room');
            return $translate.refresh();
          }]
      },
      onEnter: function(Room){
        Room.subscribe();
      },
      onExit: function(Room){
        Room.unsubscribe();
      }
    });
  }]);

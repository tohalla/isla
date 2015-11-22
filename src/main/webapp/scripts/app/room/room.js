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
          controllerAs: 'vm'
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
}());

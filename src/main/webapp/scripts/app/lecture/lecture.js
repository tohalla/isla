'use strict';

angular.module('islaApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('tracker',{
      url: '/lecture',
      data: {
         authorities: []
      },
      views: {
        'content@': {
          templateUrl: 'scripts/app/lecture/lecture.html',
          controller: 'LectureController'
        }
      },
      resolve: {
        mainTranslatePartialLoader: ['$translate', '$translatePartialLoader',
          function($translate, $translatePartialLoader){
            $translatePartialLoader.addPart('lecture');
            return $translate.refresh();
          }]
      },
      onEnter: function(Lecture){
        Lecture.subscribe();
      },
      onExit: function(Lecture){
        Lecture.unsubscribe();
      }
    });
  }]);

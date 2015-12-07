'use strict';

angular.module('islaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        parent: 'contained',
        url: '/',
        views: {
          'content': {
            templateUrl: 'scripts/app/home/home.html'
          }
        },
        resolve: {
          mainTranslatePartialLoader: ['$translate', function ($translate) {
            //when translations will be added.. $translatePartialLoader.addPart('home');
            return $translate.refresh();
          }]
        }
      });
  });

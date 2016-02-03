'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('layout', {
        abstract: true,
        parent: 'site',
        views: {
          'navbar@layout': {
            template: '<isla-navbar></isla-navbar>'
          },
          'content@': {
            templateUrl: 'scripts/app/layout/layout.html',
            controller: 'MainController'
          },
          'footer@layout': {
            templateUrl: 'scripts/app/layout/footer.html'
          }
        }
      });
  });

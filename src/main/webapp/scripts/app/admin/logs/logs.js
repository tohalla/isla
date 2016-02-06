'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('logs', {
        parent: 'admin',
        url: '/logs',
        data: {
          authorities: ['ROLE_ADMIN'],
          pageTitle: 'logs.title'
        },
        views: {
          'content@': {
            templateUrl: 'scripts/app/admin/logs/logs.html',
            controller: 'LogsController'
          }
        },
        resolve: {
          translatePartialLoader:
            function($translate, $translatePartialLoader) {
              $translatePartialLoader.addPart('logs');
              return $translate.refresh();
            }
        }
      });
  });

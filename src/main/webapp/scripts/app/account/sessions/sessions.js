'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('sessions', {
        parent: 'account',
        url: '/sessions',
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'global.menu.account.sessions'
        },
        views: {
          content: {
            templateUrl: 'scripts/app/account/sessions/sessions.html',
            controller: 'SessionsController'
          }
        },
        resolve: {
          translatePartialLoader:
            function($translate, $translatePartialLoader) {
              $translatePartialLoader.addPart('sessions');
              return $translate.refresh();
            }
        }
      });
  });

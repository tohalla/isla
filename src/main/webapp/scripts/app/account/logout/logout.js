'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('logout', {
        parent: 'account',
        url: '/logout',
        data: {
          authorities: []
        },
        views: {
          'content@': {
            controller: 'LogoutController'
          }
        }
      });
  });

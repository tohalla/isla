'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('requestReset', {
        parent: 'account',
        url: '/reset/request',
        views: {
          content: {
            templateUrl: 'scripts/app/account/reset/request/reset.request.html',
            controller: 'RequestResetController'
          }
        },
        resolve: {
          translatePartialLoader:
            function($translate, $translatePartialLoader) {
              $translatePartialLoader.addPart('reset');
              return $translate.refresh();
            }
        }
      });
  });

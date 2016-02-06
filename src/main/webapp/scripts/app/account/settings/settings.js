'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('settings', {
        parent: 'account',
        url: '/settings',
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'global.menu.account.settings'
        },
        views: {
          content: {
            templateUrl: 'scripts/app/account/settings/settings.html',
            controller: 'SettingsController'
          }
        },
        resolve: {
          translatePartialLoader:
            function($translate, $translatePartialLoader) {
              $translatePartialLoader.addPart('settings');
              return $translate.refresh();
            }
        }
      });
  });

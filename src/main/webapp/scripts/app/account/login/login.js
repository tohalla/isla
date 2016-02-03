'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        parent: 'account',
        url: '/login',
        data: {
          pageTitle: 'login.title'
        },
        views: {
          content: {
            templateUrl: 'scripts/app/account/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
          }
        },
        resolve: {
          translatePartialLoader: function(
            $translate,
            $translatePartialLoader
          ) {
            $translatePartialLoader.addPart('login');
            return $translate.refresh();
          }
        }
      });
  });

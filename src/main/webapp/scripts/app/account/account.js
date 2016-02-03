'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('account', {
        abstract: true,
        parent: 'contained',
        views: {
          content: {
            template: '<div ui-view="content"></div>'
          }
        }
      });
  });

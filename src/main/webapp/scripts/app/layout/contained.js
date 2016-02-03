'use strict';

angular.module('islaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('contained', {
        abstract: true,
        parent: 'layout',
        views: {
          '': {
            template: '<div ui-view="content" class="container"></div>'
          }
        }
      });
  });

'use strict';

angular.module('islaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('entity', {
        abstract: true,
        parent: 'site'
      });
  });

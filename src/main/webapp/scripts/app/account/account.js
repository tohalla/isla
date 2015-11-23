'use strict';

angular.module('islaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('account', {
        abstract: true,
        parent: 'site'
      });
  });

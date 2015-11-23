'use strict';

angular.module('islaApp')
  .factory('LogsService', function ($resource) {
    return $resource('api/logs', {}, {
      'findAll': { method: 'GET', isArray: true},
      'changeLevel': { method: 'PUT'}
    });
  });

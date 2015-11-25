'use strict';

angular.module('islaApp')
  .factory('Activate', function ($resource) {
    return $resource('api/activate', {}, {
      'get': { method: 'GET', params: {}, isArray: false}
    });
  });



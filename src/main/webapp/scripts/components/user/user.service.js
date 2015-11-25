'use strict';

angular.module('islaApp')
  .factory('User', function ($resource) {
    return $resource('api/users/:login', {}, {
        'query': {method: 'GET', isArray: true},
        'get': {
          method: 'GET',
          transformResponse: function (data) {
            data = angular.fromJson(data);
            return data;
          }
        },
        'update': { method:'PUT' }
      });
    });

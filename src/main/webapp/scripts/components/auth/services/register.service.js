'use strict';

angular.module('islaApp')
  .factory('Register', function ($resource) {
    return $resource('api/register', {}, {
    });
  });



(function(){
  'use strict';
  angular.module('islaApp')
    .factory('Course', courseService);

  courseService.$inject = [
    '$resource',
    'DateUtils',
  ];

  function courseService($resource, DateUtils) {
    return $resource('api/courses/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': {
        method: 'GET',
        transformResponse: function (data) {
          return angular.fromJson(data);
        }
      },
      'update': { method:'PUT' },
      'getLectures': {
        merhod: 'GET',
        isArray: true,
        params: {courseId: '@courseId'},
        url: '/api/courses/:courseId/lectures'
      }
    });
  }
})();

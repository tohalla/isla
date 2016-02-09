(function() {
  'use strict';

  angular.module('islaApp')
    .factory('Lecture', Lecture);

  function Lecture($resource, DateUtils) {
    return $resource('/api/lectures/:id', {id: '@id'}, {
      query: {method: 'GET', isArray: true},
      get: {
        method: 'GET',
        transformResponse: function(data) {
          data = angular.fromJson(data);
          data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
          data.startsAt = DateUtils.convertDateTimeFromServer(data.startsAt);
          data.closesAt = DateUtils.convertDateTimeFromServer(data.closesAt);
          return data;
        }
      },
      update: {method: 'PUT'},
      getComments: {
        merhod: 'GET',
        isArray: true,
        params: {lectureId: '@lectureId'},
        url: '/api/lectures/:lectureId/comments'
      }
    });
  }
})();

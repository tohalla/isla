(function(){
  'use strict';

  angular.module('islaApp')
    .factory('Lecture', Lecture);

  Lecture.$inject = [
    '$resource',
    'DateUtils'
  ];

  function Lecture($resource, DateUtils){
    return $resource('/api/lectures/:id', {id:'@id'}, {
      'query': { method: 'GET', isArray: true},
      'get': {
        method: 'GET',
        transformResponse: function (data) {
          data = angular.fromJson(data);
          data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
          data.startsAt = DateUtils.convertDateTimeFromServer(data.startsAt);
          data.closesAt = DateUtils.convertDateTimeFromServer(data.closesAt);
          return data;
        },
      },
      'update': { method:'PUT' },
      'getComments': {
        merhod: 'GET',
        isArray: true,
        params: {lectureId: '@lectureId'},
        url: '/api/lectures/:lectureId/comments',
        transformResponse: function (data) {
          data = angular.fromJson(data);
          var modified = [];
          angular.forEach(data, function(value) {
            this.push({
              content:value.content,
              createdAt:value.createdAt
            });
          }, modified);
          return modified;
        }
      }
    });
  }

})();

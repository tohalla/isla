'use strict';

angular.module('islaApp')
    .factory('LectureSearch', function ($resource) {
        return $resource('api/_search/lectures/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });

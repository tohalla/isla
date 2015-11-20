'use strict';

angular.module('islaApp')
    .factory('Lecture', function ($resource, DateUtils) {
        return $resource('api/lectures/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
                    data.startsAt = DateUtils.convertDateTimeFromServer(data.startsAt);
                    data.closesAt = DateUtils.convertDateTimeFromServer(data.closesAt);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });

(function() {
  'use strict';
  angular.module('islaApp')
    .filter('orderObject', orderObject);

  function orderObject() {
    return function(items, params) {
      var sorted = [];
      angular.forEach(items, function(item) {
        sorted.push(item);
      });

      return sorted.sort(function(a, b) {
        var order = 0;
        for (var i = 0; i < params.length; i++) {
          if (order !== 0) {
            break;
          }
          if (a[params[i].attribute] === b[params[i].attribute]) {
            continue;
          }
          params[i].attribute = angular.isDefined(params[i].attribute) ?
            params[i].attribute : 'id';
          params[i].reverse = angular.isDefined(params[i].reverse) ?
            params[i].reverse : false;
          if (params[i].type === 'time') {
            if (a[params[i].attribute] !== b[params[i].attribute]) {
              order =
                new Date(a[params[i].attribute]) < new Date(b[params[i].attribute]) ?
                  1 : -1;
            }
          } else if (typeof a[params[i].attribute] === 'boolean') {
            order = 1;
          } else if (angular.isArray(a[params[i].attribute])) {
            if (a[params[i].attribute].length !== b[params[i].attribute].length) {
              order = a[params[i].attribute].length < b[params[i].attribute].length ?
                1 : -1;
            }
          } else {
            order = a[params[i].attribute] < b[params[i].attribute] ? 1 : -1;
          }
          if (angular.isDefined(order)) {
            order = params[i].reverse ? -order : order;
          }
        }
        return order;
      });
    };
  }
})();

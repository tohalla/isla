(function() {
  'use strict';
  angular.module('islaApp')
    .filter('orderObject', orderObject);

  function orderObject() {
    return function(items, params) {
      var returnValue = [];
      angular.forEach(items, function(item) {
        returnValue.push(item);
      });

      return returnValue.sort(function(a, b) {
        var order;
        angular.forEach(params, function(param) {
          param.attribute = angular.isDefined(param.attribute) ?
            param.attribute : 'id';
          param.reverse = angular.isDefined(param.reverse) ?
            param.reverse : false;
          if (param.type === 'time') {
            if (a[param.attribute] !== b[param.attribute]) {
              order =
                new Date(a[param.attribute]) < new Date(b[param.attribute]) ?
                  1 : -1;
            }
          } else if (param.type === 'array') {
            if (a[param.attribute].length !== b[param.attribute].length) {
              order = a[param.attribute].length < b[param.attribute].length ?
                1 : -1;
            }
          } else {
            order = a[param.attribute] < b[param.attribute] ? 1 : -1;
          }
          if (angular.isDefined(order)) {
            order = param.reverse ? -order : order;
            return false;
          }
        });
        return order;
      });
    };
  }
})();

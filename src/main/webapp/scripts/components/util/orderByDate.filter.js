(function(){
  'use strict';
  angular.module('islaApp')
    .filter('orderByDate', orderByDate);

  function orderByDate(){
    return function(items, attribute, reverse){
      attribute = typeof attribute !== 'undefined' ? attribute : 'createdAt';
      reverse = typeof reverse !== 'undefined' ? reverse : false;

      var returnValue = [];
      angular.forEach(items, function(item){
        returnValue.push(item);
      });

      return reverse ?
        returnValue.sort(function(a,b){
          return new Date(a[attribute] - new Date(b[attribute]));
        }) :
        returnValue.sort(function(a,b){
          return new Date(b[attribute]) - new Date(a[attribute]);
        });
    };
  }
})();

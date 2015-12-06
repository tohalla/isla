(function(){
  'use strict';
  angular.module('islaApp')
    .filter('orderObject', orderObject);

  function orderObject(){
    return function(items, params){
      var returnValue = [];
      angular.forEach(items, function(item){
        returnValue.push(item);
      });

      return returnValue.sort(function(a, b){
        var order;
        angular.forEach(params, function(param){
          param.attribute = typeof param.attribute !== 'undefined' ? param.attribute : 'id';
          param.reverse = typeof param.reverse !== 'undefined' ? param.reverse : false;
          if(param.type === 'time'){
            order = new Date(a[param.attribute]) < new Date(b[param.attribute]) ? 1 : -1;
          }
          else if(param.type === 'array'){
            order = a[param.attribute].length < b[param.attribute].length ? 1 : -1;
          }
          else{
            order = a[param.attribute] < b[param.attribute] ? 1 : -1;
          }
          return false;
        });
        return order;
      });
    };
  }
})();

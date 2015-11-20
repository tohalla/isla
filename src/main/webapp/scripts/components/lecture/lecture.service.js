'use strict';

angular.module('islaApp')
  .factory('Lecture', ['$rootScope', '$cookies', '$http', '$q'],
    function($rootScope, $cookies, $http, $q){
      var stompClient = null;
      var subscriber = null;
      var listener = $q.defer();
      var connected = $q.defer();
      var alreadyConnectedOnce = false;
    });

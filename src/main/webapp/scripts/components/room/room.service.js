'use strict';

angular.module('islaApp')
  .factory('Room', ['$rootScope', '$cookies', '$http', '$q',
    function($rootScope, $cookies, $http, $q){
      var stompClient = null;
      var subscriber = null;
      var listener = $q.defer();
      var connected = $q.defer();

      return{
        connect: function(){
          var loc = window.location;
          var url = '//' + loc.host + loc.pathname + 'websocket/room';
          var socket = new SockJS(url);
          stompClient = Stomp.over(socket);
          var headers = {};
          headers['X-CSRF-TOKEN'] = $cookies[$http.defaults.xsrfCookieName];
          stompClient.connect(headers, function(){
            connected.resolve('success');
          });
        },
        subscribe: function(){
          connected.promise.then(function(){
            subscriber = stompClient.subscribe('/topic/room', function(data){
              listener.notify(JSON.parse(data.body));
            }, null, null);
          });
        },
        unsubscribe: function() {
          if (subscriber !== null) {
            subscriber.unsubscribe();
          }
        },
        receive: function() {
          return listener.promise;
        },
        sendComment: function(comment){
          if(stompClient !== null){
            connected.promise.then(function(){
              stompClient
                .send('/topic/comment',
                {},
                JSON.stringify(comment));
            });
          }
        },
        disconnect: function() {
          if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
          }
        }
      };
  }]);

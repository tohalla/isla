(function(){
  'use strict';

  angular.module('islaApp')
    .factory('Room', ['$rootScope', '$cookies', '$http', '$q',
      function($rootScope, $cookies, $http, $q){
        var stompClient = null;
        var subscriber = null;
        var listener = $q.defer();
        var connected = $q.defer();

        var service = {
          connect: connect,
          subscribe: subscribe,
          unsubscribe: unsubscribe,
          receive: receive,
          sendComment: sendComment,
          disconnect: disconnect
        };

        return service;

        function connect(){
          var loc = window.location;
          var url = '//' + loc.host + loc.pathname + 'websocket/room';
          var socket = new SockJS(url);
          stompClient = Stomp.over(socket);
          var headers = {};
          headers['X-CSRF-TOKEN'] = $cookies[$http.defaults.xsrfCookieName];
          stompClient.connect(headers, function(){
            connected.resolve('success');
          });
        }
        function subscribe(){
          connected.promise.then(function(){
            subscriber = stompClient.subscribe('/topic/room', function(data){
              listener.notify(JSON.parse(data.body));
            }, null, null);
          });
        }
        function unsubscribe() {
          if (subscriber !== null) {
            subscriber.unsubscribe();
          }
        }
        function receive() {
          return listener.promise;
        }
        function sendComment(comment){
          if(stompClient !== null){
            connected.promise.then(function(){
              stompClient
                .send('/topic/comment',
                {},
                JSON.stringify(comment));
            });
          }
        }
        function disconnect() {
          if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
          }
        }
    }]);
})();

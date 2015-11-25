(function(){
  'use strict';

  angular.module('islaApp')
    .factory('roomService', roomService);

  roomService.$inject = [
    '$rootScope',
    '$cookies',
    '$http',
    '$q',
    'Lecture'
  ];

  function roomService(
    $rootScope,
    $cookies,
    $http,
    $q,
    Lecture
  ){
    var stompClient = null;
    var subscriber = null;
    var listener = $q.defer();

    var service = {
      connect: connect,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      receive: receive,
      sendComment: sendComment,
      disconnect: disconnect,
      initialize: initialize,
      loadComments: loadComments,
      commentsLoaded: $q.defer(),
      comments: []
    };

    return service;

    function connect(){
      var loc = window.location;
      var url = '//' + loc.host + loc.pathname + 'websocket/room/';
      var socket = new SockJS(url);
      stompClient = Stomp.over(socket);
      var headers = {};
      headers['X-CSRF-TOKEN'] = $cookies[$http.defaults.xsrfCookieName];
      return $q(function(resolve, reject){
        stompClient.connect(headers,
          function(){
            resolve('connected');
          },
          function(){
            reject('couldn\'t connect');
          }
        );
      });
    }
    function subscribe(){
      subscriber = stompClient.subscribe('/topic/room/'+service.lectureId, function(data){
        listener.notify(JSON.parse(data.body));
      }, null, null);
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
        stompClient
          .send('/topic/comment/'+service.lectureId,
          {},
          JSON.stringify(comment));
      }
    }
    function disconnect() {
      if (stompClient !== null) {
        stompClient.disconnect();
        stompClient = null;
      }
    }
    function initialize(lectureId){
      return $q(function(resolve, reject){
        service.lectureId = lectureId;
        if(service.lectureId !== null && service.lectureId >= 0){ //should also check if lecture is open
          Lecture.get({id:lectureId}, function() {
            resolve('subscribed');
          },function(){
            reject('invalid lectureId');
          });
        }else{
          reject('invalid lectureId');
        }
      });
    }
    function loadComments(){
      Lecture.getComments({lectureId: service.lectureId}, function(result){
        service.comments = result;
        service.commentsLoaded.resolve('comments loaded');
      });
    }
  }
})();

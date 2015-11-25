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

    var service = {
      connect: connect,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      sendComment: sendComment,
      disconnect: disconnect,
      initialize: initialize,
      addComment: addComment,
      loadComments: loadComments,
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
      var deferred = $q.defer();
      subscriber = stompClient.subscribe('/topic/room/'+service.lectureId, function(data){
        deferred.resolve();
        refer(JSON.parse(data.body));
      }, function(){
        deferred.reject();
        refer({content: 'error reading the message'});
      }, null);

      function refer(data){
        deferred.promise.then(function(){
          service.addComment(data);
        }/* ,TODO:function(){error}*/);
      }
    }
    function addComment(comment){
      service.comments.push(comment);
    }
    function unsubscribe() {
      if (subscriber !== null) {
        subscriber.unsubscribe();
      }
    }
    function sendComment(comment){
      stompClient
        .send('/topic/comment/'+service.lectureId,
        {},
        JSON.stringify(comment));
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
            reject({
              msg: 'error.invalidLecture',
              params: {lectureId: lectureId}
            });
          });
        }else{
          reject({
            msg: 'error.invalidLecture',
            params: {lectureId: lectureId}
          });
        }
      });
    }
    function loadComments(){
      service.comments.splice(0, service.comments.length);
      Lecture.getComments({lectureId: service.lectureId}, function(result){
        angular.extend(service.comments, result);
      });
    }
  }
})();

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
    var commentSubscriber = null;
    var commentLikesSubscriber = null;

    var service = {
      connect: connect,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      sendComment: sendComment,
      disconnect: disconnect,
      initialize: initialize,
      addComment: addComment,
      loadComments: loadComments,
      likeComment: likeComment,
      comments: {}
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
      subscribeComments();
      subscribeCommentLikes();
    }
    function subscribeComments(){
      var deferred = $q.defer();
      commentSubscriber = stompClient.subscribe('/topic/room/'+service.lectureId, function(data){
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
    function subscribeCommentLikes(){
      var deferred = $q.defer();
      commentLikesSubscriber = stompClient.subscribe('/topic/room/'+service.lectureId+'/likes',
        function(data){
          deferred.resolve();
          refer(JSON.parse(data.body));
        }, function(){
          deferred.reject();
          refer({content: 'error reading the message'});
        },
      null);

      function refer(data){
        deferred.promise.then(function(){
          service.comments[data.commentId].likes.push(data.userSid);
        }/* ,TODO:function(){error}*/);
      }
    }
    function addComment(comment){
      comment.likes = typeof comment.likes !== 'undefined' ? comment.likes : [];
      service.comments[comment.id] = comment;
    }
    function unsubscribe() {
      if (commentSubscriber !== null) {
        commentSubscriber.unsubscribe();
      }
    }
    function sendComment(comment){
      stompClient
        .send('/topic/comment/'+service.lectureId,
        {},
        JSON.stringify(comment));
    }
    function likeComment(commentId){
      stompClient
        .send('/topic/comment/'+service.lectureId+'/'+commentId,
        {});
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
      Lecture.getComments({lectureId: service.lectureId}, function(result){
        service.comments = {};
        angular.forEach(result, function(item){
          service.comments[item.id] = item;
        });
      });
    }
  }
})();

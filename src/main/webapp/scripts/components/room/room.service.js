(function() {
  'use strict';

  angular.module('islaApp')
    .factory('roomService', roomService);

  function roomService(
    $rootScope,
    $cookies,
    $http,
    $q,
    $window,
    Lecture,
    Course,
    Principal
  ) {
    var stompClient = null;
    var commentSubscriber = null;
    var moderators = [];
    var isModerator = false;

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
      moderators: moderators,
      isModerator: isModerator,
      comments: {}
    };

    return service;

    function connect() {
      var loc = $window.location;
      var url = '//' + loc.host + loc.pathname + 'websocket/room/';
      var socket = new SockJS(url);
      stompClient = Stomp.over(socket);
      var headers = {};
      headers['X-CSRF-TOKEN'] = $cookies[$http.defaults.xsrfCookieName];
      return $q(function(resolve, reject) {
        stompClient.connect(headers,
          function() {
            resolve('connected');
          },
          function() {
            reject('couldn\'t connect');
          }
        );
      });
    }
    function subscribe() {
      subscribeComments();
      subscribeCommentActions();
    }
    function subscribeComments() {
      var deferred = $q.defer();
      commentSubscriber =
        stompClient.subscribe(
          '/topic/room/' + service.lectureId,
          function(data) {
            deferred.resolve();
            refer(angular.fromJson(data.body));
          }, function() {
            deferred.reject();
            refer({content: 'error reading the message'});
          }, null);

      function refer(data) {
        deferred.promise.then(function() {
          service.addComment(data);
        });
        /* ,TODO: error*/
      }
    }
    function subscribeCommentActions() {
      var deferred = $q.defer();
      stompClient.subscribe('/topic/room/' + service.lectureId + '/actions',
        function(data) {
          deferred.resolve();
          refer(angular.fromJson(data.body));
        }, function() {
          deferred.reject();
          refer({content: 'error reading the message'});
        }, null
      );

      function refer(data) {
        deferred.promise.then(function() {
          service.comments[data.commentId].likes.push(data.userSid);
        });
      }
    }
    function addComment(comment) {
      comment.likes = angular.isDefined(comment.likes) ? comment.likes : [];
      service.comments[comment.id] = comment;
    }
    function unsubscribe() {
      if (commentSubscriber !== null) {
        commentSubscriber.unsubscribe();
      }
    }
    function sendComment(comment) {
      stompClient
        .send('/topic/comment/' + service.lectureId,
        {},
        angular.toJson(comment));
    }
    function likeComment(commentId) {
      stompClient
        .send('/topic/comment/' + service.lectureId + '/' + commentId + '/like',
        {});
    }
    function disconnect() {
      if (stompClient !== null) {
        stompClient.disconnect();
        stompClient = null;
      }
    }
    function initialize(lectureId) {
      service.comments = {};
      return $q(function(resolve, reject) {
        service.lectureId = lectureId;
        // should also check if lecture is open
        if (service.lectureId !== null && service.lectureId >= 0) {
          Lecture.get({id: lectureId}, function(lecture) {
            moderators = Course.getModerators({courseId: lecture.course.id});
            console.log(Principal._identity)
            resolve('subscribed');
          },
          function() {
            reject({
              msg: 'error.invalidLecture',
              params: {lectureId: lectureId}
            });
          });
        } else {
          reject({
            msg: 'error.invalidLecture',
            params: {lectureId: lectureId}
          });
        }
      });
    }
    function loadComments() {
      service.comments = {};
      Lecture.getComments({lectureId: service.lectureId}, function(result) {
        angular.forEach(result, function(item) {
          service.comments[item.id] = item;
        });
      });
    }
  }
})();

(function(){
  'use strict';

  angular.module('islaApp')
    .factory('commentService', roomService);

  roomService.$inject = [
    '$scope',
    'Comment'
  ];

  function roomService($scope, Comment){

    var service = {
      getComments: getComments,
      deleteComments: deleteComments
    };

    return service;

    function getComments(parameters){
      parameters = typeof parameters !== 'undefined' ? parameters : {};
      var comments = [];
      Comment.query(parameters,
        function(result){
          comments = result;
        });
      return comments;
    }
    function deleteComments(parameters){
      if(parameters !== null){
        Comment.delete(parameters);
      }
    }
  }
})();

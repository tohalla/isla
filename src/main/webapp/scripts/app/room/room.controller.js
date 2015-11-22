(function(){
  'use strict';
  angular.module('islaApp')
  .controller('RoomController', ['$scope','$cookies','$http','Room',
    function ($scope, $cookies, $http, Room) {
      var vm = this;

      vm.comments = [];


      vm.test = '1234';

      vm.sendComment = sendComment;
      vm.showComment = showComment;

      Room.connect();
      Room.subscribe();


      Room.receive().then(null, null, function(comment){
        showComment(comment);
      });


      Room.sendComment({'content':'test'});

      function showComment(comment){
        var existingComment = false;
        for(var index = 0; index < vm.comments.length; index++){
          if(vm.comments[index].sessionId === comment.sessionId){
            existingComment = true;
            vm.comments[index] = comment;
          }
        }
        if(!existingComment){
          vm.comments.push(comment);
        }
      }
      function sendComment(){
        alert(123);
        Room.sendComment(vm.messageText);
      }
    }]
  );
}());

(function(){
  'use strict';
  angular.module('islaApp')
    .directive('islaComment', islaComment);

  function islaComment() {
    var directive = {
      $scope: {
        comment: '@'
      },
      restrict: 'E',
      transclude: true,
      templateUrl: 'scripts/components/room/comment.directive.html',
    };

    return directive;
  }
})();

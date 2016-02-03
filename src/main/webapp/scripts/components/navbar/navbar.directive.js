(function() {
  'use strict';
  angular.module('islaApp')
    .directive('islaNavbar', islaNavbar);

  function islaNavbar() {
    var directive = {
      scope: {
      },
      restrict: 'E',
      templateUrl: 'scripts/components/navbar/navbar.directive.html',
      controller: 'NavbarController',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
})();

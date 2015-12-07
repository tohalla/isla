(function(){
  'use strict';
  angular.module('islaApp')
    .directive('islaNavbarPlain', islaNavbarPlain);

  function islaNavbarPlain(){
    var directive = {
      scope: {},
      restrict: 'E',
      templateUrl: 'scripts/components/navbar/navbar-plain.directive.html',
      controller: 'NavbarController',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
})();

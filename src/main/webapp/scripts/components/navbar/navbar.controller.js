(function() {
  'use strict';
  angular.module('islaApp')
    .controller('NavbarController', NavbarController);

  function NavbarController(
    $scope,
    $location,
    $state,
    $rootScope,
    Auth,
    Principal,
    ENV
  ) {
    var vm = this;
    vm.isAuthenticated = Principal.isAuthenticated;
    vm.$state = $state;
    vm.inProduction = ENV === 'prod';
    vm.back = $rootScope.back;
    vm.logout = logout;
    vm.accountMenu = false;

    function logout() {
      Auth.logout();
      $state.go('home');
    }
  }
})();

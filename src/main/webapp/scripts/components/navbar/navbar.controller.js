(function(){
  'use strict';
  angular.module('islaApp')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = [
    '$scope',
    '$location',
    '$state',
    '$rootScope',
    'Auth',
    'Principal',
    'ENV'
  ];
  function NavbarController(
    $scope,
    $location,
    $state,
    $rootScope,
    Auth,
    Principal,
    ENV
  ) {
    this.isAuthenticated = Principal.isAuthenticated;
    this.$state = $state;
    this.inProduction = ENV === 'prod';
    this.back = $rootScope.back;
    this.logout = logout;
    this.accountMenu = false;

    function logout() {
      Auth.logout();
      $state.go('home');
    }
  }
}());

'use strict';

angular.module('islaApp')
  .controller('LoginController', function(
    $rootScope,
    $scope,
    $state,
    $timeout,
    Auth
  ) {
    var vm = this;
    vm.user = {};
    vm.errors = {};

    vm.rememberMe = true;
    vm.login = function(event) {
      event.preventDefault();
      Auth.login({
        username: vm.username,
        password: vm.password,
        rememberMe: vm.rememberMe
      }).then(function() {
        vm.authenticationError = false;
        if ($rootScope.previousStateName === 'register') {
          $state.go('home');
        } else {
          $rootScope.back();
        }
      }).catch(function() {
        vm.authenticationError = true;
      });
    };
    $timeout(function() {
      angular.element('[ng-model="username"]').focus();
    });
  });

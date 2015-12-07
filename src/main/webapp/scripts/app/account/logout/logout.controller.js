'use strict';

angular.module('islaApp')
  .controller('LogoutController', function (Auth, $state) {
    Auth.logout();
    $state.go('home');
  });

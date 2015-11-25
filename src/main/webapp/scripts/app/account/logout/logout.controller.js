'use strict';

angular.module('islaApp')
  .controller('LogoutController', function (Auth) {
    Auth.logout();
  });

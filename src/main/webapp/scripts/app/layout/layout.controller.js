(function() {
  'use strict';
  angular.module('islaApp')
    .controller('MainController', function($scope, Principal) {
      var vm = this;
      Principal.identity().then(function(account) {
        vm.account = account;
        vm.isAuthenticated = Principal.isAuthenticated;
      });
    });
})();

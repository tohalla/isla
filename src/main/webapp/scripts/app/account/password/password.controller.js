'use strict';

angular.module('islaApp')
  .controller('PasswordController', function($scope, Auth, Principal) {
    var vm = this;
    Principal.identity().then(function(account) {
      vm.account = account;
    });

    vm.success = null;
    vm.error = null;
    vm.doNotMatch = null;
    vm.changePassword = function() {
      if (vm.password === vm.confirmPassword) {
        vm.doNotMatch = null;
        Auth.changePassword(vm.password).then(function() {
          vm.error = null;
          vm.success = 'OK';
        }).catch(function() {
          vm.success = null;
          vm.error = 'ERROR';
        });
      } else {
        vm.doNotMatch = 'ERROR';
      }
    };
  });

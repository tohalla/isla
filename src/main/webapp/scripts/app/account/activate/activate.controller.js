'use strict';

angular.module('islaApp')
  .controller('ActivationController', function($scope, $stateParams, Auth) {
    var vm = this;
    Auth.activateAccount({key: $stateParams.key}).then(function() {
      vm.error = null;
      vm.success = 'OK';
    }).catch(function() {
      vm.success = null;
      vm.error = 'ERROR';
    });
  });


'use strict';

angular.module('islaApp')
  .controller('HealthModalController',
    function(
      $scope,
      $modalInstance,
      currentHealth,
      baseName,
      subSystemName
    ) {
      $scope.currentHealth = currentHealth;
      $scope.baseName = baseName;
      $scope.subSystemName = subSystemName;

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    });

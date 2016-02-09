(function() {
  'use strict';
  angular.module('islaApp')
    .controller('CourseController', CourseController);

  function CourseController(
    $scope,
    $stateParams,
    Course,
    Lecture,
    Principal
  ) {
    var vm = this;
    vm.ableToAdd = Principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_TEACHER']);

    vm.update = function() {
      if (angular.isDefined($stateParams.courseId)) {
        vm.courseData = Course.get({id: $stateParams.courseId},
          function(course) {
            Course.getLectures({courseId: course.id}, function(lectures) {
              vm.courseData.lectures = lectures;
            });
          }
        );
      } else {
        vm.courseData = Course.query();
      }
    };
    vm.update();

    $scope.$watch(vm.courseData);
  }
})();

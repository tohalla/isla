(function() {
  'use strict';
  angular.module('islaApp')
    .controller('CourseController', CourseController);

  CourseController.$inject = [
    '$scope',
    '$stateParams',
    'Course',
    'Lecture',
    'Principal'
  ];

  function CourseController(
    $scope,
    $stateParams,
    Course,
    Lecture,
    Principal
  ) {
    var vm = this;
    vm.ableToAdd = Principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_TEACHER']);

    function save(course) {
      Course.get({id: vm.course}, function(course) {
        vm.lecture.course = course;
        Lecture.save(vm.lecture, function() {
          clear();
        });
      });
    }
    if (typeof $stateParams.courseId === 'undefined') {
      vm.courseData = Course.query();
    } else {
      vm.courseData = Course.get({id: $stateParams.courseId}, function(course) {
        Course.getLectures({courseId: course.id}, function(lectures) {
          vm.courseData.lectures = lectures;
        });
      });
    }

    $scope.$watch(vm.courseData);
  }
})();

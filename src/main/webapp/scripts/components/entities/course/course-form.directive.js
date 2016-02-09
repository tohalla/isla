(function() {
  'use strict';

  angular.module('islaApp')
    .directive('islaCourseForm', islaCourseForm);

  function islaCourseForm() {
    var directive = {
      scope: {
        handleAddition: '&'
      },
      restrict: 'E',
      templateUrl: 'scripts/components/entities/course/course-form.directive.html',
      controller: CourseFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
  function CourseFormController(Course) {
    var vm = this;
    vm.save = save;

    vm.course = {
      courseName: '',
      courseDescription: ''
    };
    function save() {
      Course.save(vm.course, function() {
        clear();
        vm.handleAddition();
      });
    }

    function clear() {
      for (var prop in vm.course) {
        if (vm.course.hasOwnProperty(prop)) {
          vm.course[prop] = '';
        }
      }
    }
  }
})();

(function() {
  'use strict';

  angular.module('islaApp')
    .directive('islaLectureForm', islaLectureForm);

  function islaLectureForm() {
    var directive = {
      scope: {
        course: '@course'
      },
      restrict: 'E',
      templateUrl:
        'scripts/components/entities/lecture/lecture-form.directive.html',
      controller: LectureFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
  function LectureFormController(
    $translate,
    $translatePartialLoader,
    Lecture,
    Course
  ) {
    $translatePartialLoader.addPart('lecture');
    $translate.refresh();
    var vm = this;
    vm.save = save;

    vm.lecture = {
      description: '',
      courseId: ''
    };

    function save() {
      Course.get({id: vm.course}, function(course) {
        vm.lecture.course = course;
        Lecture.save(vm.lecture, function() {
          clear();
        });
      });
    }

    function clear() {
      for (var prop in vm.lecture) {
        if (vm.lecture.hasOwnProperty(prop)) {
          vm.lecture[prop] = '';
        }
      }
    }
  }
})();

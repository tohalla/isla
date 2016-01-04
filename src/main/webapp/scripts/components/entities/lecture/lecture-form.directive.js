(function(){
  'use strict';

  angular.module('islaApp')
    .directive('islaLectureForm', islaLectureForm);

  function islaLectureForm() {
    var directive = {
      scope: {
        course: '@course'
      },
      restrict: 'E',
      templateUrl: 'scripts/components/entities/lecture/lecture-form.directive.html',
      controller: LectureFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
  LectureFormController.$inject = ['$translate', '$translatePartialLoader', 'Lecture', 'Course'];
  function LectureFormController($translate, $translatePartialLoader, Lecture, Course){
    $translatePartialLoader.addPart('lecture');
    $translate.refresh();
    /*jshint validthis: true */
    var vm = this;
    vm.save = save;

    vm.lecture = {
      description: '',
      courseId: ''
    };

    function save(course){
      Course.get({id:vm.course}, function(course){
        vm.lecture.course = course;
        Lecture.save(vm.lecture, function(){
          clear()
        });
      });
    }

    function clear(){
      for(var prop in vm.lecture){
        vm.lecture[prop] = '';
      }
    }
  }
})();

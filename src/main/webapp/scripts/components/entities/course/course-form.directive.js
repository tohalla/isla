(function(){
  'use strict';

  angular.module('islaApp')
    .directive('islaCourseForm', islaCourseForm);

  function islaCourseForm() {
    var directive = {
      scope: {} ,
      restrict: 'E',
      templateUrl: 'scripts/components/entities/course/course-form.directive.html',
      controller: CourseFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
  CourseFormController.$inject = ['Course'];
  function CourseFormController(Course){
    /*jshint validthis: true */
    var vm = this;
    vm.save = save;

    vm.course = {
      courseName: '',
      courseDescription: ''
    };
    function save(){
      Course.save(vm.course , function(){
        clear()
      });
    }

    function clear(){
      for(var prop in vm.course){
        vm.course[prop] = '';
      }
    }
  }
})();

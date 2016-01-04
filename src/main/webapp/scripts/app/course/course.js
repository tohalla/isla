(function(){
  'use strict';
  angular.module('islaApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('courses',{ //temporal, will be replaced when tags implemented
      parent: 'contained',
      url: '/course',
      views: {
        'content': {
          templateUrl: 'scripts/app/course/course-list.html',
          controller: 'CourseController',
          controllerAs: 'course'
        }
      },resolve: {
        mainTranslatePartialLoader:
          function($translate, $translatePartialLoader){
            $translatePartialLoader.addPart('course');
            return $translate.refresh();
          }
      }
    })
    .state('course',{ //temporal, will be replaced when tags implemented
      parent: 'contained',
      url: '/course/{courseId}',
      views: {
        'content': {
          templateUrl: 'scripts/app/course/course.html',
          controller: 'CourseController',
          controllerAs: 'course'
        }
      },resolve: {
        mainTranslatePartialLoader:
          function($translate, $translatePartialLoader){
            $translatePartialLoader.addPart('course');
            return $translate.refresh();
          }
      }
    });
  }]);
}());

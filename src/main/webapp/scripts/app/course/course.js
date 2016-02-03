'use strict';
(function() {
  angular
    .module('islaApp')
    .config(function($stateProvider) {
      $stateProvider
      // temporal, will be replaced when tags implemented
      .state('courses', {
        parent: 'contained',
        url: '/course',
        views: {
          content: {
            templateUrl: 'scripts/app/course/course-list.html',
            controller: 'CourseController',
            controllerAs: 'course'
          }
        },
        resolve: {
          mainTranslatePartialLoader:
            function($translate, $translatePartialLoader) {
              $translatePartialLoader.addPart('course');
              return $translate.refresh();
            }
        }
      })
      .state('course', {
        parent: 'contained',
        url: '/course/{courseId}',
        views: {
          content: {
            templateUrl: 'scripts/app/course/course.html',
            controller: 'CourseController',
            controllerAs: 'course'
          }
        },
        resolve: {
          mainTranslatePartialLoader:
            function($translate, $translatePartialLoader) {
              $translatePartialLoader.addPart('course');
              return $translate.refresh();
            }
        }
      });
    });
})();

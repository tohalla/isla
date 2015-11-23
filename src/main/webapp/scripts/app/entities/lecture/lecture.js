'use strict';

angular.module('islaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lecture', {
        parent: 'entity',
        url: '/lectures',
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'islaApp.lecture.home.title'
        },
        views: {
          'content@': {
            templateUrl: 'scripts/app/entities/lecture/lectures.html',
            controller: 'LectureController'
          }
        },
        resolve: {
          translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('lecture');
            $translatePartialLoader.addPart('global');
            return $translate.refresh();
          }]
        }
      })
      .state('lecture.detail', {
        parent: 'entity',
        url: '/lecture/{id}',
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'islaApp.lecture.detail.title'
        },
        views: {
          'content@': {
            templateUrl: 'scripts/app/entities/lecture/lecture-detail.html',
            controller: 'LectureDetailController'
          }
        },
        resolve: {
          translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('lecture');
            return $translate.refresh();
          }],
          entity: ['$stateParams', 'Lecture', function($stateParams, Lecture) {
            return Lecture.get({id : $stateParams.id});
          }]
        }
      })
      .state('lecture.new', {
        parent: 'lecture',
        url: '/new',
        data: {
          authorities: ['ROLE_USER'],
        },
        onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
          $modal.open({
            templateUrl: 'scripts/app/entities/lecture/lecture-dialog.html',
            controller: 'LectureDialogController',
            size: 'lg',
            resolve: {
              entity: function () {
                return {createdAt: null, startsAt: null, closesAt: null, description: null, id: null};
              }
            }
          }).result.then(function(result) {
            $state.go('lecture', null, { reload: true });
          }, function() {
            $state.go('lecture');
          })
        }]
      })
      .state('lecture.edit', {
        parent: 'lecture',
        url: '/{id}/edit',
        data: {
          authorities: ['ROLE_USER'],
        },
        onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
          $modal.open({
            templateUrl: 'scripts/app/entities/lecture/lecture-dialog.html',
            controller: 'LectureDialogController',
            size: 'lg',
            resolve: {
              entity: ['Lecture', function(Lecture) {
                return Lecture.get({id : $stateParams.id});
              }]
            }
          }).result.then(function(result) {
            $state.go('lecture', null, { reload: true });
          }, function() {
            $state.go('^');
          })
        }]
      });
  });

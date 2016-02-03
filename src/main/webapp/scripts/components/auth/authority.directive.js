'use strict';
angular.module('islaApp')
  .directive('hasAnyAuthority', function(Principal) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var setVisible = function() {
          element.removeClass('hidden');
        };
        var setHidden = function() {
          element.addClass('hidden');
        };
        var defineVisibility = function(reset) {
          var result;
          if (reset) {
            setVisible();
          }

          result = Principal.hasAnyAuthority();
          if (result) {
            setVisible();
          } else {
            setHidden();
          }
        };
        var authorities = attrs.hasAnyAuthority.replace(/\s+/g, '').split(',');

        if (authorities.length > 0) {
          defineVisibility(true);
        }
      }
    };
  })
  .directive('hasAuthority', function(Principal) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var authority = attrs.hasAuthority.replace(/\s+/g, '');
        var setVisible = function() {
          element.removeClass('hidden');
        };
        var setHidden = function() {
          element.addClass('hidden');
        };
        var defineVisibility = function(reset) {
          if (reset) {
            setVisible();
          }
          Principal.hasAuthority(authority)
            .then(function(result) {
              if (result) {
                setVisible();
              } else {
                setHidden();
              }
            });
        };

        if (authority.length > 0) {
          defineVisibility(true);
        }
      }
    };
  });

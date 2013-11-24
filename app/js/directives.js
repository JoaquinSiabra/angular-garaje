'use strict';

/* Directives */

var garajeDirectives = angular.module('garajeDirectives', []);

garajeDirectives.directive('goClick', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'goClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
});
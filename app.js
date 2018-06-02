var app = angular.module('app',['ngAnimate','ngRoute','ui.bootstrap','ngPatternRestrict']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});


  }]);
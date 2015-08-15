var myApp = angular.module("myApp",['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './../partials/home.html'
    })
    .when('/events/new', {
      templateUrl: './../partials/new.html'
    })
    .when('/events/demo', {
      templateUrl: './../partials/demo.html'
    })
    .when('/events/:id', {
      templateUrl: './../partials/show.html'
    })
    .when('/events/:id/edit', {
      templateUrl: './../partials/edit.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});
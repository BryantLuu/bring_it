myApp.controller('HomeController', function($scope, eventFactory, $routeParams, $timeout){
  $scope.events = [];
  updateEvents();

  function updateEvents(){
    eventFactory.getEvents(function(output){
      $scope.events = output;
      console.log("this is output " + output[1].host);
      var pagesShown = 1;
      var pageSize = 2;
      $scope.paginationLimit = function() {
        return pageSize * pagesShown;
      };
      $scope.hasMoreToShow = function() {
        return pagesShown < ($scope.events.length / pageSize);
      };
      $scope.showMore = function() {
        pagesShown = pagesShown + 1;
      };
    })
  }

})
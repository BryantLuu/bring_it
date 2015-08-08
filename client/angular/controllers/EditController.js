myApp.controller('EditController', function($scope, eventFactory, $routeParams, $timeout){
  $scope.event = {};
  $scope.items = [];
  updateEvent();

  function updateEvent(){
    eventFactory.getEvent($routeParams.id, function (output){
      console.log($routeParams.id);
      $scope.event = output;
      addItemArray();
    })
  }

  $scope.updateEvent = function(){
    var newEvent = {
      title: $scope.event.title,
      description: $scope.event.description,
      date: $scope.event.date,
      time: $scope.event.time,
      _id: $scope.event._id,
      items: $scope.event.items
    }
    eventFactory.updateEvent(newEvent, function(output){
      updateEvents();
      newEvent = {};
    })
  }

  $scope.removeNewItem = function(id){
    $scope.items.splice(id,1);
  }
})
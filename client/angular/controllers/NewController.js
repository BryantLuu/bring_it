myApp.controller('NewController', function($scope, eventFactory, $routeParams, $location){ 
  $scope.items = [];
  
  $scope.addItem = function(){
    $scope.items.push({
      name: $scope.newItem.name,
      quantity: $scope.newItem.quantity
    });

    $scope.newItem.quantity = "";
    $scope.newItem.name = "";
  }

  $scope.addEvent = function(items){
    $scope.newEvent.items = items;
    eventFactory.addEvent($scope.newEvent, function(output){
      console.log(output);
      $scope.newEvent = {};
      $location.path("/events/"+output._id);
    })
  }

  $scope.removeNewItem = function(id){
    $scope.items.splice(id,1);
  }

})
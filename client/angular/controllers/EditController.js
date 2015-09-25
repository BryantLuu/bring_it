myApp.controller('EditController', function($scope, eventFactory, $routeParams, $timeout){
  $scope.event = {};
  $scope.items = [];
  $scope.id = $routeParams.id;
  updateEvent();

  function updateEvent(){
    console.log('hello');
    eventFactory.getEvent($routeParams.id, function (output){
      console.log($routeParams.id);
      $scope.event = output;
      addItemArray();
    })
  }

  function addItemArray(){
    for (var i in $scope.event.items){
      var itemArray = [];
      for (var j=1; j < $scope.event.items[i].quantity+1; j++){
        itemArray.push(j);
      }
      $scope.event.items[i].itemArray = itemArray;
      console.log($scope.event.items[i]);
    }
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

    console.log('do this');
    eventFactory.updateEvent(newEvent, function(output){
      console.log('hi', output);
      updateEvents();
      newEvent = {};
    })
  }
  $scope.addItem = function(){
    $scope.event.items.push({
      name: $scope.newItem.name,
      quantity: $scope.newItem.quantity
    });

    $scope.newItem.quantity = "";
    $scope.newItem.name = "";
  }

  $scope.removeNewItem = function(id){
    $scope.event.items.splice(id,1);
  }
})
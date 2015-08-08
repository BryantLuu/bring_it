myApp.controller('ShowController', function($scope, eventFactory, $routeParams, $timeout){
  $scope.event = {};
  $scope.itemClaim = {};
  updateEvent();
  

  function updateEvent(){
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

  $scope.turnOn = function(item){
    for (var i in $scope.event.items){
      if ($scope.event.items[i].name == item){
        $scope.event.items[i].truth = true;
      }
    }
  }
  $scope.turnOff = function(item){
    for (var i in $scope.event.items){
      if ($scope.event.items[i].name == item){
        $scope.event.items[i].truth = false;
      }
    };
  }

  $scope.claimItem = function(item, id){
    for (var i in $scope.event.items){
      if ($scope.event.items[i].name == item){
        if (typeof $scope.event.items[i].claims == 'undefined'){
          $scope.event.items[i].claims = [];  
        }
        $scope.event.items[i].claims.push($scope.itemClaim);
        // update in database
        console.log($scope.event.items);
        eventFactory.claimItem($scope.event._id, $scope.event.items)
        $scope.event.items[i].truth = false;
        
        var length = $scope.event.items[id].claims.length -1;
        socket.emit('toast', $scope.itemClaim.name + " is bringing "+" "+$scope.event.items[id].claims[length].quantity+" "+$scope.event.items[id].claims[length].description+" to " + $scope.event.title);
        $scope.itemClaim = {};
      }
    }
  }

  $scope.hasMoreItems = function(item){
    var total =0;
    for (var i in $scope.event.items){
      if ($scope.event.items[i].name == item.name){
        if (typeof $scope.event.items[i].claims == 'undefined'){
          return false
        } else {
          for(var j in $scope.event.items[i].claims){
            total+=parseInt($scope.event.items[i].claims[j].quantity);
          }
        }
      }
    }

    if(total>= item.quantity){
      return true;
    } else {
      return false;
    }
  }





})
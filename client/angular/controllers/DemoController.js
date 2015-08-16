myApp.controller('DemoController', function($scope, eventFactory, $routeParams, $timeout){
  $scope.event = {host: 'Bryant', title: 'Thanksgiving with Friends', description: "Friendsgiving Potluck",
    items:[
            { "name" : "Turkey",
              "quantity" : 1,
              "itemArray" : [1],
              "truth" : false,
              "claims" : [
                            {
                              "name" : "Ivan",
                              "quantity" : 1,
                              "description" : "Fat bird" 
                            }
                          ]
            },
            { "name" : "Games ",
              "quantity" : 10,
              "itemArray" : [1,2,3,4,5,6,7,8,9,10],
              "truth" : false,
              "claims" : [
                            {
                              "name" : "Sammie",
                              "quantity" : 3,
                              "description" : "Settlers of Catan, Dominion, Liar's Dice" 
                            },
                            {
                              "name" : "Matthew",
                              "quantity" : 3,
                              "description" : "Race to the Galexy, Space Alert, 7 Wonders" 
                            },
                            {
                              "name" : "Bryant",
                              "quantity" : 1,
                              "description" : "Smash Brothers Melee, the only game you need"
                            }
                          ]
            },
            { "name" : "Servings of Other Meats ",
              "quantity" : 5,
              "itemArray" : [1,2,3,4,5],
              "truth" : false,
              "claims" : [
                            {
                              "name" : "Scott",
                              "quantity" : 2,
                              "description" : "Bacon Pancakes"
                            },
                            {
                              "name" : "Kim",
                              "quantity" : 2,
                              "description" : "Salmon and Tuna Sashimi" 
                            },
                            {
                              "name" : "Eric",
                              "quantity" : 1,
                              "description" : "Honey ham!"
                            }
                          ]
            },
            { "name" : "Other Appetizers",
              "quantity" : 4,
              "itemArray" : [1,2,3,4],
              "truth" : false,
              "claims" : [
                            {
                              "name" : "Hung",
                              "quantity" : 1,
                              "description" : "Corn on the cob" 
                            },
                            {
                              "name" : "Kim",
                              "quantity" : 1,
                              "description" : "Signature Sushi Bake!" 
                            },
                            {
                              "name" : "Will",
                              "quantity" : 1,
                              "description" : "Mac and Cheese"
                            }
                          ]
            },
            { "name" : "Desserts",
              "quantity" : 3,
              "itemArray" : [1,2,3],
              "truth" : false,
              "claims" : [
                            {
                              "name" : "Dexter",
                              "quantity" : 1,
                              "description" : "Mochi Ice Cream"
                            },
                            {
                              "name" : "Randy",
                              "quantity" : 1,
                              "description" : "Neapolitan ice cream " 
                            },
                            {
                              "name" : "Lenny",
                              "quantity" : 1,
                              "description" : "Pumpkin Pie" 
                            }
                          ]
            },
            { "name" : "Bottles of Liquor",
              "quantity" : 3,
              "itemArray" : [1,2,3],
              "truth" : false,
              "claims" : [
                            {
                              "name" : "Bryant",
                              "quantity" : 1,
                              "description" : "Macallan 1939" 
                            },
                            {
                              "name" : "Eevon",
                              "quantity" : 1,
                              "description" : "Henri Jayer Richebourg Grand Cru, Cote de Nuits, France"

                            },
                            {
                              "name" : "Matt",
                              "quantity" : 1,
                              "description" : "Handle of Captain Morgan" 
                            }
                          ]
            }
            
          ]}
  $scope.itemClaim = {};
  $scope.date = new Date();

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
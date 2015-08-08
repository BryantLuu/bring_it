myApp.factory('eventFactory', function($http){
  var events = [];
  var factory = {};

  factory.getEvent = function(id, callback){
    $http.get('/event/'+id).success(function(output){
      events = output;
      callback(events);
    })
  }

  factory.addEvent = function(info, callback){
    $http.post('/addEvent', info).success(function(result){
      callback(result);
    })
  }

  factory.updateEvent = function(info, callback){
    $http.post('/updateEvent', info).success(function(result){
      $http.get('/events').success(function(output){
      events = output;
      })
      callback(events);
    })
  }

  factory.claimItem = function(id, array){
    var post = {};
    post.id = id;
    post.array = array;
    $http.post('/claimItem', post).success(function(result){
      
    })
  }

  return factory;
})
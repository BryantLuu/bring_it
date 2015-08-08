var events = require('./../server/controllers/events.js');

module.exports = function(app){
  app.get('/', function (req, res){
    res.render('index');
  })

  app.get('/event/:id', function(req,res){
    events.show(req,res);
  })

  // app.get('/getEvent', function(req,res){
  //   events.showOne(req,res);
  // })

  app.post('/addEvent', function(req,res){
    events.add(req,res);
  })

  // app.post('/updateEvent', function(req,res){
  //   events.update(req,res);
  // })

  app.post('/claimItem', function(req,res){
    events.claimItem(req,res);
  })
  
  // app.get('/user', function(req,res){
  //   users.show(req,res);
  // })
};
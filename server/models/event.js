var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
  host: String,
  title: String,
  description: String,
  date: Date,
  time: String,
  items: [],
})

mongoose.model('Event', EventSchema);
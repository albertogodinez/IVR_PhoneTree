var mongoose = require('mongoose');


//CHANGE DURATION TO INTEGER OR TIME!!!!!
var Caller = new mongoose.Schema({
  phoneNumber: String,
  duration: String,
  startTime:   String,
  endTime:   String
});

var caller = mongoose.model('caller', Caller);
module.exports = caller;
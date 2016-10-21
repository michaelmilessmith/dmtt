var loki = require('lokijs'),
    checkin = require("./checkin"),
    deadManSwitch = require("./switch")

exports.checkPulse = function(id){
  var time = checkin.getLastCheckinTime(id);
  var timeLimit = deadManSwitch.getSwitchLimit(id);
  return (Date.now() - time)/1000/60 < timeLimit;
}

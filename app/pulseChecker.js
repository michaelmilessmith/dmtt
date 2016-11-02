const loki = require('lokijs'),
    checkin = require("./checkin"),
    deadManSwitch = require("./switch");

exports.checkPulse = function(id){
  const time = checkin.getLastCheckinTime(id);
  const timeLimit = deadManSwitch.getSwitchLimit(id);
  return (Date.now() - time)/1000/60 < timeLimit;
};

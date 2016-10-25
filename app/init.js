var loki = require('lokijs');

var db = new loki('example.db');
exports.db = db;


exports.initialiseStorage = function(){
  var switches = db.addCollection('switches');
  var checkins = db.addCollection('checkins');
};

exports.startChecking = function(ids, interval, action){
  setInterval(function() {
    var pulseChecker = require("./pulseChecker"),
        checkin = require("./checkin");

    for (var i = 0, length = ids.length; i < length; i++ ){
      var result = pulseChecker.checkPulse(ids[i]);
      if(result){
        console.log("Everything is fine with " + ids[i]);
        console.log("Last checkin:" + checkin.getLastCheckinTime(ids[i]));
      }
      else{
        action();
      }
    }
  }, interval);
};

const loki = require('lokijs');

const db = new loki('example.db');
exports.db = db;


exports.initialiseStorage = function(){
  const switches = db.addCollection('switches');
  const checkins = db.addCollection('checkins');
};

exports.startChecking = function(ids, interval, action){
  setInterval(function() {
    const pulseChecker = require("./pulseChecker"),
        checkin = require("./checkin");

    for (let i = 0, length = ids.length; i < length; i++ ){
      const result = pulseChecker.checkPulse(ids[i]);
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

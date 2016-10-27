const loki = require('lokijs');

const db = new loki('loki.db');
exports.db = db;


exports.initialiseStorage = function(){
  const switches = db.addCollection('switches');
  const checkins = db.addCollection('checkins');
};

exports.startChecking = function(switches, interval){
  const pulseChecker = require("./pulseChecker");
  setInterval(function() {
    for (let i = 0, length = switches.length; i < length; i++ ){
      const result = pulseChecker.checkPulse(switches[i].id);

      if(!result && !switches[i].triggered){
        switches[i].action();
        switches[i].triggered = true;
      }
    }
  }, interval);
};

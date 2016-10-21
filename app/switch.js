var loki = require('lokijs'),
    db = require("./init").db;

exports.addSwitch = function(id, limitMinutes){
  var switches = db.getCollection('switches');
  var current = switches.findOne({'id': id});
  if (current){
    current.timeLimitMinutes = Date.now();
    switches.update(current);
  }else{
    switches.insert({'id': id, 'timeLimitMinutes': limitMinutes});
  }
}

exports.getSwitchLimit = function(id){
  var switches = db.getCollection('switches');
  var current = switches.findOne({'id': id});
  return current ? current.timeLimitMinutes : null ;
}

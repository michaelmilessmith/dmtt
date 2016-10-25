var loki = require('lokijs'),
    db = require("./init").db;

exports.performCheckin = function(id){
  var checkins = db.getCollection('checkins');
  var current = checkins.findOne({'id': id});
  if (current){
    current.timeStamp = Date.now();
    checkins.update(current);
    return true;
  }
  return false;
};

exports.createCheckin = function(id){
  var checkins = db.getCollection('checkins');  
  checkins.insert({'id': id, 'timeStamp': Date.now()});
};

exports.getLastCheckinTime = function(id){
  var checkins = db.getCollection('checkins');
  var current = checkins.findOne({'id': id});
  return current ? current.timeStamp : null ;
};

var loki = require('lokijs');

var db = new loki('example.db');
exports.db = db;


exports.initialiseStorage = function(){
  var switches = db.addCollection('switches');
  var checkins = db.addCollection('checkins');
};

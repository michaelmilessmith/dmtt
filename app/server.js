var express = require("express"),
    app = express(),
    checkin = require("./checkin"),
    init = require("./init"),
    loki = require('lokijs'),
    deadManSwitch = require("./switch"),
    pulseChecker = require("./pulseChecker");

var db = init.db;
init.initialiseStorage();

deadManSwitch.addSwitch('qwerty', 5);
checkin.createCheckin('qwerty');
setInterval(function() {
  console.log("It's been one minute!");
  var result = pulseChecker.checkPulse('qwerty');
  console.log("The switch is " + result);
  var last = checkin.getLastCheckinTime('qwerty');
  console.log(last);
}, 6000);

app.get("/checkin", function(req, res) {
  var id = req.query.id;
  checkin.performCheckin(id);
  res.sendStatus(200);
});

app.listen(3000);

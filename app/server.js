const express = require("express"),
    app = express(),
    checkin = require("./checkin"),
    init = require("./init"),
    loki = require('lokijs'),
    deadManSwitch = require("./switch"),
    pulseChecker = require("./pulseChecker");

const db = init.db;
init.initialiseStorage();
deadManSwitch.addSwitch('qwerty', 5);
checkin.createCheckin('qwerty');
init.startChecking(['qwerty'], 1000);


app.get("/checkin", function(req, res) {
  const id = req.query.id;
  checkin.performCheckin(id);
  res.sendStatus(200);
});

app.listen(3000);

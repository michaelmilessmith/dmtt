const express = require("express"),
    app = express(),
    checkin = require("./checkin"),
    init = require("./init"),
    loki = require('lokijs'),
    deadManSwitch = require("./switch"),
    pulseChecker = require("./pulseChecker");

const db = init.db;
init.initialiseStorage();

const switches = require("./switchesConfig").switches;

for (let i = 0, length = switches.length; i < length; i++)
{
  const s = switches[i];
  s.triggered = false;
  deadManSwitch.addSwitch(s.id, s.timeLimitMinutes);
  checkin.createCheckin(s.id);
}
init.startChecking(switches, 1000);

app.get("/checkin", function(req, res) {
  const id = req.query.id;
  checkin.performCheckin(id);
  res.sendStatus(200);
});

app.listen(3000);

var express = require("express"),
    app = express(),
    checkin = require("./checkin"),
    init = require("./init");

var db = init.db;
init.initialiseStorage();

app.get("/checkin", function(req, res) {
  var id = req.query.id;
  checkin.performCheckin(id);
  res.sendStatus(200);
});

app.listen(3000);

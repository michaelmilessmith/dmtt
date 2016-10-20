var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init");

describe("Initialise the storage", function(){
  var db = init.db;
  it("creates in memory storage collections", function(){
    init.initialiseStorage();
    var switches = db.getCollection('switches');
    var pings = db.getCollection('pings');

    expect(switches).to.exist;
    expect(pings).to.exist;
  });
});

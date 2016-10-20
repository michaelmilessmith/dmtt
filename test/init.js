var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init");

describe("Initialisation", function(){
  describe("#initialiseStorage()", function(){

    var db = init.db;
    it("creates in memory storage collections", function(){
      init.initialiseStorage();
      var switches = db.getCollection('switches');
      var checkins = db.getCollection('checkins');

      expect(switches).to.exist;
      expect(checkins).to.exist;
    });
  });
});

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
  describe("#startChecking(ids, interval, action)", function(){

    var db = init.db;
    it("begins the process of checking the switches against checkins", function(done){
      var triggered = false;
      var flipSwitch = function(){
        triggered = true;
      }
      expect(triggered).to.be.false;

      init.startChecking('startChecking', 100, flipSwitch);
      this.timeout(1000);

      setTimeout( function(){
        expect(triggered).to.be.true;
        done();
      }, 500);
    });
  });

});

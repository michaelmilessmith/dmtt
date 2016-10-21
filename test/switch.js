var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init"),
    deadManSwitch = require("../app/switch");

var db = init.db;
init.initialiseStorage();

describe("switch", function(){
  describe("addSwitch(id, limitMinutes)", function(){
    it("adds a switch with the specified id and the switch limit in minutes", function(){
      deadManSwitch.addSwitch('12345', 5);
      var switches = db.getCollection('switches');
      var result = switches.findOne({'id': '12345'})

      expect(result).to.exist;
      expect(result.id).to.equal('12345');
      expect(result.timeLimitMinutes).to.equal(5);
    });
  });
  describe("getSwitchLimit(id)", function(){
    it("gets the time limit of the switch in minutes", function(){
      var timeLimit = deadManSwitch.getSwitchLimit('12345');

      expect(timeLimit).to.exist;
      expect(timeLimit).to.equal(5);
    });

    it("returns null if the no matching record is in storage", function(){
      var timeLimit = deadManSwitch.getSwitchLimit('abcde');

      expect(timeLimit).to.be.null;
    });
  });
});

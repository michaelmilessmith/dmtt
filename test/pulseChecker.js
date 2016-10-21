var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init"),
    checkin = require("../app/checkin"),
    deadManSwitch = require("../app/switch"),
    pulseChecker = require("../app/pulseChecker");

var db = init.db;
init.initialiseStorage();

describe("pulseChecker", function(){
  deadManSwitch.addSwitch('12345_pulseChecker', 1);
  checkin.performCheckin('12345_pulseChecker');
  deadManSwitch.addSwitch('abcde_pulseChecker', 0);
  checkin.performCheckin('abcde_pulseChecker');
  describe("checkPulse(id)", function(){
    describe("checks the checkins against the switches limit for a record", function(){

      it("returns true if the checkin is within the switch limit", function(){
        var result = pulseChecker.checkPulse('12345_pulseChecker');

        expect(result).to.exist;
        expect(result).to.be.true;
      });

      it("returns true if the checkin is within the switch limit", function(){
        var result = pulseChecker.checkPulse('abcde_pulseChecker');

        expect(result).to.exist;
        expect(result).to.be.false;
      });

    });

  });
});

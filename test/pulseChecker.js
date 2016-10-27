const loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init"),
    checkin = require("../app/checkin"),
    deadManSwitch = require("../app/switch"),
    pulseChecker = require("../app/pulseChecker");

const db = init.db;
init.initialiseStorage();

describe("pulseChecker", function(){
  deadManSwitch.addSwitch('pulseChecker_1', 1);
  checkin.createCheckin('pulseChecker_1');
  deadManSwitch.addSwitch('pulseChecker_0', 0);
  checkin.createCheckin('pulseChecker_0');
  describe("checkPulse(id)", function(){
    describe("checks the checkins against the switches limit for a record", function(){

      it("returns true if the checkin is within the switch limit", function(){
        const result = pulseChecker.checkPulse('pulseChecker_1');

        expect(result).to.exist;
        expect(result).to.be.true;
      });

      it("returns false if the id does not exist", function(){
        const result = pulseChecker.checkPulse('pulseChecker_none');

        expect(result).to.exist;
        expect(result).to.be.false;
      });

      it("returns false if the checkin is outside the switch limit", function(){
        const result = pulseChecker.checkPulse('pulseChecker_0');

        expect(result).to.exist;
        expect(result).to.be.false;
      });

    });

  });
});

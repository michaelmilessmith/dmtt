var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init"),
    checkin = require("../app/checkin");

var db = init.db;
init.initialiseStorage();

describe("checkin", function(){
  var time = Date.now();
  var checkins = db.getCollection('checkins');

  describe("createCheckin(id)", function(){
    it("creates a new record for a given id in storage with a time stamp", function(){
      checkin.createCheckin('createCheckin_success');
      var result = checkins.findOne({'id': 'createCheckin_success'})

      expect(result).to.exist;
      expect(result.id).to.equal('createCheckin_success');
      expect(result.timeStamp).to.above(time);
    });
  });

  describe("performCheckin(id)", function(){
    it("records the current time against a record in storage and returns true if successful", function(){
      checkin.createCheckin('performCheckin_success');
      var success = checkin.performCheckin('performCheckin_success');
      var record = checkins.findOne({'id': 'performCheckin_success'})

      expect(success).to.be.true;

      expect(record).to.exist;
      expect(record.id).to.equal('performCheckin_success');
      expect(record.timeStamp).to.above(time);
    });

    it("returns false if no checkin record matches the current time against a record in storage", function(){
      var success = checkin.performCheckin('performCheckin_fail');
      var result = checkins.findOne({'id': 'performCheckin_fail'})

      expect(success).to.be.false;
      expect(result).to.be.null;
    });
  });

  describe("getLastCheckinTime(id)", function(){
    it("gets the last check in time for a record in storage", function(){
      checkin.createCheckin('getLastCheckinTime_success');
      var timeStamp = checkin.getLastCheckinTime('getLastCheckinTime_success');

      expect(timeStamp).to.exist;
      expect(timeStamp).to.above(time);
    });

    it("returns null if the no matching record is in storage", function(){
      var timeStamp = checkin.getLastCheckinTime('getLastCheckinTime_fail');

      expect(timeStamp).to.be.null;
    });
  });
});

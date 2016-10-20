var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init"),
    checkin = require("../app/checkin");

var db = init.db;
init.initialiseStorage();

describe("checkin", function(){
  var time = Date.now();
  describe("performCheckin(id)", function(){
    it("records the current time against a record in storage", function(){
      checkin.performCheckin('12345');
      var checkins = db.getCollection('checkins');
      var result = checkins.findOne({'id': '12345'})

      expect(result).to.exist;
      expect(result.id).to.equal('12345');
      expect(result.timeStamp).to.above(time);
    });
  });
  describe("getLastCheckinTime(id)", function(){
    it("gets the last check in time for a record in storage", function(){
      var timeStamp = checkin.getLastCheckinTime('12345');

      expect(timeStamp).to.exist;
      expect(timeStamp).to.above(time);
    });

    it("returns null if the no matching record is in storage", function(){
      var timeStamp = checkin.getLastCheckinTime('abcde');

      expect(timeStamp).to.be.null;
    });
  });
});

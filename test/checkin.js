var loki = require('lokijs'),
    expect = require("chai").expect,
    init = require("../app/init"),
    checkin = require("../app/checkin");

var db = init.db;
init.initialiseStorage();

describe("checkin", function(){
  describe("performCheckin()", function(){
    it("records the current time against a record in storage", function(){
      var time = Date.now();
      checkin.performCheckin('12345');
      var checkins = db.getCollection('checkins');
      var result = checkins.findOne({'id': '12345'})

      expect(result).to.exist;
      expect(result.id).to.equal('12345');
      expect(result.timeStamp).to.above(time);
    });
  });
});

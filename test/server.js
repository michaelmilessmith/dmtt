var loki = require('lokijs'),
    expect = require("chai").expect,
    checkin = require("../app/checkin"),
    server = require("../app/server"),
    init = require("../app/init"),
    request = require("request");

var db = init.db;
init.initialiseStorage();
var time = Date.now();

describe("Dead Man's Switch API", function() {

  describe("Check in with switch", function() {

    var url = "http://localhost:3000/checkin?id=12345";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        var checkins = db.getCollection('checkins');
        var result = checkins.findOne({'id': '12345'});

        expect(result).to.exist;
        expect(result.id).to.equal('12345');
        expect(result.timeStamp).to.above(time);
        done();
      });
    });
  });
});

const loki = require('lokijs'),
    expect = require("chai").expect,
    checkin = require("../app/checkin"),
    server = require("../app/server"),
    init = require("../app/init"),
    request = require("request");

const db = init.db;
init.initialiseStorage();
const time = Date.now();

describe("Dead Man's Switch API", function() {

  describe("Check in with switch", function() {

    const url = "http://localhost:3000/checkin?id=12345";

    it("returns status 200", function(done) {
      checkin.createCheckin('12345');
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        const checkins = db.getCollection('checkins');
        const result = checkins.findOne({'id': '12345'});

        expect(result).to.exist;
        expect(result.id).to.equal('12345');
        expect(result.timeStamp).to.above(time);
        done();
      });
    });
  });
});

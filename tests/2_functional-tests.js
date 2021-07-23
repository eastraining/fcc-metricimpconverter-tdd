const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
// rounding to pass FCC tests
const roundNum = require('../controllers/roundNum.js');

chai.use(chaiHttp);

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Functional Tests', function() {
  // #1
  test('Convert valid input with GET to /api/convert', function(done) {
    chai
    .request(server)
    .get('/api/convert?input=2gal')
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, JSON.stringify({
        initNum: 2,
        initUnit: 'gal',
        returnNum: roundNum(2 * galToL),
        returnUnit: 'L',
        string: `2 gallons converts to ${roundNum(2 * galToL)} liters`
      }));
      done();
    });
  });
  // #2
  test('Convert invalid unit with GET to /api/convert', function(done) {
    chai
    .request(server)
    .get('/api/convert?input=17g')
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, "invalid unit");
    });
    done();
  });
  // #3
  test('Convert invalid number with GET to /api/convert', function(done) {
    chai
    .request(server)
    .get('/api/convert?input=169/8/53kg')
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, "invalid number");
    });
    done();
  });
  // #4
  test('Convert invalid number and unit with GET to /api/convert', function(done) {
    chai
    .request(server)
    .get('/api/convert?input=169/8/53kpascals')
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, "invalid number and unit");
    });
    done();
  });
  // #5
  test('Convert with no number and valid unit with GET to /api/convert', function(done) {
    chai
    .request(server)
    .get('/api/convert?input=kg')
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, JSON.stringify({
        initNum: 1,
        initUnit: 'kg',
        returnNum: roundNum(1 / lbsToKg),
        returnUnit: 'lbs',
        string: `1 kilograms converts to ${roundNum(1 / lbsToKg)} pounds`
      }));
      done();
    });
  });
});

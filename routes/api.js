'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    if (!input) {
      res.send('invalid input');
      return;
    }
    let [initNum, initUnit] = [convertHandler.getNum(input),
    convertHandler.getUnit(input)];
    if (!initNum) {
      if (!initUnit) {
        res.send('invalid number and unit');
        return;
      } else {
        res.send('invalid number');
        return;
      }
    } else if (!initUnit) {
      res.send('invalid unit');
      return;
    }
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    });
  });
};

function ConvertHandler() {
  const INPUT_NUM_REGEX = /^[^A-Za-z]+?(?=[A-Za-z]|$)/;
  const VERIFY_NUM_REGEX = /^\d+(\.\d+)?$/;
  const INPUT_UNIT_REGEX = /(?<=[^A-Za-z]|^)[A-Za-z]+$/;
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  const UNIT_CONVERTER = {
    'gal': ['L', 'gallons', galToL],
    'L': ['gal', 'liters', 1 / galToL],
    'lbs': ['kg', 'pounds', lbsToKg],
    'kg': ['lbs', 'kilograms', 1 / lbsToKg],
    'mi': ['km', 'miles', miToKm],
    'km': ['mi', 'kilometers', 1 / miToKm]
  };

  // rounding to pass FCC tests
  const roundNum = require('./roundNum.js');

  this.getNum = function(input) {
    let initNum = input.match(INPUT_NUM_REGEX);
    if (!initNum) {
      return 1;
    }
    initNum = initNum[0].split('/');
    if (initNum.length > 2) {
      return null;
    }
    if (initNum.every(x => VERIFY_NUM_REGEX.test(x))) {
      return initNum.length === 1 ?
      Number(initNum[0]) :
      Number(initNum[0]) / Number(initNum[1]);
    } else {
      return null;
    }
  };
  
  this.getUnit = function(input) {
    let initUnit = input.toLowerCase().match(INPUT_UNIT_REGEX);
    initUnit = !initUnit ? null : initUnit[0].length === 1 ?
    initUnit[0].toUpperCase() : initUnit[0];
    return initUnit in UNIT_CONVERTER ? initUnit : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    return UNIT_CONVERTER[initUnit][0];
  };

  this.spellOutUnit = function(unit) {
    return UNIT_CONVERTER[unit][1];
  };
  
  this.convert = function(initNum, initUnit) {
    return roundNum(initNum * UNIT_CONVERTER[initUnit][2]);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

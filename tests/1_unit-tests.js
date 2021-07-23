const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
// rounding to pass FCC tests
const roundNum = require('../controllers/roundNum.js');

let convertHandler = new ConvertHandler();

const VALID_INPUTS = ['gal', 'lbs', 'mi', 'km', 'kg', 'L'];
const VALID_OUTPUTS = VALID_INPUTS.slice().reverse();
const VALID_FULLNAMES = {
  'gal': 'gallons',
  'L': 'liters',
  'lbs': 'pounds',
  'kg': 'kilograms',
  'mi': 'miles',
  'km': 'kilometers'
};
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Unit Tests', function() {
  // test number input with convertHandler.getNum(input)
  suite('Number Input', function() {
    // #1
    test('Whole number input', function() {
      assert.strictEqual(convertHandler.getNum('98798798725957513L'), 98798798725957513);  
    })
    // #2
    test('Decimal number input', function() {
      assert.strictEqual(convertHandler.getNum('2315.5543L'), 2315.5543);
    })
    // #3
    test('Fractional input', function() {
      assert.strictEqual(convertHandler.getNum('15/5L'), 3);
    })
    // #4
    test('Fractional decimal number input', function() {
      assert.strictEqual(convertHandler.getNum('24.01/0.8L'), 30.0125);
    })
    // #5
    test('Multiple fractional input error', function() {
      assert.isNotOk(convertHandler.getNum('24.01/0.7/5L'));
    })
    // #6
    test('Empty input', function() {
      assert.strictEqual(convertHandler.getNum('L'), 1);
    })
  });
  // test unit input with convertHandler.getUnit(input)
  suite('Unit Input', function() {
    // #7
    test('Valid input unit', function() {
      VALID_INPUTS.forEach(x => assert.strictEqual(convertHandler.getUnit(x), x));
    });
    // #8
    test('Invalid input unit', function() {
      assert.isNotOk(convertHandler.getUnit('asdf'));
    });
  });
  // test return unit output with convertHandler.getReturnUnit(initUnit)
  suite('Return Unit Output', function() {
    // #9
    test('Return correct unit for valid input', function() {
      VALID_INPUTS.forEach((x, i) => {
        assert.strictEqual(convertHandler.getReturnUnit(x), VALID_OUTPUTS[i]);
      });
    });
  });
  // test full name output with convertHandler.spellOutUnit(unit)
  suite('Return fully spelled out unit', function() {
    // #10
    test('Return correct spelled out name for valid input', function() {
      VALID_INPUTS.forEach((x, i) => {
        assert.strictEqual(convertHandler.spellOutUnit(x), VALID_FULLNAMES[x]);
      });
    });
  });
  // test correct conversion with convertHandler.convert(initNum, initUnit)
  suite('Return correct conversions', function() {
    // #11
    test('Correctly convert gal to L', function() {
      assert.strictEqual(convertHandler.convert(39, 'gal'), roundNum(39 * galToL));
    });
    // #12
    test('Correctly convert L to gal', function() {
      assert.strictEqual(convertHandler.convert(2500000, 'L'), roundNum(2500000 / galToL));
    });
    // #13
    test('Correctly convert mi to km', function() {
      assert.strictEqual(convertHandler.convert(60, 'mi'), roundNum(60 * miToKm));
    });
    // #14
    test('Correctly convert km to mi', function() {
      assert.strictEqual(convertHandler.convert(299792458, 'km'), roundNum(299792458 / miToKm));
    });
    // #15
    test('Correctly convert lbs to kg', function() {
      assert.strictEqual(convertHandler.convert(225, 'lbs'), roundNum(225 * lbsToKg));
    });
    // #16
    test('Correctly convert kg to lbs', function() {
      assert.strictEqual(convertHandler.convert(365000000, 'kg'), roundNum(365000000 / lbsToKg));
    });
  });
});

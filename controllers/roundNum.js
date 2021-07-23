// required for rounding to pass FCC tests
const ROUND_TO = 5;
function roundNum(n, digits = ROUND_TO) {
  const multiplier = Math.pow(10, digits)
  return Math.round(n * multiplier) / multiplier;
}
module.exports = roundNum;
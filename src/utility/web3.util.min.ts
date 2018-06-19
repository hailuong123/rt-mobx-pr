
import { BigNumber } from 'bignumber.js';

const unitMap = {
  'noether':      '0',
  'wei':          '1',
  'kwei':         '1000',
  'Kwei':         '1000',
  'babbage':      '1000',
  'femtoether':   '1000',
  'mwei':         '1000000',
  'Mwei':         '1000000',
  'lovelace':     '1000000',
  'picoether':    '1000000',
  'gwei':         '1000000000',
  'Gwei':         '1000000000',
  'shannon':      '1000000000',
  'nanoether':    '1000000000',
  'nano':         '1000000000',
  'szabo':        '1000000000000',
  'microether':   '1000000000000',
  'micro':        '1000000000000',
  'finney':       '1000000000000000',
  'milliether':   '1000000000000000',
  'milli':        '1000000000000000',
  'ether':        '1000000000000000000',
  'kether':       '1000000000000000000000',
  'grand':        '1000000000000000000000',
  'mether':       '1000000000000000000000000',
  'gether':       '1000000000000000000000000000',
  'tether':       '1000000000000000000000000000000'
};

/**
 * Should be called to pad string to expected length
 *
 * @method padLeft
 * @param {String} string to be padded
 * @param {Number} characters that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
export const  padLeft = function (str: string, chars: number, sign: string) {
  return new Array(chars - str.length + 1).join(sign ? sign : '0') + str;
};

/**
 * Should be called to pad string to expected length
 *
 * @method padRight
 * @param {String} string to be padded
 * @param {Number} characters that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
export const  padRight = function (str: string, chars: number, sign: string) {
  return str + (new Array(chars - str.length + 1).join(sign ? sign : '0'));
};

/**
 * Converts value to it's decimal representation in string
 *
 * @method toDecimal
 * @param {String|Number|BigNumber}
 * @return {String}
 */
export const  toDecimal = function (value: any) {
  return toBigNumber(value).toNumber();
};

/**
 * Converts value to it's hex representation
 *
 * @method fromDecimal
 * @param {String|Number|BigNumber}
 * @return {String}
 */
export const  fromDecimal = function (value: any) {
  const num = toBigNumber(value);
  const result = num.toString(16);

  return num.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
};

/**
 * Returns value of unit in Wei
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default ether
 * @returns {BigNumber} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
export const  getValueOfUnit = function (unit: string) {
  unit = unit ? unit.toLowerCase() : 'ether';
  var unitValue = unitMap[unit];
  if (unitValue === undefined) {
      throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(unitMap, null, 2));
  }
  return new BigNumber(unitValue, 10);
};

/**
 * Takes a number of wei and converts it to any other ether unit.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - kwei       femtoether     babbage
 * - mwei       picoether      lovelace
 * - gwei       nanoether      shannon      nano
 * - --         microether     szabo        micro
 * - --         milliether     finney       milli
 * - ether      --             --
 * - kether                    --           grand
 * - mether
 * - gether
 * - tether
 *
 * @method fromWei
 * @param {Number|String} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert to, default ether
 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
 */
export const fromWei = function(num: any, fixed?: number, unit?: any) {
  if (num === '0' || num === 0) {
      return 0;
  }
  let returnValue = toBigNumber(num).dividedBy(getValueOfUnit(unit));
  // return isBigNumber(num) ? new BigNumber(returnValue).toFixed(fixed) : returnValue.toString(fixed);
  return new BigNumber(returnValue).toFixed(fixed);
};

export const getTxFee = (gasUsed: any, gasPrice?: any) => {
  const x = new BigNumber(gasUsed);
  if (!gasPrice) {
    gasPrice = 20000000000;
  }
  return x.times(gasPrice);
};

/**
 * Takes a number of a unit and converts it to wei.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - kwei       femtoether     babbage
 * - mwei       picoether      lovelace
 * - gwei       nanoether      shannon      nano
 * - --         microether     szabo        micro
 * - --         milliether     finney       milli
 * - ether      --             --
 * - kether                    --           grand
 * - mether
 * - gether
 * - tether
 *
 * @method toWei
 * @param {Number|String|BigNumber} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert from, default ether
 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
 */
export const  toWei = function(num: any, unit: any) {
  var returnValue = toBigNumber(num).times(getValueOfUnit(unit));

  return isBigNumber(num) ? returnValue : returnValue.toString(10);
};

/**
 * Takes an input and transforms it into an bignumber
 *
 * @method toBigNumber
 * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
 * @return {BigNumber} BigNumber
 */
export const  toBigNumber = function(num: any) {
  /*jshint maxcomplexity:5 */
  num = num || 0;
  if (isBigNumber(num)) {
      return num;
  }
  if (isString(num) && (num.indexOf('0x') === 0 || num.indexOf('-0x') === 0)) {
      return new BigNumber(num.replace('0x', ''), 16);
  }

  return new BigNumber(num.toString(10), 10);
};

/**
 * Checks if the given string is strictly an address
 *
 * @method isStrictAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
export const  isStrictAddress = function (address: string) {
  return /^0x[0-9a-f]{40}$/i.test(address);
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @param {Object}
 * @return {Boolean}
 */
export const  isBigNumber = function (object: any) {
  return object instanceof BigNumber ||
      (object && object.constructor && object.constructor.name === 'BigNumber');
};

/**
 * Returns true if object is string, otherwise false
 *
 * @method isString
 * @param {Object}
 * @return {Boolean}
 */
export const  isString = function (object: any) {
  return typeof object === 'string' ||
      (object && object.constructor && object.constructor.name === 'String');
};

/**
 * Returns true if object is function, otherwise false
 *
 * @method isFunction
 * @param {Object}
 * @return {Boolean}
 */
export const  isFunction = function (object: any) {
  return typeof object === 'function';
};

/**
 * Returns true if object is Objet, otherwise false
 *
 * @method isObject
 * @param {Object}
 * @return {Boolean}
 */
export const  isObject = function (object: any) {
  return object !== null && !(Array.isArray(object)) && typeof object === 'object';
};

/**
 * Returns true if object is boolean, otherwise false
 *
 * @method isBoolean
 * @param {Object}
 * @return {Boolean}
 */
export const  isBoolean = function (object: any) {
  return typeof object === 'boolean';
};

/**
 * Returns true if object is array, otherwise false
 *
 * @method isArray
 * @param {Object}
 * @return {Boolean}
 */
export const  isArray = function (object: any) {
  return Array.isArray(object);
};

/**
 * Returns true if given string is valid json object
 *
 * @method isJson
 * @param {String}
 * @return {Boolean}
 */
export const isJson = function (str: any) {
  try {
      return !!JSON.parse(str);
  } catch (e) {
      return false;
  }
};
